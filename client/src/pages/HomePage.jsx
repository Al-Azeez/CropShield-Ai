import React from 'react';
import { 
  Scan, 
  Camera, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Cpu, 
  Droplets, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Leaf,
  Layers,
  FileCheck
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { SeverityBadge } from '../components/SeverityBadge.jsx';
import { SAMPLE_LEAVES } from '../data/sampleLeaves.js';
import { WeatherRiskWidget } from '../components/WeatherRiskWidget.jsx';

export const HomePage = ({ setActivePage, onTriggerScanWithSample, onOpenUpload, onOpenCamera }) => {
  const { historyList, cropsList, setCurrentDiagnosis, t } = useScan();

  const handleOpenScanHistory = (scan) => {
    setCurrentDiagnosis(scan);
    setActivePage('diagnosis');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[650px] h-96 sm:h-[450px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-lime-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>{t('home.badge', 'Next-Generation Agricultural Vision Intelligence')}</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] font-heading">
            {t('home.heroTitle1', 'Protect Your Crops.')} <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300">
              {t('home.heroTitle2', 'Detect Problems Early.')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed">
            {t('home.heroSubtitle', 'CROPSHIELD-AI uses intelligent image analysis to help farmers identify crop health problems, understand the symptoms, and take the right action faster.')}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            
            {/* Upload Plant Image Button */}
            <button
              onClick={onOpenUpload}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-forest-dark font-extrabold text-base shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all group"
            >
              <Scan className="w-5 h-5 text-forest-dark group-hover:rotate-12 transition-transform" />
              <span>{t('home.uploadBtn', 'Upload Plant Image')}</span>
            </button>

            {/* Take Photo Button */}
            <button
              onClick={onOpenCamera}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-forest-card hover:bg-forest-border/80 border border-forest-border hover:border-emerald-500/40 text-slate-100 font-bold text-base shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Camera className="w-5 h-5 text-emerald-400" />
              <span>{t('home.takePhotoBtn', 'Take Photo')}</span>
            </button>

          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('home.trust1', '8+ Global Crop Families')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('home.trust2', 'Explainable AI Symptom Hotspots')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t('home.trust3', 'Organic & IPM Treatment Guidance')}
            </span>
          </div>

        </div>

      </section>

      {/* 2. INSTANT TEST SCAN DEMO PICKER */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                  {t('home.testScansTitle', 'Instant Test Scans (1-Click Demonstration)')}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('home.testScansDesc', "Don't have a leaf image on hand? Click any sample below to experience the full AI diagnostic workflow:")}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
              {t('home.realSamples', 'Real Sample Leaves')}
            </span>
          </div>

          {/* Sample Grid - 4 Curated Leaves: Tomato, Corn, Rice (original photo), Potato */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAMPLE_LEAVES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onTriggerScanWithSample(sample)}
                className="group relative rounded-2xl overflow-hidden border border-forest-border bg-forest-dark/80 hover:border-emerald-400 transition-all cursor-pointer hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
              >
                <div className="aspect-square relative overflow-hidden bg-black">
                  <img
                    src={sample.imageUrl}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-2 left-2 text-lg">
                    {sample.icon}
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {sample.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {sample.targetCondition}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-emerald-400 font-semibold">
                    <span>{t('home.scanNow', 'Scan Now')}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 Step Visual Workflow) */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            {t('home.howItWorksBadge', 'Intuitive Farmer Workflow')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
            {t('home.howItWorksTitle', 'How CROPSHIELD-AI Works')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('home.howItWorksSubtitle', 'From field leaf photograph to comprehensive IPM prescription in under 3 seconds.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Step 1 */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-lg font-bold font-heading">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              {t('home.step1Title', '1. Snap or Upload Plant Photo')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.step1Desc', 'Take a clear picture of the symptomatic plant foliage using your smartphone or upload a saved field photograph. Select crop type or let AI auto-detect.')}
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 text-lg font-bold font-heading">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              {t('home.step2Title', '2. Multi-Stage Vision Analysis')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.step2Desc', 'The neural vision engine validates image quality, isolates chlorosis/necrosis zones, and identifies exact pathogens with high diagnostic confidence.')}
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400 text-lg font-bold font-heading">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              {t('home.step3Title', '3. Explainable Diagnosis & Treatment')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('home.step3Desc', 'Review visual symptom hotspots, receive a tailored step-by-step action plan (immediate action, dosage, prevention), and chat with the 24/7 AI Agronomist.')}
            </p>
          </div>

        </div>
      </section>

      {/* 4. REAL-TIME WEATHER RISK HAZARD WIDGET */}
      <section className="max-w-7xl mx-auto px-4">
        <WeatherRiskWidget />
      </section>

      {/* 5. SUPPORTED CROPS CATALOG SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
              {t('home.cropCoverage', 'Crop Coverage')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
              {t('home.supportedCropsTitle', 'Supported Agricultural Crops')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {t('home.supportedCropsSubtitle', 'Trained across high-impact horticultural vegetables, cereal staples, and orchard fruits.')}
            </p>
          </div>
          <button
            onClick={() => setActivePage('crops')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{t('home.exploreEncyclopedia', 'Explore Complete Encyclopedia')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cropsList.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setActivePage('crops')}
              className="glass-card glass-card-hover rounded-2xl p-5 space-y-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{crop.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forest-dark border border-forest-border text-emerald-300 font-semibold">
                  {crop.diseaseCount || crop.diseases?.length || 4} Conditions
                </span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-heading">
                  {crop.name}
                </h4>
                <p className="text-xs text-slate-400 italic">
                  {crop.scientificName}
                </p>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {crop.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KEY BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            {t('home.whyBadge', 'Why CROPSHIELD-AI')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {t('home.whyTitle', 'Designed for Real Field Conditions')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {t('home.whySubtitle', 'Empowering growers to cut crop loss by up to 40% and eliminate unnecessary pesticide sprayings.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-forest-card/40 border border-forest-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-heading">{t('home.benefit1Title', 'Early Threat Interception')}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('home.benefit1Desc', 'Detect fungal blights and viral vectors days before severe chlorosis collapses the canopy.')}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-forest-card/40 border border-forest-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-heading">{t('home.benefit2Title', 'Eco-Smart Treatment')}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('home.benefit2Desc', 'Organic bio-control formulations and targeted chemical dosages prevent overuse of pesticides.')}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-forest-card/40 border border-forest-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-heading">{t('home.benefit3Title', 'Explainable XAI Hotspots')}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('home.benefit3Desc', 'Visual evidence bounding boxes and feature rankings give you complete confidence in results.')}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-forest-card/40 border border-forest-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white font-heading">{t('home.benefit4Title', '24/7 Voice Agronomist')}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('home.benefit4Desc', 'Ask follow-up questions anytime by voice or text in multiple regional agricultural languages.')}
            </p>
          </div>
        </div>
      </section>

      {/* 7. RECENT DIAGNOSES SHOWCASE */}
      {historyList.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                {t('home.liveActivity', 'Live Activity')}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {t('home.recentScansTitle', 'Recent Diagnostic Scans')}
              </h2>
            </div>
            <button
              onClick={() => setActivePage('history')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>{t('home.viewAllHistory', 'View All History')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {historyList.slice(0, 3).map((scan) => (
              <div
                key={scan.id}
                onClick={() => handleOpenScanHistory(scan)}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={scan.imageUrl}
                      alt={scan.crop}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-2xl bg-black/60 backdrop-blur-md p-1 rounded-lg">
                        {scan.cropIcon || '🌱'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <SeverityBadge severity={scan.severity} status={scan.status} size="sm" />
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{scan.crop}</span>
                      <span className="font-mono text-emerald-400 font-bold">{scan.confidence}% Conf</span>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {scan.condition}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {scan.symptoms?.[0] || 'Target-like necrotic lesions detected.'}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-forest-border/50 flex items-center justify-between text-xs text-slate-400">
                  <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {t('home.inspectReport', 'Inspect Report →')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900/90 via-forest-base to-forest-dark border-2 border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
              {t('home.ctaTitle', 'Ready to Inspect Your Crops?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              {t('home.ctaDesc', 'Scan a plant leaf now to receive instant identification, explainable symptom evidence, and immediate treatment actions.')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenUpload}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-forest-dark font-extrabold text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              {t('home.startFreeScan', 'Start Free Crop Scan')}
            </button>
            <button
              onClick={() => setActivePage('dashboard')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-forest-card hover:bg-forest-border border border-forest-border text-slate-200 font-bold text-sm transition-all"
            >
              {t('home.openDashboard', 'Open Farmer Dashboard')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
