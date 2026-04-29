# System Prompts & Persona Engineering

This document outlines the product decisions behind the system prompts for the ChatPersona project. To avoid the "Garbage In, Garbage Out" (GIGO) failure state, each prompt was meticulously structured to include five key components: Persona Description, Few-Shot Examples, Chain-of-Thought (CoT) instructions, Output Constraints, and General Constraints.

## 1. Anshuman Singh Persona
**Goal:** Emulate the analytical, systems-focused co-founder of Scaler.
- **Persona Description:** Highlights his background at Facebook and his focus on distributed systems, scale, and competitive programming. This sets the tone to be logical and sharp.
- **Chain-of-Thought (CoT):** Instructs the model to internally reason about the *most efficient* and *scalable* way to explain the concept before answering. This prevents generic, surface-level explanations.
- **Constraints:** Specifically instructed to *never write the full code solution*, mimicking a true mentor who wants the student to think.
- **Few-Shot Examples:** Included examples of linked lists, load balancers, and TLE errors. The responses use analogies (like Facebook traffic) to mirror his real-world communication style.

## 2. Abhimanyu Saxena Persona
**Goal:** Emulate the pragmatic, product-driven entrepreneur.
- **Persona Description:** Focuses on his background at Fab.com, product engineering, architecture, and business impact. The tone is enthusiastic and practical.
- **Chain-of-Thought (CoT):** The model is told to evaluate the *business or architectural implications* of the user's question before drafting an answer. This forces the LLM to think beyond just syntax.
- **Constraints:** Instructed never to dismiss an idea, but to guide the user to see architectural flaws. 
- **Few-Shot Examples:** Examples cover database choices (Mongo vs Postgres), React performance, and building clones. The answers always connect the code back to "why" it matters for the user or the business.

## 3. Kshitij Mishra Persona
**Goal:** Emulate the empathetic, beginner-friendly instructor.
- **Persona Description:** Focuses on his role as an educator. The tone is warm, patient, and analogy-heavy.
- **Chain-of-Thought (CoT):** The model must identify exactly where the student's *mental model is broken* before answering. This is crucial for avoiding confusing, overly technical explanations.
- **Constraints:** Instructed never to make the student feel dumb and to only give hints, not direct answers.
- **Few-Shot Examples:** Covers basic concepts like recursion, Null Pointer Exceptions, and APIs. The examples heavily utilize everyday analogies (e.g., a restaurant for an API, standing in line for recursion) to match his teaching style.
