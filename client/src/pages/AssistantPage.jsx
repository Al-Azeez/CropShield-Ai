import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Loader2, 
  HelpCircle,
  Leaf,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { api } from '../services/api.js';

export const AssistantPage = () => {
  const { currentDiagnosis } = useScan();
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "👋 Welcome to the **CROPSHIELD AI Agronomist Workstation**!\n\nI can help you with:\n• Disease diagnosis insights & pathogen containment\n• Organic vs synthetic fungicide mixing dosages\n• Weather-based blight risk mitigation\n• Field sanitation & IPM long-term prevention protocols\n\nHow can I assist your farm today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.lang = 'en-US';
        recog.onresult = (e) => {
          setInputText(e.results[0][0].transcript);
          setIsListening(false);
        };
        recog.onerror = () => setIsListening(false);
        recog.onend = () => setIsListening(false);
        recognitionRef.current = recog;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*_#•]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async (customText = null) => {
    const text = customText || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const res = await api.askAssistant({
        message: text,
        diagnosisContext: currentDiagnosis,
        chatHistory: messages.map(m => ({ role: m.sender, content: m.text }))
      });

      const assistantMsg = {
        sender: 'assistant',
        text: res.reply || 'I reviewed your question. Always adhere to IPM guidelines and avoid overhead watering.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `⚠️ Assistant connection error: ${err.message}. Please try again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "Why do my tomato leaves have concentric target rings?",
    "How to prevent late blight from wiping out potatoes in humid rain?",
    "What is the recommended mixing ratio of copper fungicide per liter?",
    "Will fungal spores spread through drip irrigation?",
    "What organic bio-pesticides work against aphids and whiteflies?"
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 pb-16">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>Intelligent Agronomy Consultant</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white font-heading">
          CROPSHIELD AI ASSISTANT
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Ask questions anytime about field pathology, treatment schedules, and prevention.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="glass-card rounded-3xl overflow-hidden flex flex-col h-[650px] border-forest-border shadow-2xl">
        
        {/* Top bar */}
        <div className="p-4 bg-forest-dark/90 border-b border-forest-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                AI Agronomist Active
              </h3>
              <p className="text-[11px] text-emerald-300">
                Connected to CROPSHIELD Knowledge Graph
              </p>
            </div>
          </div>

          {currentDiagnosis && (
            <div className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Context: <strong>{currentDiagnosis.crop}</strong></span>
            </div>
          )}
        </div>

        {/* Suggestion Prompts */}
        <div className="px-4 py-2.5 bg-forest-dark border-b border-forest-border/40 overflow-x-auto flex items-center gap-2 no-scrollbar">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-medium whitespace-nowrap px-3 py-1.5 rounded-full bg-forest-card hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-forest-border transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                      : 'bg-forest-dark/90 border border-forest-border text-slate-200 rounded-bl-none space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  <div className="flex items-center justify-between gap-3 pt-2 text-[10px] opacity-60">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="hover:opacity-100 flex items-center gap-1 text-emerald-300 font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Read Aloud</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-bl-none bg-forest-dark border border-forest-border text-xs text-slate-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>AI Agronomist is reasoning through symptom etiology & treatment...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-forest-dark border-t border-forest-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-forest-card border-forest-border text-slate-400 hover:text-emerald-400'
              }`}
              title={isListening ? 'Stop Listening' : 'Voice Input'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about crop pathology, organic treatments, dosages..."
              className="flex-1 bg-forest-card border border-forest-border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-dark font-extrabold text-xs sm:text-sm disabled:opacity-40 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-4 h-4 text-forest-dark" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
