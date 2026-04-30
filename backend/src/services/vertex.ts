import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// The API Key provided by the user
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCzgf11RHYdub3l4MW7CoLskdtEoo964Og';

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (query: string) => {
  console.log('Gemini Request:', query);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a highly dynamic and intelligent Indian Election Assistant. 
    Your goal is to answer ANY and ALL doubts regarding the Indian electoral process, from registration and voting to political parties and historic context.
    
    Guidelines:
    1. Be comprehensive and clear.
    2. Use HTML tags for better presentation (<strong>, <br/>, <ul>, <li>, <a href="...">).
    3. If the user asks about specific state rules, provide general guidance and point them to the official ECI (Election Commission of India) website.
    4. Maintain a polite and helpful "Namaste" tone.
    5. Always encourage democratic participation.
    
    User Query: ${query}`;

    console.log('Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Gemini Response received.');
    
    return text || 'I apologize, but I could not generate a response at this time. Please try rephrasing your question.';
  } catch (error) {
    console.error('Gemini API Error details:', error);
    throw error;
  }
};
