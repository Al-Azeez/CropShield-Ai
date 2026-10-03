import { AIChatService } from '../services/aiChatService.js';

export const handleFarmerChat = async (req, res) => {
  try {
    const { message, diagnosisContext, chatHistory } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid question message is required.'
      });
    }

    const response = await AIChatService.processMessage({
      message,
      diagnosisContext,
      chatHistory
    });

    return res.status(200).json({
      success: true,
      reply: response.reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error handling chat message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate assistant response',
      error: error.message
    });
  }
};
