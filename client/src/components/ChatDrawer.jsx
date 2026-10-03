import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Loader2,
  Leaf
} from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { api } from '../services/api.js';

export const ChatDrawer = () => {
  const { 
    isChatOpen, 
    setIsChatOpen, 
    chatInitialQuestion, 
    setChatInitialQuestion,
    currentDiagnosis 
  } = useScan();

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "👋 Hello! I am your **CROPSHIELD AI Agronomist**. Ask me anything about crop diseases, organic/chemical mixing dosages, weather risks, or immediate treatments!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle incoming initial prompt trigger
  useEffect(() => {
    if (chatInitialQuestion && isChatOpen) {
      handleSendMessage(chatInitialQuestion);
      setChatInitialQuestion('');
    }
  }, [chatInitialQuestion, isChatOpen]);

  // Voice Input Setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
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
      alert('Speech Recognition is not supported in this browser. You can type your question.');
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
      // Remove markdown bold asterisks for clean speech
      const clean = text.replace(/[*_#•]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setSpeechSynthesisActive(true);
      utterance.onend = () => setSpeechSynthesisActive(false);
      utterance.onerror = () => setSpeechSynthesisActive(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (customMessage = null) => {
    const textToSend = customMessage || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customMessage) setInputText('');
    setIsLoading(true);

    try {
      const res = await api.askAssistant({
        message: textToSend,
        diagnosisContext: currentDiagnosis,
        chatHistory: messages.map(m => ({ role: m.sender, content: m.text }))
      });

      const assistantMsg = {
        sender: 'assistant',
        text: res.reply || 'I analyzed your query. Always ensure foliage stays dry and follow IPM safety procedures.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `⚠️ Error reaching AI Agronomist service: ${err.message}. Please check your connection and retry.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    "Why did this happen?",
    "Will it spread to other plants?",
    "What should I do first?",
    "How can I prevent it?",
    "What organic sprays work best?",
    "How much fungicide should I mix per liter?"
  ];

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-forest-dark border-l border-forest-border h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Chat Drawer Header */}
        <div className="p-4 sm:p-5 bg-forest-card/80 border-b border-forest-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base font-heading">
                  CROPSHIELD AI ASSISTANT
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[11px] text-emerald-300">
                24/7 Intelligent Agronomy & Field Consultant
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              setIsChatOpen(false);
            }}
            className="p-2 rounded-xl bg-forest-card hover:bg-forest-border text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Scan Context Banner (if available) */}
        {currentDiagnosis && (
          <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                Active Scan Context: <strong className="text-emerald-300">{currentDiagnosis.crop}</strong> ({currentDiagnosis.condition})
              </span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded shrink-0">
              {currentDiagnosis.confidence}% Conf
            </span>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-forest-dark border-b border-forest-border/40 overflow-x-auto no-scrollbar flex items-center gap-2">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] font-medium whitespace-nowrap px-3 py-1.5 rounded-full bg-forest-card hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-forest-border transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                      : 'bg-forest-card border border-forest-border text-slate-200 rounded-bl-none space-y-2'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  
                  <div className="flex items-center justify-between gap-3 pt-1 text-[10px] opacity-60">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text)}
                        title="Listen to this explanation"
                        className="hover:opacity-100 flex items-center gap-1 text-emerald-300"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Read Aloud</span>
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-bl-none bg-forest-card border border-forest-border text-xs text-slate-300 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Agronomist is analyzing symptoms and treatment database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-forest-card/80 border-t border-forest-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-forest-dark border-forest-border text-slate-400 hover:text-emerald-400'
              }`}
              title={isListening ? 'Stop Listening' : 'Voice Input (Speak your question)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask agronomist (e.g., 'What spray dosage should I use?')..."
              className="flex-1 bg-forest-dark border border-forest-border rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-dark font-bold disabled:opacity-40 transition-all shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4 text-forest-dark" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
