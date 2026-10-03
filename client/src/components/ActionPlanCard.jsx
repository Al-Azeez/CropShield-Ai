import React from 'react';
import { 
  AlertOctagon, 
  FlaskConical, 
  Ban, 
  Radio, 
  CalendarClock, 
  ShieldCheck, 
  MessageSquare, 
  ChevronRight,
  Printer,
  Share2
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const ActionPlanCard = ({ diagnosis }) => {
  const { openAssistantWithQuestion } = useScan();
  const { addToast } = useToast();

  if (!diagnosis || !diagnosis.actionPlan) return null;

  const { immediate = [], treatment = [], whatToAvoid = [], monitoring = [], followUp = [] } = diagnosis.actionPlan;
  const prevention = diagnosis.prevention || [];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `CROPSHIELD-AI Report: ${diagnosis.crop} - ${diagnosis.condition}`,
        text: `Diagnosis: ${diagnosis.condition} (${diagnosis.confidence}% confidence). Severity: ${diagnosis.severity}. Check recommended actions.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Diagnostic report link copied to clipboard!', 'success');
    }
  };

  const steps = [
    {
      num: 1,
      title: 'Immediate Action',
      icon: AlertOctagon,
      iconColor: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
      items: immediate,
      prompt: `What immediate containment steps should I take right now for ${diagnosis.condition}?`
    },
    {
      num: 2,
      title: 'Treatment Guidance (Organic & Targeted)',
      icon: FlaskConical,
      iconColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
      items: treatment,
      prompt: `What are the exact mixing dosages and spray intervals for treating ${diagnosis.condition}?`
    },
    {
      num: 3,
      title: 'What To Avoid (Crucial Errors)',
      icon: Ban,
      iconColor: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
      items: whatToAvoid,
      prompt: `What common farmer mistakes will make ${diagnosis.condition} worse?`
    },
    {
      num: 4,
      title: 'Monitor Nearby Plants',
      icon: Radio,
      iconColor: 'text-sky-400 bg-sky-500/20 border-sky-500/40',
      items: monitoring,
      prompt: `How quickly will ${diagnosis.condition} spread to surrounding rows?`
    },
    {
      num: 5,
      title: 'Follow-Up Recommendation',
      icon: CalendarClock,
      iconColor: 'text-purple-400 bg-purple-500/20 border-purple-500/40',
      items: followUp,
      prompt: `When should I take my follow-up re-scan for ${diagnosis.crop}?`
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* What Should I Do Now Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-border/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <AlertOctagon className="w-5 h-5" />
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white font-heading">
                Step-by-Step Action Plan
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              What should I do now? Follow this tailored agronomist prescription.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto no-print">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-forest-card hover:bg-forest-border border border-forest-border text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
              title="Print Prescription Report"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Print Report</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2 rounded-xl bg-forest-card hover:bg-forest-border border border-forest-border text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
              title="Share Report"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Action Steps Accordion / Cards */}
        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            if (!step.items || step.items.length === 0) return null;

            return (
              <div
                key={step.num}
                className="p-4 md:p-5 rounded-2xl bg-forest-dark/70 border border-forest-border hover:border-emerald-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center font-bold text-xs ${step.iconColor}`}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => openAssistantWithQuestion(step.prompt)}
                    className="no-print flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 pl-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prevention Section */}
      {prevention.length > 0 && (
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-4 border-emerald-500/30">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">
                How Can I Prevent This From Spreading & Returning?
              </h3>
              <p className="text-xs text-slate-400">
                Long-term agronomic prevention strategies for consecutive crop seasons.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {prevention.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-forest-card/50 border border-forest-border text-xs md:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                  ✓
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
