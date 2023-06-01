import React, { useState } from "react";
import { Button } from "flowbite-react";
function QuetionApp() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctOption, setCorrectOption] = useState(null);

  const questions = [
    {
      text: "Which of the following is a proper noun?",
      options: [
        { text: "house", isCorrect: false },
        { text: "dog", isCorrect: false },
        { text: "London", isCorrect: true },
        { text: "tree", isCorrect: false },
      ],
    },
    {
      text: "Choose the correct form of the verb: She _______ to the store.",
      options: [
        { text: "goes", isCorrect: true },
        { text: "go", isCorrect: false },
        { text: "going", isCorrect: false },
        { text: "gone", isCorrect: false },
      ],
    },
    {
      text: 'What is the comparative form of the adjective "good"?',
      options: [
        { text: "best", isCorrect: false },
        { text: "gooder", isCorrect: false },
        { text: "better", isCorrect: true },
        { text: "well", isCorrect: false },
      ],
    },
    {
      text: "Identify the correct sentence:",
      options: [
        { text: "I is going to the park.", isCorrect: false },
        { text: "They am playing soccer.", isCorrect: false },
        { text: "He have a blue car.", isCorrect: false },
        { text: "She is reading a book.", isCorrect: true },
      ],
    },
    {
      text: "Choose the correct spelling:",
      options: [
        { text: "reccommend", isCorrect: false },
        { text: "recommend", isCorrect: true },
        { text: "recemmend", isCorrect: false },
        { text: "recomend", isCorrect: false },
      ],
    },
    {
      text: 'What is the plural form of the noun "child"?',
      options: [
        { text: "childs", isCorrect: false },
        { text: "childrens", isCorrect: false },
        { text: "childes", isCorrect: false },
        { text: "children", isCorrect: true },
      ],
    },
    {
      text: "Choose the correct possessive pronoun: That book is _______.",
      options: [
        { text: "her", isCorrect: false },
        { text: "hers", isCorrect: true },
        { text: "she", isCorrect: false },
        { text: "herself", isCorrect: false },
      ],
    },
    {
      text: "Identify the verb in the following sentence: The cat is sleeping.",
      options: [
        { text: "the", isCorrect: false },
        { text: "is", isCorrect: true },
        { text: "cat", isCorrect: false },
        { text: "sleeping", isCorrect: false },
      ],
    },
    {
      text: "Choose the correct form of the verb: They _______ a party yesterday.",
      options: [
        { text: "has", isCorrect: false },
        { text: "have", isCorrect: true },
        { text: "had", isCorrect: false },
        { text: "having", isCorrect: false },
      ],
    },
    {
      text: 'What is the comparative form of the adverb "quickly"?',
      options: [
        { text: "quicklier", isCorrect: false },
        { text: "quicklyer", isCorrect: false },
        { text: "quicker", isCorrect: true },
        { text: "quick", isCorrect: false },
      ],
    },
  ];
  const speak = (text) => {
    const processedText = text.replace(/_+/g, "blank space");
    const utterance = new SpeechSynthesisUtterance(processedText);
    const voices = speechSynthesis.getVoices();
    const desiredVoice = voices.find((voice) => voice.name === "Alex");
    utterance.voice = desiredVoice;
    speechSynthesis.speak(utterance);
  };
  const generateRandomQuestion = () => {
    const randomIndex = 1;
    console.log(randomIndex, "random");
    const question = questions[randomIndex];
    setCurrentQuestion(question);
    setSelectedOption(null);
    setIsCorrect(false);
    setCorrectOption(null);
    speak(question.text);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === currentQuestion.options.find((opt) => opt.isCorrect)) {
      setIsCorrect(true);
      const correctOption = currentQuestion.options.find(
        (opt) => opt.isCorrect
      );
      speak(`well done your answer ${correctOption.text} is correct`);
    } else {
      setIsCorrect(false);
      const correctOption = currentQuestion.options.find(
        (opt) => opt.isCorrect
      );
      setCorrectOption(correctOption);
      speak(
        `opps correnct option is ${correctOption.text}. "Don't worry, mistakes are stepping stones to improvement. Keep practicing!"`
      );
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl m-10">English Question App</h1>
        {currentQuestion ? (
          <>
            <h2 className="text-2xl m-2">Question:</h2>
            <p className="text-xl m-2">{currentQuestion.text}</p>
            <div className="grid justify-center">
              {currentQuestion.options.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleOptionSelect(option)}
                    checked={selectedOption === option}
                    disabled={selectedOption !== null}
                    className="mr-1"
                  />
                  <span>{option.text}</span>
                </label>
              ))}

              {selectedOption && (
                <p>
                  {isCorrect
                    ? "Correct!"
                    : `Wrong. The correct option is: ${correctOption.text}`}
                </p>
              )}
              <Button
                disabled={selectedOption == null ? true : false}
                className="m-2"
                onClick={generateRandomQuestion}
              >
                Next Question
              </Button>
            </div>
          </>
        ) : questions.length < 1 ? (
          <p>No question available.</p>
        ) : (
          <div className="flex justify-center">
            <Button className="" onClick={generateRandomQuestion}>
              play
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default QuetionApp;
