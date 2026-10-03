import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Image as ImageIcon, 
  X, 
  Check, 
  ArrowRight, 
  HelpCircle,
  Leaf,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { SAMPLE_LEAVES } from '../data/sampleLeaves.js';
import { validateCropImage, HUMAN_INVALID_MESSAGE } from '../services/imageValidator.js';

export const AnalysisPage = ({ onStartAnalysis, onOpenCamera, selectedSampleLeaf }) => {
  const { cropsList, t } = useScan();
  const { addToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(selectedSampleLeaf?.imageUrl || null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedCropId, setSelectedCropId] = useState(selectedSampleLeaf?.cropId || 'auto');
  const [userNotes, setUserNotes] = useState('');
  const [targetCondition, setTargetCondition] = useState(selectedSampleLeaf?.targetCondition || null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (JPG, PNG, WebP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      const validation = await validateCropImage(dataUrl);
      if (validation.isHuman || !validation.isValid) {
        addToast(HUMAN_INVALID_MESSAGE, 'error');
        alert(HUMAN_INVALID_MESSAGE);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setImageFile(file);
      setSelectedImage(dataUrl);
      setTargetCondition(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result;
        const validation = await validateCropImage(dataUrl);
        if (validation.isHuman || !validation.isValid) {
          addToast(HUMAN_INVALID_MESSAGE, 'error');
          alert(HUMAN_INVALID_MESSAGE);
          return;
        }
        setImageFile(file);
        setSelectedImage(dataUrl);
        setTargetCondition(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.imageUrl);
    setImageFile(null);
    setSelectedCropId(sample.cropId);
    setTargetCondition(sample.targetCondition);
    addToast(`Selected sample: ${sample.title}`, 'info');
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setTargetCondition(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      addToast('Please upload or capture a plant image first', 'warning');
      return;
    }

    onStartAnalysis({
      imageFile,
      imageUrl: selectedImage,
      cropId: selectedCropId,
      userNotes,
      targetCondition
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('scanPage.hubBadge', 'Agricultural Diagnostic Hub')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          {t('scanPage.title', 'Scan Plant Specimen')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          {t('scanPage.subtitle', 'Upload a clear photograph of the affected leaf or fruit to trigger deep multi-stage neural vision analysis.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Upload & Preview Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-forest-border/60 pb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-heading">
                  {t('scanPage.specimenImage', 'Plant Specimen Image')}
                </h3>
              </div>
              {selectedImage && (
                <button
                  onClick={handleClearImage}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t('scanPage.changeImage', 'Change Image')}</span>
                </button>
              )}
            </div>

            {/* Dropzone or Preview */}
            {!selectedImage ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                  isDragging
                    ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                    : 'border-forest-border hover:border-emerald-500/50 bg-forest-dark/60 hover:bg-forest-dark'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                  <Upload className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-white font-heading">
                    {t('scanPage.dragDrop', 'Drag and drop leaf image here, or')}{' '}
                    <span className="text-emerald-400 underline">{t('scanPage.browse', 'browse')}</span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {t('scanPage.formats', 'Supports JPG, PNG, WebP up to 10MB')}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCamera();
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-card hover:bg-forest-border border border-forest-border text-slate-200 text-xs font-bold transition-all shadow-md hover:scale-105"
                  >
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span>{t('scanPage.useLiveCamera', 'Use Live Camera')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 aspect-square sm:aspect-video bg-black shadow-xl">
                  <img
                    src={selectedImage}
                    alt="Selected leaf"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] font-mono text-emerald-300 border border-emerald-500/40">
                    {t('scanPage.imageReady', '✓ Image Ready For Inspection')}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{t('scanPage.photoLoaded', 'Photo loaded and pre-processed')}</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    {t('scanPage.selectDifferent', 'Select different photo')}
                  </button>
                </div>
              </div>
            )}

            {/* Quick test sample leaf chips (Tomato, Corn, Rice, Potato) */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-heading">
                {t('scanPage.pickSample', 'Or pick a quick test sample leaf:')}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SAMPLE_LEAVES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className="p-2 rounded-xl border border-forest-border bg-forest-dark/80 hover:border-emerald-400 text-center transition-all group hover:-translate-y-0.5"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-black">
                      <img
                        src={sample.imageUrl}
                        alt={sample.crop}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-xs text-slate-200 font-semibold block truncate">
                      {sample.crop}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 block truncate">
                      {sample.targetCondition}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Crop Details & Start Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-forest-border/60 pb-4">
              <h3 className="text-base font-bold text-white font-heading">
                {t('scanPage.diagnosticParams', 'Diagnostic Parameters')}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('scanPage.paramsHint', 'Optional hints help refine classification accuracy.')}
              </p>
            </div>

            {/* Crop Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-heading">
                {t('scanPage.cropSpecies', 'Crop Species / Family')}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full bg-forest-dark border border-forest-border rounded-xl px-4 py-3 text-xs md:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
              >
                <option value="auto">{t('scanPage.autoDetect', '✨ Auto-Detect Crop from Image')}</option>
                {cropsList.map((crop) => (
                  <option key={crop.id} value={crop.id}>
                    {crop.icon} {crop.name} ({crop.scientificName || crop.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Field Notes (Optional) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block font-heading">
                {t('scanPage.fieldObservations', 'Field Observations (Optional)')}
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={3}
                placeholder={t('scanPage.observationsPlaceholder', 'e.g., Lower leaves developed brown spots after heavy rain 3 days ago...')}
                className="w-full bg-forest-dark border border-forest-border rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
              />
            </div>

            {/* AI Diagnostics Checklist Info */}
            <div className="p-4 rounded-2xl bg-forest-dark/80 border border-forest-border text-xs space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('scanPage.pipelineTitle', 'Multi-Stage AI Pipeline')}</span>
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1 pl-1">
                <li>{t('scanPage.pipeline1', '• Optical resolution & boundary validation')}</li>
                <li>{t('scanPage.pipeline2', '• Chlorosis & necrotic margin segmentation')}</li>
                <li>{t('scanPage.pipeline3', '• Pathogen probability matching against 8+ crops')}</li>
                <li>{t('scanPage.pipeline4', '• Action plan synthesis & Explainable AI hotspots')}</li>
              </ul>
            </div>

            {/* Start AI Analysis CTA */}
            <button
              onClick={handleAnalyze}
              disabled={!selectedImage}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-forest-dark font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 text-forest-dark" />
              <span>{t('scanPage.startAnalysisBtn', 'Start AI Crop Analysis')}</span>
              <ArrowRight className="w-4 h-4 text-forest-dark ml-1" />
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
