import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scan, 
  History, 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Sparkles,
  Leaf
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { LanguageSelector } from './LanguageSelector.jsx';

export const Navbar = ({ activePage, setActivePage }) => {
  const { soundEnabled, setSoundEnabled, setIsChatOpen, t } = useScan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Leaf },
    { id: 'scan', label: t('nav.scan', 'Scan Plant'), icon: Scan },
    { id: 'history', label: t('nav.history', 'History'), icon: History },
    { id: 'dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'crops', label: t('nav.crops', 'Encyclopedia'), icon: BookOpen },
    { id: 'assistant', label: t('nav.assistant', 'AI Agronomist'), icon: MessageSquare },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-forest-base flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all border border-emerald-400/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg md:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-400 font-heading">
                  CROPSHIELD<span className="text-emerald-400 font-normal">-AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 hidden sm:inline-block">
                  v1.0 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 tracking-wide hidden sm:block">
                Intelligent Crop Health Assistant
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-forest-card/40 p-1.5 rounded-full border border-forest-border/40 backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500 text-forest-dark shadow-md shadow-emerald-500/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-forest-dark' : 'text-emerald-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action buttons & tools */}
          <div className="flex items-center gap-2.5">
            {/* Audio Feedback Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className="p-2 rounded-lg bg-forest-card/60 border border-forest-border hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 transition-colors hidden sm:flex items-center justify-center"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Instant Scan CTA */}
            <button
              onClick={() => handleNavClick('scan')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-forest-dark font-bold text-xs shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Scan className="w-4 h-4 text-forest-dark" />
              <span>{t('nav.scan', 'Scan Crop')}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-forest-card/80 border border-forest-border text-slate-200 hover:text-emerald-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forest-dark/95 border-b border-forest-border px-4 pt-3 pb-5 space-y-2 backdrop-blur-xl animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-forest-dark font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-forest-card'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-forest-dark' : 'text-emerald-400'}`} />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('scan')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-forest-dark font-bold text-sm shadow-lg shadow-emerald-500/25"
            >
              <Scan className="w-5 h-5 text-forest-dark" />
              <span>Upload or Capture Plant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
