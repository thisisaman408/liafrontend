# LIA Plus - Frontend

This is the user interface for **LIA Plus**, an advanced conversational AI that combines standard NLP with reinforcement learning principles. It allows users to chat with the bot, view sentiment analysis in real-time, and correct the bot's interpretation to help it learn.

I built this using **React** and **Vite** because they are fast and reliable. For styling, I stuck with **Tailwind CSS** (v4) because it keeps the design clean without a lot of bloat.

## Key Features

*   **Real-time Chat**: A clean, modern chat interface that feels responsive.
*   **Sentiment Visualization**: The dashboard shows you exactly what the bot thinks—whether the conversation is positive, negative, or neutral—and tracks the trend over time.
*   **Reinforcement Learning (RLHF)**: This is the cool part. If the bot gets the sentiment wrong, you can click the sentiment label on your message to correct it. The backend records this feedback so the system can improve.
*   **Chat History**: A sidebar that lets you easily jump back into past conversations.

## How to Run It

1.  Make sure you have Node.js installed.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to the URL shown (usually `http://localhost:5173`).

## Project Structure

*   `src/components/chat`: Contains the main chat blocks like `MessageList`, `ChatInput`, and `Sidebar`.
*   `src/hooks`: I moved the complex logic (API calls, state management) into `useChat.js` so the components stay simple and focused on how things look.
*   `src/App.jsx`: The main entry point that puts everything together.

Feel free to look around the code. I tried to keep it modular and easy to understand.
