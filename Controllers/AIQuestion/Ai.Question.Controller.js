import { config } from "dotenv";
config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const askquestion = async (req, res) => {
  try {
    const { subjectName, standard, numberOfQuestions } = req.body;
    if (!subjectName || !standard || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = `Generate ${numberOfQuestions} questions for class ${standard} on ${subjectName}.
Return the questions in JSON format as an array of objects, where each object has "questionNumber" and "questionText" fields. Respond with JSON format only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    if (!response || !response.text) {
      return res.status(500).json({
        success: false,
        message: "No response from AI model",
      });
    }

    let text = response.text;

    // Try to clean up JSON if wrapped in triple backticks
    if (text.startsWith("```")) {
      text = text.replace(/```json?/, "").replace(/```$/, "").trim();
    }

    let questions;
    try {
      questions = JSON.parse(text);
      // If parse successful, return parsed JSON
      return res.status(200).json({
        success: true,
        questions,
      });
    } catch {
      // If JSON parsing fails, return raw text
      return res.status(200).json({
        success: true,
        questions: text,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
