import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  Calendar, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Leaf, 
  LayoutGrid, 
  List,
  ChevronRight
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { SeverityBadge } from '../components/SeverityBadge.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { api } from '../services/api.js';

export const HistoryPage = ({ onSelectScan, onNewScan }) => {
  const { historyList, refreshHistory, isLoadingHistory } = useScan();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filteredHistory = useMemo(() => {
    return historyList.filter(item => {
      const matchesSearch = 
        !searchQuery ||
        item.crop?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.condition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.pathogen?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCrop = selectedCropFilter === 'all' || item.crop?.toLowerCase().includes(selectedCropFilter.toLowerCase());
      const matchesSeverity = selectedSeverityFilter === 'all' || item.severity?.toLowerCase() === selectedSeverityFilter.toLowerCase();
      const matchesStatus = selectedStatusFilter === 'all' || item.status?.toLowerCase() === selectedStatusFilter.toLowerCase();

      return matchesSearch && matchesCrop && matchesSeverity && matchesStatus;
    });
  }, [historyList, searchQuery, selectedCropFilter, selectedSeverityFilter, selectedStatusFilter]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this diagnosis record?')) return;

    try {
      await api.deleteDiagnosis(id);
      addToast('Scan record deleted successfully', 'success');
      refreshHistory();
    } catch (err) {
      addToast(`Delete failed: ${err.message}`, 'error');
    }
  };

  const handleExportCSV = () => {
    if (historyList.length === 0) {
      addToast('No scan records available to export', 'warning');
      return;
    }

    const headers = ['ID', 'Date', 'Crop', 'Condition', 'Pathogen', 'Status', 'Severity', 'Confidence'];
    const rows = historyList.map(item => [
      item.id,
      new Date(item.createdAt).toISOString(),
      `"${item.crop}"`,
      `"${item.condition}"`,
      `"${item.pathogen || ''}"`,
      item.status,
      item.severity,
      `${item.confidence}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cropshield-diagnoses-export-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Diagnosis history exported as CSV', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Field Archives</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            Diagnosis Scan History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, filter, and inspect past plant health assessments and prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-card hover:bg-forest-border border border-forest-border text-xs text-slate-200 font-bold transition-all"
            title="Export CSV"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onNewScan}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-forest-dark font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-forest-dark" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop, disease, or pathogen..."
              className="w-full bg-forest-dark border border-forest-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Crop Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="w-full bg-forest-dark border border-forest-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">🌾 All Crop Species</option>
              <option value="tomato">🍅 Tomato</option>
              <option value="potato">🥔 Potato</option>
              <option value="corn">🌽 Corn / Maize</option>
              <option value="rice">🌾 Rice / Paddy</option>
              <option value="wheat">🌾 Wheat</option>
              <option value="pepper">🫑 Bell Pepper</option>
              <option value="apple">🍎 Apple Orchard</option>
              <option value="grape">🍇 Grapevine</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedSeverityFilter}
              onChange={(e) => setSelectedSeverityFilter(e.target.value)}
              className="w-full bg-forest-dark border border-forest-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">⚡ All Severities</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full bg-forest-dark border border-forest-border rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">🩺 All Statuses</option>
              <option value="diseased">Diseased</option>
              <option value="healthy">Healthy</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="lg:col-span-1 flex items-center justify-end gap-1 bg-forest-dark p-1 rounded-xl border border-forest-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-emerald-500 text-forest-dark' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-emerald-500 text-forest-dark' : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* History Items Render */}
      {filteredHistory.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-4">
          <Leaf className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white font-heading">
            No Diagnosis Scans Found
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or filters, or perform a new plant health scan.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCropFilter('all');
              setSelectedSeverityFilter('all');
              setSelectedStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-forest-card border border-forest-border text-xs text-emerald-400 font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((scan) => (
            <div
              key={scan.id}
              onClick={() => onSelectScan(scan)}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={scan.imageUrl}
                    alt={scan.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 border border-forest-border">
                    <span>{scan.cropIcon || '🌱'}</span>
                    <span>{scan.crop}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <SeverityBadge severity={scan.severity} status={scan.status} size="sm" />
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {scan.confidence}% Confidence
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {scan.condition}
                    </h3>
                    {scan.pathogen && (
                      <p className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5">
                        {scan.pathogen}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {scan.symptoms?.[0] || scan.description || 'Target-like lesions detected on foliage.'}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-forest-border/60 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => handleDelete(e, scan.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Open Report</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View Table */
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-forest-dark/80 border-b border-forest-border text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Specimen</th>
                  <th className="p-4">Crop</th>
                  <th className="p-4">Condition / Pathogen</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Confidence</th>
                  <th className="p-4">Scan Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-border/50">
                {filteredHistory.map((scan) => (
                  <tr
                    key={scan.id}
                    onClick={() => onSelectScan(scan)}
                    className="hover:bg-forest-card/50 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <img
                        src={scan.imageUrl}
                        alt={scan.crop}
                        className="w-12 h-12 rounded-xl object-cover border border-forest-border"
                      />
                    </td>
                    <td className="p-4 font-bold text-white">
                      <span className="mr-1.5">{scan.cropIcon || '🌱'}</span>
                      {scan.crop}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-100">{scan.condition}</div>
                      <div className="text-[11px] text-slate-400 italic">{scan.pathogen}</div>
                    </td>
                    <td className="p-4">
                      <SeverityBadge severity={scan.severity} status={scan.status} size="sm" />
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {scan.confidence}%
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(scan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onSelectScan(scan)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, scan.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
