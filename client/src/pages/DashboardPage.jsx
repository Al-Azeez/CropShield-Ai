import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Scan, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  Activity, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Calendar,
  CloudRain,
  Leaf
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { SeverityBadge } from '../components/SeverityBadge.jsx';
import { WeatherRiskWidget } from '../components/WeatherRiskWidget.jsx';
import { api } from '../services/api.js';

export const DashboardPage = ({ onNewScan, onSelectScan, setActivePage }) => {
  const { historyList, openAssistantWithQuestion } = useScan();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.warn('Could not fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [historyList]);

  const totalScans = historyList.length;
  const healthyCount = historyList.filter(d => d.status === 'Healthy').length;
  const diseasedCount = historyList.filter(d => d.status === 'Diseased').length;
  const healthyPercentage = totalScans > 0 ? Math.round((healthyCount / totalScans) * 100) : 0;

  const severityCounts = {
    Low: historyList.filter(d => d.severity === 'Low').length,
    Moderate: historyList.filter(d => d.severity === 'Moderate').length,
    High: historyList.filter(d => d.severity === 'High').length,
    Critical: historyList.filter(d => d.severity === 'Critical').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Grower Field Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            Farmer Agronomy Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics on field health, pathogen pressure, and diagnostic trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewScan}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-forest-dark font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Scan className="w-4 h-4 text-forest-dark" />
            <span>New Crop Scan</span>
          </button>
        </div>
      </div>

      {/* 1. TOP METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Scans */}
        <div className="glass-card rounded-3xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Field Scans
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Scan className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">
            {totalScans}
          </div>
          <p className="text-[11px] text-emerald-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active monitoring across all acreage</span>
          </p>
        </div>

        {/* Healthy Crops */}
        <div className="glass-card rounded-3xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Healthy Plants
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-heading">
              {healthyCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({healthyPercentage}% of total)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Zero active pathogen symptoms
          </p>
        </div>

        {/* Detected Problems */}
        <div className="glass-card rounded-3xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Detected Problems
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-heading">
            {diseasedCount}
          </div>
          <p className="text-[11px] text-amber-300">
            Requires IPM treatment / quarantine
          </p>
        </div>

        {/* Critical Alerts */}
        <div className="glass-card rounded-3xl p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Critical Alerts
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-400 font-heading">
            {severityCounts.Critical}
          </div>
          <p className="text-[11px] text-rose-300">
            Rapid contagion risk (Blight/Blast)
          </p>
        </div>

      </div>

      {/* 2. DISEASE SEVERITY & BREAKDOWN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Severity Distribution */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-forest-border/60 pb-3">
            <h3 className="text-base font-bold text-white font-heading">
              Field Threat Severity Distribution
            </h3>
            <span className="text-[11px] text-slate-400">
              {totalScans} Total Scans
            </span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-300 font-semibold">Low / Healthy</span>
                <span className="font-mono text-slate-200">{severityCounts.Low} scans ({totalScans ? Math.round((severityCounts.Low/totalScans)*100) : 0}%)</span>
              </div>
              <div className="w-full bg-forest-dark rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${totalScans ? (severityCounts.Low/totalScans)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-300 font-semibold">Moderate Severity</span>
                <span className="font-mono text-slate-200">{severityCounts.Moderate} scans ({totalScans ? Math.round((severityCounts.Moderate/totalScans)*100) : 0}%)</span>
              </div>
              <div className="w-full bg-forest-dark rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${totalScans ? (severityCounts.Moderate/totalScans)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-rose-300 font-semibold">High Severity</span>
                <span className="font-mono text-slate-200">{severityCounts.High} scans ({totalScans ? Math.round((severityCounts.High/totalScans)*100) : 0}%)</span>
              </div>
              <div className="w-full bg-forest-dark rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full" style={{ width: `${totalScans ? (severityCounts.High/totalScans)*100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-red-400 font-semibold">Critical Threat</span>
                <span className="font-mono text-slate-200">{severityCounts.Critical} scans ({totalScans ? Math.round((severityCounts.Critical/totalScans)*100) : 0}%)</span>
              </div>
              <div className="w-full bg-forest-dark rounded-full h-2.5 overflow-hidden">
                <div className="bg-red-500 h-full rounded-full animate-pulse" style={{ width: `${totalScans ? (severityCounts.Critical/totalScans)*100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Agronomist Actions & Alerts */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-forest-border/60 pb-3">
            <h3 className="text-base font-bold text-white font-heading">
              Agronomy Quick Actions
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium">
              Instant Shortcuts
            </span>
          </div>

          <div className="space-y-3">
            <div
              onClick={onNewScan}
              className="p-3.5 rounded-2xl bg-forest-dark/80 hover:bg-forest-dark border border-forest-border hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">
                    Scan New Foliage Specimen
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Upload camera picture for multi-stage vision classification
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div
              onClick={() => openAssistantWithQuestion('What are the top 3 disease prevention practices for my current crops?')}
              className="p-3.5 rounded-2xl bg-forest-dark/80 hover:bg-forest-dark border border-forest-border hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-teal-300">
                    Consult CROPSHIELD AI Assistant
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Ask voice or text questions regarding dosages, mixing, and weather risks
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </div>

            <div
              onClick={() => setActivePage('crops')}
              className="p-3.5 rounded-2xl bg-forest-dark/80 hover:bg-forest-dark border border-forest-border hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-lime-300">
                    Browse Crop Doctor Encyclopedia
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Explore high-resolution symptom profiles for 8+ crop varieties
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. WEATHER RISK WIDGET */}
      <WeatherRiskWidget />

      {/* 4. RECENT ACTIVITY LIST */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-forest-border/60 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-heading">
              Recent Crop Health Scans
            </h3>
            <p className="text-xs text-slate-400">
              Latest diagnostic results logged across your acreage.
            </p>
          </div>
          <button
            onClick={() => setActivePage('history')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View All ({historyList.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {historyList.slice(0, 3).map((scan) => (
            <div
              key={scan.id}
              onClick={() => onSelectScan(scan)}
              className="p-4 rounded-2xl bg-forest-dark/80 border border-forest-border hover:border-emerald-500/40 transition-all cursor-pointer group flex items-start gap-4"
            >
              <img
                src={scan.imageUrl}
                alt={scan.crop}
                className="w-16 h-16 rounded-xl object-cover border border-forest-border shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">
                    {scan.cropIcon || '🌱'} {scan.crop}
                  </span>
                  <SeverityBadge severity={scan.severity} status={scan.status} size="sm" />
                </div>
                <h4 className="text-xs font-bold text-emerald-300 truncate">
                  {scan.condition}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono text-emerald-400 font-bold">{scan.confidence}% Conf</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
