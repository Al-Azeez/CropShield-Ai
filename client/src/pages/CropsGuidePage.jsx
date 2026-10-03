import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Leaf, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { SeverityBadge } from '../components/SeverityBadge.jsx';

export const CropsGuidePage = ({ onStartScanForCrop }) => {
  const { cropsList, t } = useScan();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropId, setSelectedCropId] = useState(cropsList[0]?.id || 'tomato');

  const filteredCrops = cropsList.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.scientificName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCrop = cropsList.find(c => c.id === selectedCropId) || cropsList[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('cropsGuide.badge', 'Agronomic Reference Manual')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          {t('cropsGuide.title', 'Crop Doctor Encyclopedia')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {t('cropsGuide.subtitle', 'Explore botanical specifications, visual pathogen profiles, and IPM diagnostic guides for monitored crops.')}
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Crop List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-3xl p-5 space-y-4">
            
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('cropsGuide.searchPlaceholder', 'Search crops...')}
                className="w-full bg-forest-dark border border-forest-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredCrops.map((crop) => {
                const isSelected = selectedCropId === crop.id;
                return (
                  <button
                    key={crop.id}
                    onClick={() => setSelectedCropId(crop.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-forest-dark/60 border-forest-border/50 text-slate-300 hover:bg-forest-dark hover:border-forest-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crop.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white font-heading">
                          {crop.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 italic">
                          {crop.scientificName || crop.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest-dark border border-forest-border text-emerald-300">
                      {crop.diseaseCount || crop.diseases?.length || 0} {t('cropsGuide.diseasesCataloged', 'Diseases')}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Selected Crop Details & Disease List */}
        <div className="lg:col-span-8 space-y-6">
          {activeCrop ? (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              
              {/* Crop Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-border/60 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-forest-dark border border-forest-border flex items-center justify-center text-4xl shadow-xl">
                    {activeCrop.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white font-heading">
                      {activeCrop.name}
                    </h2>
                    <p className="text-xs text-emerald-300 italic font-mono">
                      {activeCrop.scientificName} · {activeCrop.category}
                    </p>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {activeCrop.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onStartScanForCrop(activeCrop.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-forest-dark font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all self-start sm:self-auto shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-forest-dark" />
                  <span>{t('cropsGuide.scanCrop', 'Scan')} {activeCrop.name}</span>
                </button>
              </div>

              {/* Diseases Catalog for this Crop */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <span>{t('cropsGuide.commonDiseases', 'Common Pathogens & Conditions')}</span>
                  <span className="text-xs text-emerald-400 font-normal">
                    ({activeCrop.diseases?.length || 0} {t('cropsGuide.diseasesCataloged', 'cataloged')})
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCrop.diseases?.map((disease) => (
                    <div
                      key={disease.id}
                      className="p-4 rounded-2xl bg-forest-dark/80 border border-forest-border hover:border-emerald-500/40 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">
                          {disease.name}
                        </h4>
                        <SeverityBadge severity={disease.severity} status={disease.status} size="sm" />
                      </div>

                      {disease.pathogen && (
                        <p className="text-[11px] text-emerald-300/80 italic font-mono">
                          {disease.pathogen}
                        </p>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {disease.description || 'Target-board necrotic rings and chlorotic halos common on older lower leaves.'}
                      </p>

                      <div className="pt-2 border-t border-forest-border/40 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{t('cropsGuide.ipmAvailable', 'IPM Guide Available')}</span>
                        <span className="text-emerald-400 font-bold">{t('cropsGuide.aiSupported', 'Supported in Vision AI ✓')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
              {t('cropsGuide.selectPrompt', 'Select a crop from the left catalog to view disease details.')}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
