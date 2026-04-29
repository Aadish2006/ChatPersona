# ChatPersona AI Chatbot

A full-stack, persona-based AI chatbot built with React (Vite) and Node.js (Express). This app allows users to interact with three distinct personas (Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra) representing key figures from Scaler.

## Features
- **Three Distinct Personas:** Each persona has a unique system prompt, communication style, constraints, and Chain-of-Thought processing.
- **Dynamic UI:** A responsive React frontend with a clean, dark-mode inspired design.
- **Secure Backend:** API keys are handled securely via a Node.js Express server.
- **UX Features:** Persona switcher (clears context), typing indicators, and suggestion chips tailored to the active persona.

## Setup Instructions

### 1. Clone & Install
Ensure you have Node.js installed. Open two terminal windows/tabs.

**Backend Setup:**
\`\`\`bash
cd backend
npm install
\`\`\`

**Frontend Setup:**
\`\`\`bash
cd frontend
npm install
\`\`\`

### 2. Environment Variables
In the \`backend\` folder, rename \`.env.example\` to \`.env\` and add your OpenAI API Key:
\`\`\`
OPENAI_API_KEY=your_key_here
PORT=5000
\`\`\`

### 3. Run Locally
**Start Backend:**
\`\`\`bash
cd backend
npm start
\`\`\`
*The server will start on http://localhost:5000*

**Start Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`
*The React app will usually start on http://localhost:5173*

## Deployment
- **Backend:** Deploy the `backend` folder to Render or Railway. Set the `OPENAI_API_KEY` in the environment settings.
- **Frontend:** Deploy the `frontend` folder to Vercel or Netlify. Update the `axios.post` URL in `App.jsx` to point to the deployed backend URL.

## Documentation
- Read `prompts.md` for a breakdown of the system prompt design strategy.
- Read `reflection.md` for a reflection on building the project and the GIGO principle.
