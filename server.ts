import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route: AI Product Advisor Proxy
app.post('/api/ai-advisor', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply: "Jokotoye Bisola is an AI Product Engineer & Full Stack Engineer who builds custom AI web apps, high-conversion flagships, and automated platforms. You can schedule a direct 20-minute discovery call using the button above!"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are the AI Product Advisor representing Jokotoye Bisola, an AI Product Engineer & Full Stack Product Engineer. Jokotoye Bisola engineers AI-powered web applications, high-conversion digital flagships, and automated platforms that scale revenue and automate operations. Be professional, concise, encouraging, and highlight her business outcome focus. Mention that visitors can book a discovery call using the 'Book Discovery Call' button.`
      }
    });

    const text = response.text || "Jokotoye Bisola builds high-converting digital products and AI web applications. Feel free to book a direct discovery call using the button at the top!";
    return res.json({ reply: text });
  } catch (error) {
    console.error('Error in /api/ai-advisor:', error);
    return res.json({
      reply: "Jokotoye Bisola builds custom AI web applications, high-conversion digital flagships, and full-stack software. You can book a direct 20-minute discovery call using the button above!"
    });
  }
});

// API Route: Contact Form Handler
app.post('/api/contact', (req, res) => {
  const { name, email, businessName, projectType, budget, message } = req.body;
  console.log('Received project inquiry:', { name, email, businessName, projectType, budget, message });
  return res.json({ success: true, message: 'Inquiry received successfully' });
});

async function startServer() {
  // Serve Vite frontend in dev/prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
