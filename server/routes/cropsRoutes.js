import express from 'express';
import { CROPS_DATA } from '../data/cropsData.js';

const router = express.Router();

// GET all crops
router.get('/', (req, res) => {
  try {
    const cropSummaries = CROPS_DATA.map(crop => ({
      id: crop.id,
      name: crop.name,
      scientificName: crop.scientificName,
      category: crop.category,
      icon: crop.icon,
      description: crop.description,
      diseaseCount: crop.diseases.length,
      diseases: crop.diseases.map(d => ({
        id: d.id,
        name: d.name,
        pathogen: d.pathogen,
        status: d.status,
        severity: d.severity
      }))
    }));

    res.status(200).json({
      success: true,
      count: cropSummaries.length,
      data: cropSummaries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve crops list',
      error: error.message
    });
  }
});

// GET specific crop details by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const crop = CROPS_DATA.find(c => c.id.toLowerCase() === id.toLowerCase());

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: `Crop with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: crop
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve crop details',
      error: error.message
    });
  }
});

export default router;
