import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  MessageSquare, 
  Printer, 
  Share2, 
  ShieldCheck, 
  AlertTriangle, 
  Droplets, 
  Calendar, 
  Leaf, 
  CheckCircle2, 
  Info,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { SeverityBadge } from '../components/SeverityBadge.jsx';
import { VisualEvidence } from '../components/VisualEvidence.jsx';
import { ActionPlanCard } from '../components/ActionPlanCard.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const DiagnosisDetailPage = ({ onNewScan, onBackToHistory }) => {
  const { currentDiagnosis, openAssistantWithQuestion } = useScan();
  const { addToast } = useToast();

  if (!currentDiagnosis) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
        <div className="w-16 h-16 bg-forest-card rounded-3xl flex items-center justify-center mx-auto text-slate-400">
          <Leaf className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-white">No Active Diagnosis Selected</h3>
        <p className="text-xs text-slate-400">
          Upload a plant image or select a past diagnosis from the history library.
        </p>
        <button
          onClick={onNewScan}
          className="px-6 py-3 rounded-xl bg-emerald-500 text-forest-dark font-bold text-xs"
        >
          Start New Scan
        </button>
      </div>
    );
  }

  const d = currentDiagnosis;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 pb-16">
      
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-border/60 pb-4">
        <button
          onClick={onBackToHistory}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scans / History</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewScan}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest-card hover:bg-forest-border border border-forest-border text-xs text-slate-200 font-bold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scan Another Crop</span>
          </button>
          
          <button
            onClick={() => openAssistantWithQuestion(`Tell me more about how to treat ${d.condition} on my ${d.crop}.`)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-dark font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 text-forest-dark" />
            <span>Ask AI Agronomist</span>
          </button>
        </div>
      </div>

      {/* 1. PRIMARY RESULT HERO BANNER */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border-emerald-500/40">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Specimen Thumbnail with Severity Ribbon */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-square bg-black border-2 border-forest-border shadow-2xl group">
            <img
              src={d.imageUrl}
              alt={d.crop}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 border border-forest-border">
              <span className="text-base">{d.cropIcon || '🌱'}</span>
              <span>{d.crop}</span>
            </div>
            <div className="absolute top-3 right-3">
              <SeverityBadge severity={d.severity} status={d.status} size="md" />
            </div>
          </div>

          {/* Core Diagnosis Summary */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                AI Confirmed Match
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(d.createdAt).toLocaleDateString()} at {new Date(d.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                {d.condition}
              </h1>
              {d.pathogen && (
                <p className="text-sm text-emerald-300 italic font-mono mt-1">
                  Pathogen: {d.pathogen}
                </p>
              )}
            </div>

            {/* Confidence & Severity Meter */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              
              <div className="p-3.5 rounded-2xl bg-forest-dark/80 border border-forest-border space-y-1">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
                  Diagnostic Confidence
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-emerald-400 font-heading">
                    {d.confidence}%
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                    High
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-forest-dark/80 border border-forest-border space-y-1">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
                  Crop Health Status
                </span>
                <div className="flex items-center gap-1.5">
                  {d.status === 'Healthy' ? (
                    <span className="text-emerald-400 font-bold text-base flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Healthy
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-base flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Diseased
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-forest-dark/80 border border-forest-border space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
                  Severity Level
                </span>
                <div className="pt-0.5">
                  <SeverityBadge severity={d.severity} status={d.status} size="sm" />
                </div>
              </div>

            </div>

            {d.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {d.description}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* 2. SYMPTOMS & CAUSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Detected Visual Symptoms */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-forest-border/60">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              👁️
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Detected Visual Symptoms
              </h3>
              <p className="text-[11px] text-slate-400">
                Key physical leaf signatures identified by computer vision
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {d.symptoms?.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200 leading-relaxed p-2.5 rounded-xl bg-forest-dark/50 border border-forest-border/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Possible Causes */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-forest-border/60">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              ⚠️
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Contributing Causes & Environment
              </h3>
              <p className="text-[11px] text-slate-400">
                Field and climate factors that triggered infection
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {d.causes?.map((cause, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-200 leading-relaxed p-2.5 rounded-xl bg-forest-dark/50 border border-forest-border/50">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3. EXPLAINABLE AI (XAI) HOTSPOT & REASONING SECTION */}
      <VisualEvidence diagnosis={d} />

      {/* 4. ACTION PLAN (5 Structured Steps + Prevention) */}
      <ActionPlanCard diagnosis={d} />

    </div>
  );
};
