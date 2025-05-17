import { config } from "dotenv";
config();

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apikey: process.env.GEMINI_API_KEY });

export const askquestion = async (req, res) => {
  try {
    const { subjectName, standard, numberOfQuestions } = req.body;
    if (!subjectName || !standard || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    if (!model) {
      return res.status(400).json({
        success: false,
        message: "Failed to get AI Model.",
      });
    }

    const prompt = `Generate ${numberOfQuestions} questions for class ${standard} on ${subjectName}.`;

    const result = await model.generateContent(prompt);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to generate questions.",
      });
    }

    const response = await result.response;
    const text = await response.text();

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Response is empty.",
      });
    }

    return res.status(200).json({
      success: true,
      questions: text,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
