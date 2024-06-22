// components/Chat.js
""
import { useState } from 'react';

const questions = [
  "What is your name?",
  "How old are you?",
  "What is your favorite color?",
];

const Chat = () => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleResponseChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("All responses:", responses);
      // Here you can add code to save the responses to a backend or local storage
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      {currentQuestionIndex < questions.length ? (
        <form onSubmit={handleSubmit}>
          <p>{questions[currentQuestionIndex]}</p>
          <input
            type="text"
            name={`question${currentQuestionIndex}`}
            value={responses[`question${currentQuestionIndex}`] || ""}
            onChange={handleResponseChange}
          />
          <button type="submit">Next</button>
        </form>
      ) : (
        <p>Thank you for your responses!</p>
      )}
    </div>
  );
};

export default Chat;
