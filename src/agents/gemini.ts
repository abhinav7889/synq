import { GoogleGenerativeAI } from "@google/generative-ai"

// GEMINI_API_KEY must be set in .env.local

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

export async function geminiGenerate(prompt: string): Promise<string> {
  if (!genAI) {
    throw new Error("GEMINI_API_KEY not configured")
  }

  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" })

  const result = await model.generateContent(prompt)
  return result.response.text()
}


// retry up to 3 times on 503 from Gemini API
