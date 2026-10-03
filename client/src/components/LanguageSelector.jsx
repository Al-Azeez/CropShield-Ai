import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useScan();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-card/80 border border-forest-border hover:border-emerald-500/40 text-slate-200 text-xs font-medium transition-all"
        title="Select Language"
      >
        <span className="text-sm">{activeLang.flag}</span>
        <span className="hidden sm:inline">{activeLang.code.toUpperCase()}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-forest-card border border-forest-border rounded-xl shadow-2xl z-50 backdrop-blur-lg">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-emerald-400/80 uppercase tracking-wider border-b border-forest-border/50">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-emerald-500/10 ${
                language === lang.code ? 'text-emerald-400 font-semibold bg-emerald-500/5' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span>{lang.native}</span>
              </div>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
