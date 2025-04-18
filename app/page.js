"use client";
import { useState, useEffect } from "react";
import IterativeVisualizer from "./components/IterativeVisualizer";
import RecursiveVisualizer from "./components/RecursiveVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import DescriptionPanel from "./components/DescriptionPanel";
import AddNodeModal from "./components/AddNodeModal";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import QuestionAnswer from "./components/QuestionAnswer";

export default function Home() {
  const [initialList, setInitialList] = useState([3, 5, 7, 9, 10]);
  const [activeTab, setActiveTab] = useState("demo");
  const [selectedMethod, setSelectedMethod] = useState("visualization");
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(0);
  const [quizResult, setQuizResult] = useState(null);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizComplete = (score) => {
    setQuizCompleted(true);
    setFinalScore(score);
  };

  const handleAddNode = (value) => {
    setInitialList([...initialList, value]);
    setKey((prev) => prev + 1);
  };

  const handleRemoveNode = (index) => {
    const newList = [...initialList];
    newList.splice(index, 1);
    setInitialList(newList);
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [selectedMethod]);

  const handleQuizAnswer = (isCorrect) => {
    setQuizResult(isCorrect);
  };

  return (
    <main
      className={`min-h-screen p-4 bg-gray-50 ${
        showModal ? "brightness-50" : ""
      }`}
    >
      {showModal && (
        <AddNodeModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddNode}
        />
      )}

      <nav className="flex border-b mb-6">
        <div className="flex w-full gap-2 flex-col md:flex-row justify-between">
          <div className="hidden md:block">
            <h2 className="font-serif font-semibold text-sm">
              Melese Ayichlie
            </h2>
          </div>
          <div className="font-semibold text-amber-600 font-serif items-center text-center">
            <h2>DC Platform Content Creator Assessment Submission</h2>
          </div>
          <div className="items-center text-center justify-between">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "demo"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("demo")}
            >
              Interactive Demo
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "description"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
          </div>
        </div>
      </nav>

      {activeTab === "demo" ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap justify-center max-w-[900px] mx-auto">
              <button
                onClick={() => setSelectedMethod("visualization")}
                className={`px-4 py-2 rounded-lg ${
                  selectedMethod === "visualization"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Drag & Drop Method
              </button>
              <button
                onClick={() => setSelectedMethod("iterative")}
                className={`px-4 py-2 rounded-lg ${
                  selectedMethod === "iterative"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Iterative Method
              </button>
              <button
                onClick={() => setSelectedMethod("recursive")}
                className={`px-4 py-2 rounded-lg ${
                  selectedMethod === "recursive"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Recursive Method
              </button>

              <button
                onClick={() => setSelectedMethod("questionanswering")}
                className={`px-4 py-2 rounded-lg ${
                  selectedMethod === "questionanswering"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                Question Answering
              </button>
            </div>
          </div>

          {/* Current List Display */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 max-w-[900px] mx-auto items-center flex justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <h3 className="font-medium mb-2">Current List:</h3>
              <br />
              {initialList.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => handleRemoveNode(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg flex items-center gap-1"
              >
                <FiPlus /> Add Node
              </button>
            </div>
          </div>

          {/* Visualizers with key to force re-render */}
          {/* <div key={key}>
            {selectedMethod === "iterative" && (
              <IterativeVisualizer initialList={initialList} />
            )}
            {selectedMethod === "recursive" && (
              <RecursiveVisualizer list={initialList} />
            )}
            {selectedMethod === "visualization" && (
              <LinkedListVisualizer
                initialList={initialList}
                list={initialList}
                setList={setInitialList}
              />
            )}
            {selectedMethod === "questionanswering" && (
              <div className="space-y-6">
                <QuestionAnswer
                  question="What will be the new head of the reversed linked list?"
                  correctAnswer={initialList[
                    initialList.length - 1
                  ]?.toString()}
                  onAnswer={handleQuizAnswer}
                />
                {quizResult !== null && (
                  <div
                    className={`p-4 mb-6 rounded-lg ${
                      quizResult ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {quizResult ? (
                        <>
                          <span className="text-4xl">🎉</span>
                          <span>
                            Great job! You understand linked list reversal!
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl">😢</span>
                          <span>Don't worry! Keep practicing!</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div> */}

          <div key={key}>
            {selectedMethod === "iterative" && (
              <IterativeVisualizer initialList={initialList} />
            )}
            {selectedMethod === "recursive" && (
              <RecursiveVisualizer list={initialList} />
            )}
            {selectedMethod === "visualization" && (
              <LinkedListVisualizer
                initialList={initialList}
                list={initialList}
                setList={setInitialList}
              />
            )}
            {selectedMethod === "questionanswering" && (
              <div className="space-y-6">
                {quizCompleted ? (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-2xl font-bold mb-4">Quiz Completed!</h3>
                    <p className="text-xl mb-4">
                      Your final score: {finalScore}/{questions.length}
                    </p>
                    <button
                      onClick={() => {
                        setQuizCompleted(false);
                        setFinalScore(0);
                        setKey((prev) => prev + 1);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Retake Quiz
                    </button>
                  </div>
                ) : (
                  <QuestionAnswer
                    list={initialList}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <DescriptionPanel />
      )}
    </main>
  );
}
