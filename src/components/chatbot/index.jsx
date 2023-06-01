import React, { useState } from "react";
import axios from "axios";
const openAIKey = process.env.REACT_APP_OPEN_AI_KEY;
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    // Add user message to the conversation history
    setMessages([...messages, { content: userInput, role: "user" }]);
    setUserInput("");

    try {
      // Send user message to the ChatGPT API

      console.log(messages[messages.length - 1].content, "messages content");
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
          }),
        }
      );

      // Get chatbot's response from the API
      console.log(response, "responce");
      const responseData = await response.json();
      console.log(responseData, "responce data");
      const chatbotResponse = responseData.choices[0].message.content;
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Adjust the delay time as needed
      // Add chatbot response to the conversation history
      setMessages([...messages, { content: chatbotResponse, role: "chatbot" }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      // Handle error scenario, e.g., display an error message
    }
  };

  return (
    <div>
      <div className="conversation-display">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
