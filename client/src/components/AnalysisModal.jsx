import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Scan, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  FileText 
} from 'lucide-react';
import { sounds } from '../services/soundEffects.js';

const STAGES = [
  { id: 1, label: 'Image Quality Check', desc: 'Validating resolution, lighting, and leaf boundary segmentation...', icon: Scan },
  { id: 2, label: 'Visual Analysis', desc: 'Analyzing cellular texture patterns, chlorophyll index, and venation...', icon: Activity },
  { id: 3, label: 'Symptom Detection', desc: 'Isolating chlorotic halos, necrotic lesions, and fungal spores...', icon: ShieldAlert },
  { id: 4, label: 'Disease Prediction', desc: 'Querying agronomic neural classifier for pathogen probability...', icon: Cpu },
  { id: 5, label: 'Preparing Recommendations', desc: 'Synthesizing IPM treatment protocol and prevention guidelines...', icon: FileText },
];

export const AnalysisModal = ({ imagePreview, onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    sounds.playScanBlip();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 28); // Takes ~2.8 seconds for smooth realistic progression

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Map progress to stage index
    if (progress < 22) {
      setCurrentStageIndex(0);
    } else if (progress < 45) {
      if (currentStageIndex < 1) sounds.playScanBlip();
      setCurrentStageIndex(1);
    } else if (progress < 68) {
      if (currentStageIndex < 2) sounds.playScanBlip();
      setCurrentStageIndex(2);
    } else if (progress < 88) {
      if (currentStageIndex < 3) sounds.playScanBlip();
      setCurrentStageIndex(3);
    } else {
      if (currentStageIndex < 4) sounds.playScanBlip();
      setCurrentStageIndex(4);
    }

    if (progress === 100) {
      sounds.playSuccessChime();
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, currentStageIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02130d]/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-forest-dark border border-forest-border/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-lime-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-forest-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                AI Vision Diagnostic In Progress
              </h3>
              <p className="text-xs text-slate-400">
                Running multi-stage neural analysis on your plant specimen...
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-emerald-400 font-heading">
              {progress}%
            </span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Calculated
            </span>
          </div>
        </div>

        {/* Center Grid: Visual preview + Scanner HUD */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
          
          {/* Image with laser scanner */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black aspect-square shadow-xl group">
            <img
              src={imagePreview}
              alt="Scanning plant"
              className="w-full h-full object-cover filter contrast-105"
            />
            
            {/* Animated Laser Scanning Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent h-16 w-full animate-scan-line border-b-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] pointer-events-none" />

            {/* Target Reticle corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

            {/* HUD Status overlay */}
            <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-md rounded-lg px-2.5 py-1 flex items-center justify-between text-[10px] font-mono text-emerald-300">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                OPTICAL_TRACKING
              </span>
              <span>1080p · ROI: 96%</span>
            </div>
          </div>

          {/* Right: Step By Step Pipeline Checklist */}
          <div className="md:col-span-7 space-y-3">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-emerald-950/60 border-emerald-500/60 shadow-lg shadow-emerald-500/10 translate-x-1'
                      : isCompleted
                      ? 'bg-forest-card/40 border-forest-border/40 opacity-90'
                      : 'bg-forest-card/10 border-forest-border/20 opacity-40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500 font-bold">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-300' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                        {stage.label}
                      </h4>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 rounded font-mono animate-pulse">
                          Processing
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-forest-card rounded-full h-2.5 overflow-hidden border border-forest-border">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 h-full rounded-full transition-all duration-100 ease-out relative shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/60 animate-ping" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Stage {currentStageIndex + 1} of {STAGES.length}: {STAGES[currentStageIndex]?.label}</span>
            <span className="text-emerald-400 font-medium">CROPSHIELD-AI DeepVision™</span>
          </div>
        </div>

      </div>
    </div>
  );
};
