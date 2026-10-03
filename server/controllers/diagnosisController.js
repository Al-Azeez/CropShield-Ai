import { AIVisionService } from '../services/aiVisionService.js';
import { DiagnosisRepository } from '../models/Diagnosis.js';

export const analyzePlantImage = async (req, res) => {
  try {
    let imageUrl = '';
    const { cropId, userNotes, targetCondition } = req.body;

    // Handle uploaded file via Multer
    if (req.file) {
      // In local dev, serve file via static endpoint or construct URL
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else if (req.body.imageBase64) {
      imageUrl = req.body.imageBase64;
    } else {
      // Fallback default sample plant leaf image
      imageUrl = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80';
    }

    // Run AI Vision inference pipeline
    const diagnosisResult = await AIVisionService.analyzeImage({
      imageUrl,
      cropId,
      userNotes,
      targetCondition
    });

    // Save to Database (MongoDB or In-Memory repository)
    const savedDiagnosis = await DiagnosisRepository.create(diagnosisResult);

    return res.status(201).json({
      success: true,
      message: 'Plant health analysis completed successfully',
      data: savedDiagnosis
    });
  } catch (error) {
    console.error('Error analyzing plant image:', error);
    if (error.message.includes('human images are not valid') || error.isInvalidImage) {
      return res.status(400).json({
        success: false,
        isInvalidImage: true,
        message: "Plz upload the valid crop or plant ,human images are not valid",
        error: "Plz upload the valid crop or plant ,human images are not valid"
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to complete plant image analysis',
      error: error.message
    });
  }
};

export const getAllDiagnoses = async (req, res) => {
  try {
    const { limit = 50, crop, status, severity, search } = req.query;
    const records = await DiagnosisRepository.getAll({ limit, crop, status, severity, search });
    
    return res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    console.error('Error fetching diagnoses history:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve diagnosis history',
      error: error.message
    });
  }
};

export const getDiagnosisById = async (req, res) => {
  try {
    const { id } = req.params;
    const diagnosis = await DiagnosisRepository.getById(id);

    if (!diagnosis) {
      return res.status(404).json({
        success: false,
        message: `Diagnosis record with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: diagnosis
    });
  } catch (error) {
    console.error('Error fetching diagnosis by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve diagnosis details',
      error: error.message
    });
  }
};

export const deleteDiagnosis = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await DiagnosisRepository.deleteById(id);

    if (!success) {
      return res.status(404).json({
        success: false,
        message: `Diagnosis record with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Diagnosis record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete diagnosis',
      error: error.message
    });
  }
};
