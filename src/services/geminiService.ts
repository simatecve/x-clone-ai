import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const enhanceTweet = async (currentText: string, tone: 'professional' | 'funny' | 'viral'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return currentText;

  try {
    const prompt = `Rewrite the following social media post to be more ${tone}. Keep it under 280 characters, engaging, and ready to post. Do not add hashtags unless necessary.
    
    Original text: "${currentText}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text?.trim() || currentText;
  } catch (error) {
    console.error("Error enhancing tweet:", error);
    return currentText;
  }
};

export const generateTweetTopic = async (topic: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "";

  try {
    const prompt = `Write a creative and engaging social media post about ${topic}. Use an emoji. Keep it concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Error generating tweet:", error);
    return "";
  }
};