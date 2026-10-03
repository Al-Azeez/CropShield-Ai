const BASE_URL = '/api';

export const api = {
  // 1. Image Analysis
  async analyzePlantImage({ imageFile, imageBase64, imageUrl, cropId, userNotes, targetCondition }) {
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        if (cropId) formData.append('cropId', cropId);
        if (userNotes) formData.append('userNotes', userNotes);
        if (targetCondition) formData.append('targetCondition', targetCondition);

        const res = await fetch(`${BASE_URL}/diagnosis/analyze`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Analysis failed');
        return data.data;
      } else {
        const res = await fetch(`${BASE_URL}/diagnosis/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64, imageUrl, cropId, userNotes, targetCondition }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Analysis failed');
        return data.data;
      }
    } catch (err) {
      console.warn('API fetch error, using local fallback:', err.message);
      throw err;
    }
  },

  // 2. Diagnoses History
  async getDiagnoses(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/diagnosis?${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch history');
    return data.data;
  },

  // 3. Single Diagnosis Details
  async getDiagnosisById(id) {
    const res = await fetch(`${BASE_URL}/diagnosis/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch diagnosis details');
    return data.data;
  },

  // 4. Delete Diagnosis
  async deleteDiagnosis(id) {
    const res = await fetch(`${BASE_URL}/diagnosis/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete record');
    return data;
  },

  // 5. Crops Encyclopedia
  async getCrops() {
    const res = await fetch(`${BASE_URL}/crops`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch crops catalog');
    return data.data;
  },

  async getCropById(id) {
    const res = await fetch(`${BASE_URL}/crops/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch crop details');
    return data.data;
  },

  // 6. AI Agronomist Assistant Chat
  async askAssistant({ message, diagnosisContext, chatHistory }) {
    const res = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, diagnosisContext, chatHistory }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Chat assistant error');
    return data;
  },

  // 7. Dashboard Analytics
  async getDashboardStats() {
    const res = await fetch(`${BASE_URL}/dashboard/stats`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
    return data.data;
  }
};
