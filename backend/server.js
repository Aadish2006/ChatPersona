const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const prompts = require('./prompts');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get the system prompt based on persona
const getSystemPrompt = (persona) => {
  const normalizedPersona = persona.toLowerCase();
  return prompts[normalizedPersona] || prompts.anshuman;
};

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  const { messages, persona } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (!persona) {
    return res.status(400).json({ error: 'Persona is required' });
  }

  try {
    const systemPrompt = getSystemPrompt(persona);
    
    // Use gemini-flash-latest to automatically route to the most stable cluster
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    // Construct a single robust prompt to avoid strict ChatSession formatting rules
    let fullPrompt = `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nCONVERSATION HISTORY:\n`;
    
    for (const msg of messages) {
      const role = (msg.role === 'user') ? 'Student' : 'You';
      fullPrompt += `${role}: ${msg.content}\n`;
    }
    fullPrompt += `You:`; // Prompt the model to complete the next message

    // Call Gemini with a simple automatic retry mechanism for 503 Overload errors
    let botMessage = '';
    let attempts = 0;
    
    while (attempts < 3) {
      try {
        const result = await model.generateContent(fullPrompt);
        botMessage = result.response.text();
        break; // Success! Exit the retry loop
      } catch (err) {
        attempts++;
        if (err.status === 503 && attempts < 3) {
          console.warn(`Gemini server overloaded (503). Retrying... attempt ${attempts}`);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        } else {
          throw err; // Throw if it's not a 503 or if we ran out of attempts
        }
      }
    }

    res.json({ message: botMessage });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to generate response.',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
