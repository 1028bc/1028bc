import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API. Vite requires the VITE_ prefix for environment variables.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

export interface StylizerResponse {
  optimizedTitle: string;
  optimizedDescription: string;
  tags: string[];
}

export const generateProductListing = async (rawTitle: string, rawDescription: string): Promise<StylizerResponse> => {
  if (!apiKey) {
    throw new Error('CRITICAL: VITE_GEMINI_API_KEY is missing from your .env file.');
  }

  try {
    // Flash model prioritizes speed and low token cost
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an elite e-commerce copywriter specializing in high-converting Etsy listings.
      Take the following raw product details and transform them into a fully optimized listing.
      
      Raw Title: ${rawTitle}
      Raw Description: ${rawDescription}

      Respond ONLY with a raw JSON object in the exact format below. Do not include markdown formatting like \`\`\`json.
      
      {
        "optimizedTitle": "A catchy, SEO-friendly Etsy title (max 140 characters)",
        "optimizedDescription": "A compelling description highlighting the value, including bullet points for features.",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12", "tag13"]
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Strip any residual markdown blocks just in case the AI wraps it
    const cleanJson = text.replace(/```json\n?|```/g, '').trim();
    
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('[LOGIC LAB] Gemini API Routing Error:', error);
    throw error;
  }
};