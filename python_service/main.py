import os
import io
import base64
import uvicorn
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

try:
    import tensorflow as tf
except ImportError:
    tf = None

from model_pipeline import PlantDiseaseInferenceEngine, CLASSES

app = FastAPI(
    title="CropShield AI - TensorFlow Computer Vision Engine",
    description="Deep Learning microservice for Crop Leaf Disease Detection using TensorFlow & MobileNetV2",
    version="1.0.0"
)

# Enable CORS for communication with Express Node backend and frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = PlantDiseaseInferenceEngine.get_instance()


class PredictJSONRequest(BaseModel):
    imageBase64: Optional[str] = None
    imageUrl: Optional[str] = None
    cropId: Optional[str] = "auto"
    userNotes: Optional[str] = ""


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "CropShield-AI TensorFlow Service",
        "tensorflow_version": tf.__version__ if tf else "Not loaded",
        "devices": [d.name for d in tf.config.list_physical_devices()] if tf else [],
        "total_classes": len(CLASSES)
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": engine.model is not None,
        "tensorflow": tf.__version__ if tf else "Unavailable",
        "num_classes": len(CLASSES)
    }


@app.get("/classes")
def get_classes():
    return {
        "total": len(CLASSES),
        "classes": CLASSES
    }


@app.post("/predict")
async def predict_image(
    file: Optional[UploadFile] = File(None),
    imageBase64: Optional[str] = Form(None),
    cropId: Optional[str] = Form("auto"),
    userNotes: Optional[str] = Form("")
):
    try:
        image_bytes = None

        if file:
            image_bytes = await file.read()
        elif imageBase64:
            # Strip data URL header if present
            if "," in imageBase64:
                imageBase64 = imageBase64.split(",")[1]
            image_bytes = base64.b64decode(imageBase64)
        else:
            raise HTTPException(status_code=400, detail="No image file or base64 image data provided.")

        result = engine.predict(image_bytes, crop_filter=cropId)

        if result.get("isInvalidImage"):
            raise HTTPException(
                status_code=400,
                detail=result.get("error", "Plz upload the valid crop or plant ,human images are not valid")
            )

        return {
            "success": True,
            "data": result
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"[Error] Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict-json")
async def predict_image_json(payload: PredictJSONRequest):
    try:
        if not payload.imageBase64 and not payload.imageUrl:
            raise HTTPException(status_code=400, detail="Please provide imageBase64 or imageUrl")

        image_bytes = None
        if payload.imageBase64:
            b64_str = payload.imageBase64
            if "," in b64_str:
                b64_str = b64_str.split(",")[1]
            image_bytes = base64.b64decode(b64_str)
        elif payload.imageUrl and os.path.exists(payload.imageUrl):
            with open(payload.imageUrl, "rb") as f:
                image_bytes = f.read()
        else:
            raise HTTPException(status_code=400, detail="Invalid image input path or encoding.")

        result = engine.predict(image_bytes, crop_filter=payload.cropId)

        if result.get("isInvalidImage"):
            raise HTTPException(
                status_code=400,
                detail=result.get("error", "Plz upload the valid crop or plant ,human images are not valid")
            )

        return {
            "success": True,
            "data": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    port = int(os.environ.get("PYTHON_AI_PORT", 8000))
    print(f"Starting CropShield TensorFlow Microservice on port {port}...")
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=False)
