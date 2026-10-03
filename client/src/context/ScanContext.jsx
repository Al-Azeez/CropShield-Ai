import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api.js';
import { TRANSLATIONS } from '../data/translations.js';

const ScanContext = createContext(null);

export const ScanProvider = ({ children }) => {
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [cropsList, setCropsList] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStageText, setAnalysisStageText] = useState('');
  
  // UI states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState('');
  const [language, setLanguage] = useState(() => localStorage.getItem('cropshield_lang') || 'en');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('cropshield_lang', language);
  }, [language]);

  // Translation helper supporting dot-notation keys: e.g. t('nav.home', 'Home')
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    const enDict = TRANSLATIONS['en'];
    
    const parts = path.split('.');
    
    // Try in active language
    let val = langDict;
    for (const part of parts) {
      if (val && typeof val === 'object' && part in val) {
        val = val[part];
      } else {
        val = undefined;
        break;
      }
    }
    if (val !== undefined && typeof val === 'string') return val;

    // Fallback to English
    let enVal = enDict;
    for (const part of parts) {
      if (enVal && typeof enVal === 'object' && part in enVal) {
        enVal = enVal[part];
      } else {
        enVal = undefined;
        break;
      }
    }
    if (enVal !== undefined && typeof enVal === 'string') return enVal;

    return fallback || path;
  }, [language]);

  // Fetch crops catalog on mount
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const crops = await api.getCrops();
        setCropsList(crops || []);
      } catch (err) {
        console.warn('Could not load crops catalog:', err);
      }
    };
    fetchCrops();
  }, []);

  // Fetch history
  const refreshHistory = useCallback(async (params = {}) => {
    setIsLoadingHistory(true);
    try {
      const data = await api.getDiagnoses(params);
      setHistoryList(data || []);
    } catch (err) {
      console.warn('Could not load diagnosis history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    refreshHistory();
  }, [refreshHistory]);

  const openAssistantWithQuestion = (question = '') => {
    setChatInitialQuestion(question);
    setIsChatOpen(true);
  };

  return (
    <ScanContext.Provider value={{
      currentDiagnosis,
      setCurrentDiagnosis,
      historyList,
      setHistoryList,
      cropsList,
      isLoadingHistory,
      refreshHistory,
      isAnalyzing,
      setIsAnalyzing,
      analysisProgress,
      setAnalysisProgress,
      analysisStageText,
      setAnalysisStageText,
      isChatOpen,
      setIsChatOpen,
      chatInitialQuestion,
      setChatInitialQuestion,
      openAssistantWithQuestion,
      language,
      setLanguage,
      soundEnabled,
      setSoundEnabled,
      t
    }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) throw new Error('useScan must be used within ScanProvider');
  return context;
};
