import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generatePersuasiveCopy = async (): Promise<string> => {
  const ai = getGeminiClient();
  
  // Fallback text if API key is missing or fails
  const fallbackText = "Descubra o segredo que a indústria do emagrecimento não quer que você saiba. Milhares de mulheres comuns estão recuperando a autoestima e o corpo dos sonhos sem passar fome e sem exercícios exaustivos. Este aplicativo é o seu novo guia definitivo para uma vida mais leve e feliz. A mudança começa agora.";

  if (!ai) return fallbackText;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Atue como um copywriter de elite especializado em vendas diretas e emagrecimento (nicho Black/Health).
        
        Escreva um parágrafo "matador" e altamente persuasivo (aprox. 60-80 palavras) para substituir um vídeo de vendas em uma landing page.
        
        Público: Mulheres que querem emagrecer rápido, já tentaram de tudo e estão frustradas.
        Produto: Um aplicativo de dieta natural, fácil e prático.
        Tom de voz: Empático, urgente, revelador e motivador.
        
        O texto deve convencer a pessoa a clicar no botão de compra imediatamente. Foque nos benefícios emocionais e na facilidade.
        Retorne apenas o texto puro, sem aspas ou marcações.
      `,
      config: {
        temperature: 0.9,
      }
    });

    return response.text?.trim() || fallbackText;
  } catch (error) {
    console.error("Error generating copy:", error);
    return fallbackText;
  }
};