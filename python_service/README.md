# CropShield AI - Python TensorFlow Deep Learning Engine 🌿🔬

This microservice provides deep learning and computer vision capabilities for crop disease diagnosis using **TensorFlow 2.x**, **MobileNetV2 Transfer Learning**, and **FastAPI**.

---

## 🌟 Features

1. **TensorFlow MobileNetV2 Architecture**:
   - Lightweight, high-accuracy convolutional neural network designed for rapid real-time inference on edge and server environments.
   - Pretrained on ImageNet with customized dense classification layers (BatchNormalization, Dropout, Softmax).

2. **38 Supported PlantVillage Crop & Disease Classes**:
   - Covers Apple, Blueberry, Cherry, Corn (Maize), Grape, Orange/Citrus, Peach, Bell Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, and Tomato.
   - Full mapping with pathogens, severity levels, symptom profiles, and organic/chemical action plans.

3. **FastAPI High-Performance REST API**:
   - `GET /health`: Engine status, TensorFlow version, hardware accelerators.
   - `GET /classes`: Listing of all 38 supported crop/pathogen categories.
   - `POST /predict`: Upload multipart image file for instant prediction.
   - `POST /predict-json`: Send base64-encoded leaf image or image URL.

4. **Explainable AI (XAI)**:
   - Identifies characteristic lesion hotspots, chlorotic halos, and foliar damage zones.
   - Computes differential diagnoses and probability distributions.

5. **Human / Non-Plant Image Guardrail**:
   - Built-in visual guardrail rejecting human selfies, portraits, and non-foliar uploads with polite validation feedback.

---

## 🚀 Quick Start

### 1. Run the Python TensorFlow Microservice
```bash
# In the python_service directory
python main.py
```
Or double-click `start_service.bat` (Windows).

The service will start on: **`http://127.0.0.1:8000`**

### 2. Interactive Swagger API Docs
Open your browser and navigate to:
```
http://127.0.0.1:8000/docs
```

---

## 🧪 Testing with CLI
You can test leaf image predictions directly from the command line:
```bash
python predict.py --image path/to/leaf_image.jpg
```

---

## 🎓 Training on Custom Dataset (e.g., PlantVillage)
To train or fine-tune the model with your own dataset folder:

```bash
# Dataset directory structure:
# dataset/
#   ├── Tomato___Early_blight/
#   ├── Tomato___Late_blight/
#   └── ...

python train.py --data_dir ./dataset --epochs 20 --batch_size 32 --fine_tune
```

The trained model checkpoint will be saved to:
`python_service/models/crop_disease_mobilenetv2.keras`

---

## 🔌 Integration with Node.js Express Backend
The Express backend in `server/` automatically detects and queries this service via `PYTHON_AI_URL=http://127.0.0.1:8000`. If the Python service is offline, the backend seamlessly falls back to the embedded agronomic knowledge engine.
