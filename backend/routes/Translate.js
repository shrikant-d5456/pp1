// routes/translate.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/openai', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a translator. Translate the following text into ${targetLang}. Only return the translated content, no explanations.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ translated: response.data.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI Translation Error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to translate" });
  }
});

export default router;
