import React, { useState } from 'react';
import { 
  Eye, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';

export const VisualEvidence = ({ diagnosis }) => {
  const [showHotspots, setShowHotspots] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  if (!diagnosis || !diagnosis.explainableAI) return null;

  const { primaryReason, features = [], boundingZones = [], differentialDiagnoses = [] } = diagnosis.explainableAI;

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white font-heading">
              Explainable AI Visual Evidence
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Why did CROPSHIELD-AI identify this condition? Visual features & symptom hotspots.
          </p>
        </div>

        {/* Overlay Controls */}
        <div className="flex items-center gap-2 bg-forest-dark/80 p-1.5 rounded-xl border border-forest-border self-start sm:self-auto">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHotspots
                ? 'bg-emerald-500 text-forest-dark font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Hotspots</span>
          </button>
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHeatmap
                ? 'bg-amber-500 text-forest-dark font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Attention Map</span>
          </button>
        </div>
      </div>

      {/* Primary Diagnosis Explanation Banner */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            Diagnostic Rationale
          </h4>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
            {primaryReason}
          </p>
        </div>
      </div>

      {/* Main Grid: Visual Hotspot Image + Feature Weightings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Leaf Image with Interactive Bounding Hotspots */}
        <div className="lg:col-span-6 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border-2 border-forest-border bg-black aspect-square shadow-xl">
            <img
              src={diagnosis.imageUrl}
              alt="Leaf Visual Evidence"
              className="w-full h-full object-cover"
            />

            {/* Heatmap Overlay Simulation */}
            {showHeatmap && (
              <div 
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 45% 40%, rgba(239,68,68,0.85) 0%, rgba(245,158,11,0.6) 30%, rgba(16,185,129,0.3) 60%, transparent 80%)'
                }}
              />
            )}

            {/* Hotspots / Bounding Zones */}
            {showHotspots && boundingZones.map((zone, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedHotspot(zone)}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.width}%`,
                  height: `${zone.height}%`,
                }}
                className={`absolute border-2 rounded-xl transition-all cursor-pointer group flex items-start justify-start p-1 ${
                  selectedHotspot?.label === zone.label
                    ? 'border-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-105'
                    : 'border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/25 hover:border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                }`}
              >
                <div className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 font-bold border border-emerald-500/50 group-hover:text-white transition-colors">
                  {zone.label}
                </div>
              </div>
            ))}

            {/* Interactive hint footer */}
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md rounded-lg px-2.5 py-1 text-[10px] text-slate-300 flex items-center gap-1.5 border border-forest-border">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Click any hotspot to inspect feature</span>
            </div>
          </div>

          {selectedHotspot && (
            <div className="p-3 bg-forest-card rounded-xl border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between animate-fade-in">
              <span>Selected Feature: <strong>{selectedHotspot.label}</strong></span>
              <button 
                onClick={() => setSelectedHotspot(null)}
                className="text-[10px] underline hover:text-white"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Right: Detected Features Breakdown & Differential Diagnoses */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Visual Features Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-heading">
              <span>Symptom Feature Weights</span>
              <span className="text-[10px] font-normal text-slate-400">({features.length} detected)</span>
            </h4>

            <div className="space-y-2.5">
              {features.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-forest-card/60 border border-forest-border/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {feat.name}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {feat.importance}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-forest-dark rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                      style={{ width: `${feat.importance}%` }}
                    />
                  </div>

                  {feat.note && (
                    <p className="text-[11px] text-slate-400">
                      {feat.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Differential Diagnoses Probabilities */}
          {differentialDiagnoses.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-heading">
                Differential Diagnoses Match
              </h4>

              <div className="space-y-2">
                {differentialDiagnoses.map((diff, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-forest-dark/70 border border-forest-border text-xs">
                    <span className="text-slate-300 font-medium">
                      {idx === 0 ? '🥇 ' : idx === 1 ? '🥈 ' : '🥉 '}
                      {diff.disease}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-forest-card rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            idx === 0 ? 'bg-emerald-400' : 'bg-slate-500'
                          }`}
                          style={{ width: `${diff.probability}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-200 w-9 text-right">
                        {diff.probability}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
