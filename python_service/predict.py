"""
CropShield-AI Standalone Image Prediction CLI
Usage:
    python predict.py --image path/to/leaf.jpg
"""

import argparse
import json
from model_pipeline import PlantDiseaseInferenceEngine


def main():
    parser = argparse.ArgumentParser(description="Classify plant foliage image using TensorFlow")
    parser.add_argument("--image", type=str, required=True, help="Path to leaf image file")
    args = parser.parse_args()

    engine = PlantDiseaseInferenceEngine.get_instance()
    result = engine.predict(args.image)

    print("\n--- Diagnostic Prediction Result ---")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
