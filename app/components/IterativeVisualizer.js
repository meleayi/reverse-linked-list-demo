"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiInfo,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import Controls from "./Controls";

const Node = ({ node, isCurrent, isPrev, isNext, showArrow, isReversed }) => (
  <div className="flex items-center">
    {isReversed && (
      <>
        {showArrow && node.next && (
          <FiArrowLeft className="mx-1 text-red-500 " />
        )}
        <div
          className={`p-2 md:p-3 rounded-lg text-center min-w-12 mx-0 md:mx-1 xl:mx-2 ${
            isCurrent
              ? "bg-blue-500 text-white"
              : isPrev
              ? "bg-green-500 text-white"
              : isNext
              ? "bg-purple-500 text-white"
              : "bg-gray-100"
          }`}
        >
          {node.value}
        </div>
      </>
    )}

    {!isReversed && (
      <>
        <div
          className={`p-2 md:p-3 rounded-lg text-center min-w-12 mx-0 md:mx-1 xl:mx-2  ${
            isCurrent
              ? "bg-blue-500 text-white"
              : isPrev
              ? "bg-green-500 text-white"
              : isNext
              ? "bg-purple-500 text-white"
              : "bg-gray-100"
          }`}
        >
          {node.value}
        </div>
        {showArrow && node.next && (
          <FiArrowRight className="mx-1 text-gray-500 flex-shrink-0" />
        )}
      </>
    )}
  </div>
);

///////////
const createLinkedList = (arr) => {
  if (arr.length === 0) return [];
  const nodes = arr.map((val) => ({ value: val, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  console.log("at create step ... ", nodes);
  return nodes;
};

export default function IterativeVisualizer({ initialList }) {
  const [nodes, setNodes] = useState(() => createLinkedList(initialList));
  const [originalNodes] = useState(() => createLinkedList(initialList));
  const [prevNode, setPrevNode] = useState(null);
  const [currentNode, setCurrentNode] = useState(nodes[0] || null);
  const [nextNode, setNextNode] = useState(nodes[0]?.next || null);
  const [reversedLinks, setReversedLinks] = useState(new Set());
  const [currentOperation, setCurrentOperation] = useState("Ready to begin");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isComplete, setIsComplete] = useState(false); // New state to track completion
  const timerRef = useRef(null);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    const newNodes = createLinkedList(initialList);
    setNodes(newNodes);
    setPrevNode(null);
    setCurrentNode(newNodes[0] || null);
    setNextNode(newNodes[0]?.next || null);
    setIsRunning(false);
    setIsPaused(false);
    setShowSuccess(false);
    setShowHint(true);
    setReversedLinks(new Set());
    setCurrentOperation("Ready to begin");
    setIsComplete(false);
  }, [initialList]);

  const performStep = useCallback(() => {
    if (!currentNode) {
      setIsComplete(true); // Mark as complete before showing success
      setCurrentOperation("Reversal complete!");
      setShowSuccess(true);
      timerRef.current = setTimeout(() => {
        setShowSuccess(false);
        setIsRunning(false);
      }, 3000);
      return true;
    }

    // Store next node before we modify current.next
    const next = currentNode.next;
    setCurrentOperation(`Storing next node (${next?.value || "null"})`);

    // Reverse the link
    currentNode.next = prevNode;
    setReversedLinks((prev) => new Set(prev).add(currentNode));
    setCurrentOperation(
      `Reversed link: ${currentNode.value} → ${prevNode?.value || "null"}`
    );
    setPrevNode(currentNode);
    setCurrentNode(next);
    setNextNode(next?.next || null);

    // Force update
    setNodes([...nodes]);
    console.log("node presssss =----", nodes);
    // Move pointers

    // ListNode* forward = curr->next;  // Store next node
    //     curr->next = prev;  // Reverse the link
    //     prev = curr;  // Move prev forward
    //     curr = forward;  // Move curr forward

    return false;
  }, [currentNode, prevNode, nodes]);

  const togglePause = () => setIsPaused(!isPaused);

  const startProcess = () => {
    if (!isRunning) {
      reset();
      setIsRunning(true);
      setShowHint(false);
      setCurrentOperation("Starting iterative reversal...");
    } else {
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      const shouldStop = performStep();
      if (shouldStop) clearInterval(interval);
    }, 2000 / speed);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, speed, performStep]);

  // Function to display nodes in the correct order with proper arrows
  const displayNodes = () => {
    // When complete, show all nodes with reversed arrows
    if (isComplete) {
      return (
        <div className="flex flex-wrap items-center gap-1  ">
          {nodes.map((node, i) => (
            <Node
              key={`current-${i}`}
              node={node}
              isCurrent={false}
              isPrev={false}
              isNext={false}
              showArrow={i < nodes.length} // No arrow after last node
              isReversed={true} // All arrows reversed in final state
            />
          ))}
        </div>
      );
    }

    // During process, show current state
    return (
      <div className="flex flex-wrap items-center gap-1 ">
        {nodes.map((node, i) => (
          <Node
            key={`current-${i}`}
            node={node}
            isCurrent={node === currentNode}
            isPrev={node === prevNode}
            isNext={node === nextNode}
            showArrow={node.next !== null}
            isReversed={reversedLinks.has(node)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-10"
          >
            <FiCheckCircle className="text-green-500" />
            <span>List reversed successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center">
          <FiInfo className="text-yellow-400 mr-3" />
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Current Operation:</span>{" "}
            {currentOperation}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3"
          >
            <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">How It Works</h3>
              <p className="text-blue-700">
                Watch how the prev, current, and next pointers move through the
                list to reverse the links.
              </p>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="text-blue-500 hover:text-blue-700 ml-auto"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-between mb-12 ">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Original List</h2>
          {/* <div className="flex items-center"> */}
          <div className="flex flex-wrap items-center gap-1">
            {originalNodes.map((node, i) => (
              <Node
                key={`original-${i}`}
                node={node}
                isCurrent={false}
                isPrev={false}
                isNext={false}
                showArrow={true}
                isReversed={false}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-4">Current List</h2>
          <div className="flex items-center gap-2">{displayNodes()}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Iterative Process</h2>
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="font-bold">prev</div>
            <div className="text-2xl">↑</div>
            <div
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                prevNode ? "bg-green-500" : "bg-green-300"
              } text-white`}
            >
              {prevNode ? prevNode.value : "null"}
            </div>
          </div>

          <div className="text-center">
            <div className="font-bold">current</div>
            <div className="text-2xl">↑</div>
            <div
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                currentNode ? "bg-blue-500" : "bg-blue-300"
              } text-white`}
            >
              {currentNode ? currentNode.value : "null"}
            </div>
          </div>

          <div className="text-center">
            <div className="font-bold">next</div>
            <div className="text-2xl">↑</div>
            <div
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                nextNode ? "bg-purple-500" : "bg-purple-300"
              } text-white`}
            >
              {nextNode ? nextNode.value : "null"}
            </div>
          </div>
        </div>
      </div>

      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        speed={speed}
        onStart={startProcess}
        onReset={reset}
        onPause={togglePause}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}
