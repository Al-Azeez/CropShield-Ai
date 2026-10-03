import React, { useState } from 'react';
import { CloudRain, Wind, Droplets, Thermometer, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WeatherRiskWidget = () => {
  const [activeTab, setActiveTab] = useState('blight');

  const weatherData = {
    temp: '24°C',
    humidity: '84%',
    wind: '12 km/h SE',
    rainfall: '4.2 mm (Last 24h)',
    dewPoint: '21°C',
    location: 'Agricultural Field Station #4'
  };

  const risks = [
    {
      id: 'blight',
      name: 'Blight Risk (Oomycetes)',
      level: 'High',
      score: 86,
      color: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
      barColor: 'bg-rose-500',
      reason: 'High relative humidity (>80%) and leaf wetness duration exceeding 7 hours favors rapid Phytophthora sporulation.',
      action: 'Apply preventive copper or bio-fungicide within 24 hours.'
    },
    {
      id: 'rust',
      name: 'Rust Spores (Puccinia)',
      level: 'Moderate',
      score: 62,
      color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
      barColor: 'bg-amber-500',
      reason: 'Southeastern wind vectors carrying airborne urediniospores from adjacent regions.',
      action: 'Scout upper canopies of cereal crops daily.'
    },
    {
      id: 'mildew',
      name: 'Powdery Mildew',
      level: 'Low',
      score: 28,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      barColor: 'bg-emerald-500',
      reason: 'Ambient temperatures and airflow currently suppress conidial germination.',
      action: 'Continue standard routine irrigation management.'
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-border/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white font-heading">
              Microclimate Disease Hazard Index
            </h3>
            <p className="text-xs text-slate-400">
              {weatherData.location} · Real-time agronomic risk forecast
            </p>
          </div>
        </div>

        {/* Live Weather Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark border border-forest-border text-slate-300">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>{weatherData.temp}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark border border-forest-border text-slate-300">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>{weatherData.humidity} RH</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-dark border border-forest-border text-slate-300">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>{weatherData.wind}</span>
          </div>
        </div>
      </div>

      {/* Disease Risk Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {risks.map((risk) => {
          const isSelected = activeTab === risk.id;
          return (
            <div
              key={risk.id}
              onClick={() => setActiveTab(risk.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? `${risk.color} border-2 shadow-lg`
                  : 'bg-forest-card/40 border-forest-border/50 hover:bg-forest-card/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">
                  {risk.name}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  risk.level === 'High' ? 'bg-rose-500/20 text-rose-300' :
                  risk.level === 'Moderate' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {risk.level}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-forest-dark rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${risk.barColor}`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Hazard Probability</span>
                <span className="font-bold text-slate-200">{risk.score}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Tab Detail Explanation */}
      {(() => {
        const current = risks.find(r => r.id === activeTab) || risks[0];
        return (
          <div className="p-4 rounded-2xl bg-forest-dark/80 border border-forest-border text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Agronomist Advisory: {current.name}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {current.reason}
            </p>
            <div className="pt-1 text-emerald-300 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recommended Action: {current.action}</span>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
