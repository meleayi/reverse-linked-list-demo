"use client";
import { useState } from "react";

const questions = [
  {
    question: "What will be the new head of the reversed linked list?",
    correctAnswer: "", // Will be set dynamically
    type: "reversal",
  },
  {
    question:
      "What is the time complexity of reversing a linked list iteratively?",
    correctAnswer: "O(n)",
    type: "complexity",
  },
  {
    question: "What is the space complexity of recursive linked list reversal?",
    correctAnswer: "O(n)",
    type: "complexity",
  },
  {
    question: "In a singly linked list, each node contains:",
    correctAnswer: "Data and a pointer to next node",
    type: "theory",
  },
  {
    question: "What pointer changes are needed to reverse a linked list?",
    correctAnswer: "Reverse the next pointers of all nodes",
    type: "theory",
  },
  {
    question:
      "Which algorithm is more memory efficient for reversal: iterative or recursive?",
    correctAnswer: "Iterative",
    type: "comparison",
  },
  {
    question: "What is the base case in recursive linked list reversal?",
    correctAnswer: "When current node is null or next is null",
    type: "recursion",
  },
  {
    question: "How many pointers are typically used in iterative reversal?",
    correctAnswer: "3 (prev, current, next)",
    type: "implementation",
  },
  {
    question: "Can you reverse a linked list in less than O(n) time?",
    correctAnswer: "No",
    type: "complexity",
  },
  {
    question:
      "What happens if you don't update the head pointer after reversal?",
    correctAnswer: "The list will appear unchanged",
    type: "implementation",
  },
  {
    question: "Is it possible to reverse a linked list using a stack?",
    correctAnswer: "Yes",
    type: "alternative",
  },
];

const HappyEmoji = () => <span className="text-4xl">🎉</span>;
const SadEmoji = () => <span className="text-4xl">😢</span>;

const playSuccessSound = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3"
  );
  audio.play().catch((e) => console.log("Audio play error:", e));
};

const playFailureSound = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3"
  );
  audio.play().catch((e) => console.log("Audio play error:", e));
};

export default function QuestionAnswer({ list, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // Set correct answer for reversal question dynamically
  if (questions[0].type === "reversal") {
    questions[0].correctAnswer = list[list.length - 1]?.toString() || "";
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct =
      userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      playSuccessSound();
      setScore((prev) => prev + 1);
    } else {
      playFailureSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer("");
      setIsAnswered(false);
    } else {
      onComplete?.(score);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setUserAnswer("");
      setIsAnswered(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1}/{questions.length}
          </h3>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Score: {score}/{questions.length}
          </span>
        </div>

        <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>

        {!isAnswered ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border p-2 rounded flex-grow"
              placeholder="Your answer..."
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        ) : (
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <HappyEmoji />
                  <span className="font-medium">Correct! Well done!</span>
                </>
              ) : (
                <>
                  <SadEmoji />
                  <span className="font-medium">
                    The correct answer was: {currentQuestion.correctAnswer}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded ${
              currentQuestionIndex === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </div>
      </div>

      {currentQuestionIndex === questions.length - 1 && isAnswered && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-center gap-2">
            <FiInfo className="text-yellow-400" />
            <p>
              You've completed all questions! Final score: {score}/
              {questions.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
