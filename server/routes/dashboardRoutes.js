import express from 'express';
import { DiagnosisRepository } from '../models/Diagnosis.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const stats = await DiagnosisRepository.getStats();

    // Weather & Environmental Disease Risk Index calculation simulation
    const riskAlerts = [
      {
        id: 'alert-1',
        title: 'High Humidity Blight Warning',
        severity: 'High',
        crops: ['Tomato', 'Potato'],
        condition: 'Relative humidity >86% forecasted for next 48 hrs. High risk of Late Blight spore multiplication.',
        recommendation: 'Apply protective preventive copper spray on unstaked or dense foliage.'
      },
      {
        id: 'alert-2',
        title: 'Rust Spore Wind Alert',
        severity: 'Moderate',
        crops: ['Corn', 'Wheat'],
        condition: 'Southeastern prevailing winds carrying airborne urediniospores.',
        recommendation: 'Scout upper flag leaves for yellow and orange flecking.'
      }
    ];

    res.status(200).json({
      success: true,
      data: {
        ...stats,
        riskAlerts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard analytics',
      error: error.message
    });
  }
});

export default router;
