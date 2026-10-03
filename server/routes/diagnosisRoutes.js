import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  analyzePlantImage,
  getAllDiagnoses,
  getDiagnosisById,
  deleteDiagnosis
} from '../controllers/diagnosisController.js';

const router = express.Router();

// Multer storage setup for image uploads
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `crop-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP) are allowed!'), false);
    }
  }
});

// Routes
router.post('/analyze', upload.single('image'), analyzePlantImage);
router.post('/', upload.single('image'), analyzePlantImage);
router.get('/', getAllDiagnoses);
router.get('/:id', getDiagnosisById);
router.delete('/:id', deleteDiagnosis);

export default router;
