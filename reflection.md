# Reflection

## What Worked
Building a persona-based chatbot requires more than just passing a user's message to an LLM. The architecture of separating the frontend (React) from the backend (Node.js) worked incredibly well for security. By keeping the OpenAI API key securely on the server and passing requests through a custom Express endpoint, we ensure that malicious actors cannot scrape the key from the frontend bundle. 

On the UI side, implementing a clear persona switcher that actively resets the conversation state was crucial. It prevents the context window from getting polluted with mixed persona traits, ensuring the LLM stays strictly in character.

## The GIGO Principle in Action
The GIGO (Garbage In, Garbage Out) principle was the most significant lesson of this assignment. Initially, giving an LLM a prompt like "You are Anshuman Singh, act like him" produces a generic, unhelpful assistant that sounds like every other bot. 

By applying advanced prompt engineering techniques—specifically injecting **Few-Shot Examples** and **Chain-of-Thought (CoT)** instructions—the output quality increased exponentially. The CoT instruction forced the LLM to process *why* a student was asking a question before generating the answer. Adding strict negative constraints (e.g., "NEVER write the full code solution") transformed the bot from a code-generator into an actual mentor. If you put lazy, generic instructions into the system prompt (Garbage In), you get lazy, generic AI (Garbage Out). Effort spent structuring the prompt pays off directly in the output.

## What I Would Improve
If given more time, I would improve the application in the following ways:
1. **Streaming Responses:** Currently, the user has to wait for the entire LLM response to generate before seeing it (indicated by the bouncing dots). Implementing Server-Sent Events (SSE) on the backend to stream the response chunk-by-chunk would make the UX feel much faster and more engaging.
2. **Markdown Support:** The current UI renders the bot's response as plain text. Adding a library like `react-markdown` to properly format code blocks, bold text, and lists would make the explanations much easier to read.
3. **Database Integration:** Adding a database (like PostgreSQL or MongoDB) to save chat histories so a user could log in and resume a past mentoring session.
