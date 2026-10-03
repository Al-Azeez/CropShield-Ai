import mongoose from 'mongoose';
import { INITIAL_DIAGNOSES } from '../data/initialDiagnoses.js';
import { getDBStatus } from '../config/db.js';

const FeatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  importance: { type: Number, default: 80 },
  detected: { type: Boolean, default: true },
  note: { type: String, default: '' }
}, { _id: false });

const BoundingZoneSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  label: { type: String, required: true }
}, { _id: false });

const DifferentialSchema = new mongoose.Schema({
  disease: { type: String, required: true },
  probability: { type: Number, required: true }
}, { _id: false });

const ActionPlanSchema = new mongoose.Schema({
  immediate: [{ type: String }],
  treatment: [{ type: String }],
  whatToAvoid: [{ type: String }],
  monitoring: [{ type: String }],
  followUp: [{ type: String }]
}, { _id: false });

const ExplainableAISchema = new mongoose.Schema({
  primaryReason: { type: String, required: true },
  features: [FeatureSchema],
  boundingZones: [BoundingZoneSchema],
  differentialDiagnoses: [DifferentialSchema]
}, { _id: false });

const DiagnosisSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  crop: { type: String, required: true },
  scientificName: { type: String, default: '' },
  cropIcon: { type: String, default: '🌱' },
  condition: { type: String, required: true },
  pathogen: { type: String, default: '' },
  status: { type: String, enum: ['Healthy', 'Diseased', 'Warning'], default: 'Diseased' },
  severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Critical'], default: 'Moderate' },
  confidence: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  symptoms: [{ type: String }],
  causes: [{ type: String }],
  explainableAI: ExplainableAISchema,
  actionPlan: ActionPlanSchema,
  prevention: [{ type: String }],
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const MongoDiagnosisModel = mongoose.model('Diagnosis', DiagnosisSchema);

// In-Memory Repository Fallback (Active when MongoDB is not running)
let inMemoryStore = [...INITIAL_DIAGNOSES];

export const DiagnosisRepository = {
  async getAll({ limit = 50, crop, status, severity, search } = {}) {
    if (getDBStatus()) {
      try {
        const query = {};
        if (crop && crop !== 'all') query.crop = new RegExp(crop, 'i');
        if (status && status !== 'all') query.status = status;
        if (severity && severity !== 'all') query.severity = severity;
        if (search) {
          query.$or = [
            { crop: new RegExp(search, 'i') },
            { condition: new RegExp(search, 'i') },
            { pathogen: new RegExp(search, 'i') }
          ];
        }
        return await MongoDiagnosisModel.find(query).sort({ createdAt: -1 }).limit(Number(limit));
      } catch (err) {
        console.error('Mongo query failed, falling back to in-memory store:', err.message);
      }
    }

    // In-memory filter
    let results = [...inMemoryStore];
    if (crop && crop !== 'all') {
      results = results.filter(d => d.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (status && status !== 'all') {
      results = results.filter(d => d.status.toLowerCase() === status.toLowerCase());
    }
    if (severity && severity !== 'all') {
      results = results.filter(d => d.severity.toLowerCase() === severity.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(d =>
        (d.crop && d.crop.toLowerCase().includes(q)) ||
        (d.condition && d.condition.toLowerCase().includes(q)) ||
        (d.pathogen && d.pathogen.toLowerCase().includes(q))
      );
    }
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return results.slice(0, Number(limit));
  },

  async getById(id) {
    if (getDBStatus()) {
      try {
        const doc = await MongoDiagnosisModel.findOne({ id });
        if (doc) return doc;
      } catch (err) {
        console.error('Mongo findById failed:', err.message);
      }
    }
    return inMemoryStore.find(d => d.id === id) || null;
  },

  async create(diagnosisData) {
    if (getDBStatus()) {
      try {
        const newDoc = new MongoDiagnosisModel(diagnosisData);
        await newDoc.save();
        return newDoc;
      } catch (err) {
        console.error('Mongo save failed, storing in memory:', err.message);
      }
    }
    inMemoryStore.unshift(diagnosisData);
    return diagnosisData;
  },

  async deleteById(id) {
    if (getDBStatus()) {
      try {
        const res = await MongoDiagnosisModel.deleteOne({ id });
        if (res.deletedCount > 0) return true;
      } catch (err) {
        console.error('Mongo delete failed:', err.message);
      }
    }
    const idx = inMemoryStore.findIndex(d => d.id === id);
    if (idx !== -1) {
      inMemoryStore.splice(idx, 1);
      return true;
    }
    return false;
  },

  async getStats() {
    const all = await this.getAll({ limit: 1000 });
    const totalScans = all.length;
    const healthyCount = all.filter(d => d.status === 'Healthy').length;
    const diseasedCount = all.filter(d => d.status === 'Diseased').length;
    
    // Severity breakdown
    const severityBreakdown = {
      Low: all.filter(d => d.severity === 'Low').length,
      Moderate: all.filter(d => d.severity === 'Moderate').length,
      High: all.filter(d => d.severity === 'High').length,
      Critical: all.filter(d => d.severity === 'Critical').length,
    };

    // Crop distribution
    const cropCounts = {};
    all.forEach(d => {
      const c = d.crop || 'Other';
      cropCounts[c] = (cropCounts[c] || 0) + 1;
    });

    return {
      totalScans,
      healthyCount,
      diseasedCount,
      healthyPercentage: totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 0,
      severityBreakdown,
      cropCounts,
      recentDiagnoses: all.slice(0, 5)
    };
  }
};
