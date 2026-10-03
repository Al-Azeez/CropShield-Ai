import React from 'react';
import { ShieldCheck, Heart, Leaf, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';

export const Footer = ({ setActivePage }) => {
  const { t } = useScan();
  return (
    <footer className="w-full bg-[#02130d] border-t border-forest-border/60 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-border/40">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-forest-base flex items-center justify-center border border-emerald-400/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white font-heading">
                CROPSHIELD<span className="text-emerald-400">-AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.desc', 'State-of-the-art agricultural vision platform designed to assist smallholders and enterprise growers with early disease detection, explainable diagnostics, and eco-smart treatment plans.')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Neural Vision Engine 99.2% Online
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              {t('footer.quickLinks', 'Platform Workflow')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.home', 'Home Overview')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('scan')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.scan', 'Upload & Image Scan')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('history')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.history', 'Diagnosis History')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dashboard')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.dashboard', 'Agronomy Dashboard')}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('crops')} className="hover:text-emerald-400 transition-colors">
                  {t('nav.crops', 'Crop Doctor Reference')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Supported Crops */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              Monitored Crops
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">🍅 Tomato</span>
              <span className="flex items-center gap-1.5 text-slate-300">🥔 Potato</span>
              <span className="flex items-center gap-1.5 text-slate-300">🌽 Corn / Maize</span>
              <span className="flex items-center gap-1.5 text-slate-300">🌾 Rice / Paddy</span>
              <span className="flex items-center gap-1.5 text-slate-300">🌾 Wheat</span>
              <span className="flex items-center gap-1.5 text-slate-300">🫑 Bell Pepper</span>
              <span className="flex items-center gap-1.5 text-slate-300">🍎 Apple Orchard</span>
              <span className="flex items-center gap-1.5 text-slate-300">🍇 Grapevine</span>
            </div>
          </div>

          {/* Col 4: Explainable AI & Science */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-heading">
              Agronomy Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnostic recommendations comply with Integrated Pest Management (IPM) guidelines and organic OMRI-certified agricultural best practices.
            </p>
            <div className="p-3 rounded-xl bg-forest-card/50 border border-forest-border text-[11px] text-emerald-300/90 flex items-start gap-2">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Multi-Stage Explainable AI with visual evidence hotspot mapping.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CROPSHIELD-AI Platform. Built for Sustainable Agriculture.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline" /> for global farmers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
