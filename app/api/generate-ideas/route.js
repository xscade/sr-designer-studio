import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    // Using a fast text model for generating ideas
    const model = 'gemini-2.0-flash'; 

    const prompt = `
      Generate 5 distinct, creative, and inspiring interior design prompts for a user wanting to visualize a room. 
      Mix styles like Modern, Bohemian, Industrial, Minimalist, and Luxury.
      Keep each prompt under 15 words.
      Return ONLY a raw JSON array of strings. Example: ["Modern white living room", "Cozy reading nook"].
      Do not include markdown formatting or code blocks.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: prompt }]
      },
    });

    let text = "";
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.text) {
        text += part.text;
      }
    }

    // Clean up potential markdown code blocks just in case
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const ideas = JSON.parse(text);

    return NextResponse.json({ ideas });

  } catch (error) {
    console.error("Ideas Generation Error:", error);
    // Fallback ideas if API fails
    const fallbackIdeas = [
      "Minimalist Scandinavian living room with natural light",
      "Industrial chic loft with exposed brick walls",
      "Cozy bohemian bedroom with hanging plants",
      "Modern luxury kitchen with marble island",
      "Zen japanese garden inspired bathroom"
    ];
    return NextResponse.json({ ideas: fallbackIdeas });
  }
}
