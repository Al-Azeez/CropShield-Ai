import { CROPS_DATA } from '../data/cropsData.js';

/**
 * CROPSHIELD-AI Agronomist Assistant Chat Service
 * Handles farmer queries with deep context awareness of current scan,
 * disease biology, organic/chemical treatments, and preventative practices.
 */
export class AIChatService {
  /**
   * Process a chat message
   * @param {Object} options
   * @param {string} options.message - The farmer's question
   * @param {Object} options.diagnosisContext - Active diagnosis details if chatting from a result
   * @param {Array} options.chatHistory - Previous chat messages
   */
  static async processMessage({ message, diagnosisContext = null, chatHistory = [] }) {
    const q = (message || '').toLowerCase().trim();
    let cropName = diagnosisContext?.crop || '';
    let conditionName = diagnosisContext?.condition || '';
    let severity = diagnosisContext?.severity || 'Moderate';
    let pathogen = diagnosisContext?.pathogen || '';

    // Quick Contextual Knowledge Base
    if (q.includes('why did this happen') || q.includes('cause') || q.includes('why is it happening')) {
      if (diagnosisContext && diagnosisContext.causes) {
        return {
          reply: `🌱 **Why this happened on your ${cropName}:**\n\n` +
            `The primary cause is **${pathogen || conditionName}**. Key contributing field factors include:\n` +
            diagnosisContext.causes.map((c, i) => `• ${c}`).join('\n') +
            `\n\n💡 *Agronomist Tip:* Wet foliage combined with warm, humid microclimates creates the ideal environment for fungal spores and bacteria to germinate.`
        };
      }
      return {
        reply: `Most crop infections stem from a combination of environmental humidity (>80%), prolonged leaf wetness, overhead irrigation splashing soil-borne spores, and dense planting that restricts airflow. Maintaining proper plant spacing and drip irrigation significantly reduces vulnerability.`
      };
    }

    if (q.includes('spread') || q.includes('spread to other plants') || q.includes('contagious') || q.includes('neighboring')) {
      if (severity === 'High' || severity === 'Critical') {
        return {
          reply: `⚠️ **High Risk of Spread!**\n\n` +
            `Yes, **${conditionName}** spreads rapidly through wind-borne spores, rain splash, and contaminated tools. Under humid conditions, it can infect neighboring ${cropName || 'plants'} within 24–48 hours.\n\n` +
            `**Immediate containment steps:**\n` +
            `1. Quarantine or remove heavily infected leaves immediately.\n` +
            `2. Do NOT touch healthy plants after touching infected foliage without sanitizing your hands/shears in 70% alcohol.\n` +
            `3. Apply a protective barrier spray (like Copper Fungicide or Bacillus subtilis) to plants within a 10-meter radius.`
        };
      }
      return {
        reply: `🌿 **Spread Potential:**\n\n` +
          `While **${conditionName || 'this condition'}** can spread under favorable damp conditions, taking prompt action now will keep it localized. Avoid sprinkler irrigation and scout adjacent rows every 2 days.`
      };
    }

    if (q.includes('what should i do first') || q.includes('immediate') || q.includes('first step') || q.includes('what to do now')) {
      if (diagnosisContext?.actionPlan?.immediate) {
        return {
          reply: `🚨 **Immediate First Steps for your ${cropName}:**\n\n` +
            diagnosisContext.actionPlan.immediate.map((step, i) => `**Step ${i + 1}:** ${step}`).join('\n\n') +
            `\n\n🕒 *Action Window:* Execute these steps within the next 12 to 24 hours to minimize yield loss.`
        };
      }
      return {
        reply: `1. **Sanitize:** Remove and safely destroy severely infected leaves.\n2. **Isolate:** Stop overhead watering and ensure foliage stays dry.\n3. **Protect:** Apply an appropriate targeted organic or chemical fungicide/bactericide.`
      };
    }

    if (q.includes('organic') || q.includes('natural') || q.includes('neem') || q.includes('bio') || q.includes('homemade')) {
      return {
        reply: `🍃 **Recommended Organic & Biological Treatments:**\n\n` +
          `1. **Liquid Copper Hydroxide / Octanoate:** Broad-spectrum protection against blights, leaf spots, and downy mildews (OMRI-listed).\n` +
          `2. **Bacillus subtilis / B. amyloliquefaciens:** Beneficial microbial sprays that colonize leaf surfaces and outcompete pathogenic fungi.\n` +
          `3. **Cold-Pressed Pure Neem Oil (1% - 1.5% with mild soap emulsifier):** Effective against early-stage powdery mildews, rusts, aphids, and mites.\n` +
          `4. **Baking Soda / Potassium Bicarbonate spray (5g per liter with a drop of vegetable oil):** Alters leaf pH to halt fungal spore germination.\n\n` +
          `⚠️ *Application note:* Spray in early morning or evening to prevent foliar sun-scorch.`
      };
    }

    if (q.includes('dosage') || q.includes('how much') || q.includes('mix') || q.includes('per liter') || q.includes('ratio')) {
      return {
        reply: `🧪 **Standard Agronomic Mixing & Dosage Guidelines:**\n\n` +
          `• **Copper Fungicide (50% WP):** 2.0g to 2.5g per 1 Liter of water (approx 30g per 15L knapsack sprayer).\n` +
          `• **Neem Oil (Cold-pressed 10,000 ppm):** 4 ml to 5 ml per 1 Liter of water + 1 ml liquid dish soap as emulsifier.\n` +
          `• **Mancozeb / Chlorothalonil Protectant:** 2.0g per 1 Liter of water.\n` +
          `• **Propiconazole / Triazoles:** 1.0 ml per 1 Liter of water.\n\n` +
          `⚠️ *Safety Rule:* Always wear protective gloves, eye goggles, and a respirator mask when mixing and spraying agricultural products.`
      };
    }

    if (q.includes('prevent') || q.includes('recurrence') || q.includes('next season') || q.includes('stop')) {
      if (diagnosisContext?.prevention) {
        return {
          reply: `🛡️ **Long-Term Prevention Strategy for ${cropName}:**\n\n` +
            diagnosisContext.prevention.map((p, i) => `• ${p}`).join('\n') +
            `\n\n🌾 *Key Rule:* Crop rotation and drip irrigation reduce pathogen pressure by over 75% across successive seasons.`
        };
      }
      return {
        reply: `• **Crop Rotation:** Rotate crop families every 2-3 years.\n• **Drip Irrigation:** Never wet leaves from above.\n• **Resistant Seeds:** Always choose certified disease-resistant hybrids.\n• **Field Hygiene:** Till in or dispose of old crop stubble before replanting.`
      };
    }

    if (q.includes('safe to eat') || q.includes('harvest') || q.includes('edible') || q.includes('fruit')) {
      return {
        reply: `🥗 **Harvest & Food Safety Guidance:**\n\n` +
          `• Unblemished, firm fruits from plants with leaf blights are safe to consume once thoroughly washed.\n` +
          `• Do **NOT** consume fruits showing soft watery rot, internal decay, or moldy sporulation.\n` +
          `• **Pre-Harvest Interval (PHI):** If you applied chemical fungicides or pesticides, check the PHI on the product label (usually 3 to 7 days for vegetables) before harvesting.`
      };
    }

    if (q.includes('weather') || q.includes('rain') || q.includes('humidity') || q.includes('temperature')) {
      return {
        reply: `⛅ **Weather & Crop Disease Dynamics:**\n\n` +
          `Fungal zoospores and bacterial cells require a continuous thin film of water on leaf surfaces for at least 4 to 8 hours to penetrate plant stomata. High relative humidity (>85%) and temperatures between 20°C–28°C accelerate reproduction cycles. Check our Dashboard Weather Risk Index before planning field sprayings.`
      };
    }

    // Default intelligent agronomist response
    const contextSnippet = conditionName ? ` regarding **${conditionName}** on your **${cropName}**` : '';
    return {
      reply: `👨‍🌾 **CROPSHIELD AI Agronomist:**\n\n` +
        `Thank you for your question${contextSnippet}!\n\n` +
        `To ensure maximum crop vigor and yield retention:\n` +
        `1. Keep leaves dry by using drip irrigation.\n` +
        `2. Maintain balanced nutrition (avoid excess nitrogen which produces succulent, disease-prone tissue).\n` +
        `3. Monitor plants every 2-3 days for early symptom onset.\n\n` +
        `Feel free to ask me about **specific chemical/organic dosages**, **weather risk mitigation**, or **step-by-step treatment plans**!`
    };
  }
}
