"""
CropShield-AI Model Training Script (TensorFlow + MobileNetV2)
Usage:
    python train.py --data_dir ./dataset --epochs 20 --batch_size 32
"""

import os
import argparse
import json
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau

IMAGE_SIZE = (224, 224)
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
CLASSES_FILE = os.path.join(os.path.dirname(__file__), "class_indices.json")


def parse_args():
    parser = argparse.ArgumentParser(description="Train CropShield AI Disease Classification Model")
    parser.add_argument("--data_dir", type=str, default="./dataset", help="Path to PlantVillage dataset")
    parser.add_argument("--epochs", type=int, default=15, help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=32, help="Batch size")
    parser.add_argument("--lr", type=float, default=1e-3, help="Initial learning rate")
    parser.add_argument("--fine_tune", action="store_true", help="Unfreeze top layers for fine-tuning")
    return parser.parse_args()


def load_datasets(data_dir, batch_size=32):
    train_dir = os.path.join(data_dir, "train") if os.path.exists(os.path.join(data_dir, "train")) else data_dir
    val_dir = os.path.join(data_dir, "val") if os.path.exists(os.path.join(data_dir, "val")) else None

    if val_dir and os.path.exists(val_dir):
        train_ds = keras.utils.image_dataset_from_directory(
            train_dir,
            image_size=IMAGE_SIZE,
            batch_size=batch_size,
            label_mode="categorical",
            shuffle=True
        )
        val_ds = keras.utils.image_dataset_from_directory(
            val_dir,
            image_size=IMAGE_SIZE,
            batch_size=batch_size,
            label_mode="categorical",
            shuffle=False
        )
    else:
        # Split single folder into train/val
        train_ds = keras.utils.image_dataset_from_directory(
            train_dir,
            validation_split=0.2,
            subset="training",
            seed=42,
            image_size=IMAGE_SIZE,
            batch_size=batch_size,
            label_mode="categorical"
        )
        val_ds = keras.utils.image_dataset_from_directory(
            train_dir,
            validation_split=0.2,
            subset="validation",
            seed=42,
            image_size=IMAGE_SIZE,
            batch_size=batch_size,
            label_mode="categorical"
        )

    class_names = train_ds.class_names
    print(f"[Training] Discovered {len(class_names)} classes: {class_names[:5]}...")

    # Performance optimizations
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

    return train_ds, val_ds, class_names


def build_transfer_model(num_classes):
    base_model = MobileNetV2(
        weights="imagenet",
        include_top=False,
        input_shape=(224, 224, 3)
    )
    base_model.trainable = False

    data_augmentation = keras.Sequential([
        layers.RandomFlip("horizontal_and_vertical"),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.15),
        layers.RandomContrast(0.1)
    ], name="data_augmentation")

    inputs = keras.Input(shape=(224, 224, 3))
    x = data_augmentation(inputs)
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)
    x = base_model(x, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dense(256, activation="relu")(x)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(128, activation="relu")(x)
    x = layers.Dropout(0.2)(x)
    outputs = layers.Dense(num_classes, activation="softmax", name="predictions")(x)

    model = keras.Model(inputs=inputs, outputs=outputs, name="CropShield_MobileNetV2")
    return model, base_model


def main():
    args = parse_args()
    os.makedirs(MODEL_DIR, exist_ok=True)

    if not os.path.exists(args.data_dir):
        print(f"[ERROR] Dataset directory '{args.data_dir}' not found.")
        print("To train on PlantVillage, place your images in dataset/ or specify --data_dir.")
        return

    print(f"Loading dataset from {args.data_dir}...")
    train_ds, val_ds, class_names = load_datasets(args.data_dir, args.batch_size)
    num_classes = len(class_names)

    model, base_model = build_transfer_model(num_classes)
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=args.lr),
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    model_save_path = os.path.join(MODEL_DIR, "crop_disease_mobilenetv2.keras")
    h5_save_path = os.path.join(MODEL_DIR, "crop_disease_mobilenetv2.h5")

    callbacks = [
        ModelCheckpoint(model_save_path, save_best_only=True, monitor="val_accuracy", mode="max", verbose=1),
        EarlyStopping(patience=5, restore_best_weights=True, monitor="val_loss", verbose=1),
        ReduceLROnPlateau(factor=0.2, patience=3, min_lr=1e-6, monitor="val_loss", verbose=1)
    ]

    print("\n--- Phase 1: Feature Extraction Training ---")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=args.epochs,
        callbacks=callbacks
    )

    if args.fine_tune:
        print("\n--- Phase 2: Fine-Tuning Top Layers ---")
        base_model.trainable = True
        # Fine-tune only the last 30 layers
        for layer in base_model.layers[:-30]:
            layer.trainable = False

        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=args.lr / 10),
            loss="categorical_crossentropy",
            metrics=["accuracy"]
        )
        model.fit(
            train_ds,
            validation_data=val_ds,
            epochs=args.epochs + 10,
            initial_epoch=history.epoch[-1] if history.epoch else 0,
            callbacks=callbacks
        )

    # Save final model
    model.save(model_save_path)
    try:
        model.save(h5_save_path)
    except Exception:
        pass

    print(f"\n[SUCCESS] Model training complete! Saved to {model_save_path}")


if __name__ == "__main__":
    main()
