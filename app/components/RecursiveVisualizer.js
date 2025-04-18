"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiInfo,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import Controls from "./Controls";

const Node = ({ node, isCurrent, isHead, isReversed }) => (
  <div className="flex items-center">
    <div
      className={`p-2 md:p-3 rounded-lg text-center min-w-12 mx-0 md:mx-1 xl:mx-2 ${
        isCurrent
          ? "bg-blue-500 text-white"
          : isHead
          ? "bg-green-500 text-white"
          : "bg-gray-100"
      }`}
    >
      {node.value}
    </div>
    {node.next &&
      (isReversed ? (
        <FiArrowLeft className="mx-1 text-red-500" />
      ) : (
        <FiArrowRight className="mx-1 text-gray-500" />
      ))}
  </div>
);

const createLinkedList = (arr) => {
  if (arr.length === 0) return [];
  const nodes = arr.map((val) => ({ value: val, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  return nodes;
};

export default function RecursiveVisualizer({ list }) {
  const [nodes, setNodes] = useState(() => createLinkedList(list));
  const [originalNodes] = useState(() => createLinkedList(list));
  const [currentNode, setCurrentNode] = useState(nodes[0] || null);
  const [callStack, setCallStack] = useState([]);
  const [reversedNodes, setReversedNodes] = useState(new Set());
  const [currentOperation, setCurrentOperation] = useState("Ready to begin");
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [newHead, setNewHead] = useState(null);
  const [phase, setPhase] = useState("forward"); // 'forward' or 'backward'
  const timerRef = useRef(null);

  const reset = () => {
    clearTimeout(timerRef.current);
    const newNodes = createLinkedList(list);
    setNodes(newNodes);
    setCurrentNode(newNodes[0] || null);
    setCallStack([]);
    setReversedNodes(new Set());
    setIsRunning(false);
    setIsPaused(false);
    setShowSuccess(false);
    setShowHint(true);
    setCurrentOperation("Ready to begin");
    setIsComplete(false);
    setNewHead(null);
    setPhase("forward");
  };

  const performStep = () => {
    if (!isRunning || isPaused) return;

    if (phase === "forward") {
      // Forward phase - push nodes onto stack until we reach the end
      if (currentNode === null || currentNode.next === null) {
        // Reached end of list, switch to backward phase
        setPhase("backward");
        setNewHead(currentNode);
        setCurrentOperation(
          currentNode
            ? `Reached end (node ${currentNode.value}), starting to reverse links`
            : "Reached end (empty list)"
        );
        return false;
      }

      // Push current node to call stack
      setCallStack([...callStack, currentNode]);
      setCurrentOperation(`Pushing node ${currentNode.value} to stack`);
      setCurrentNode(currentNode.next);
      return false;
    } else {
      // Backward phase - pop nodes and reverse links
      if (callStack.length === 0) {
        // All nodes processed
        setIsComplete(true);
        setCurrentOperation("Recursion complete!");
        setShowSuccess(true);
        timerRef.current = setTimeout(() => {
          setShowSuccess(false);
          setIsRunning(false);
        }, 3000);
        return true;
      }

      // Pop from call stack and reverse the link
      const node = callStack[callStack.length - 1];
      setCallStack(callStack.slice(0, -1));

      // Reverse the link visually
      setReversedNodes(new Set([...reversedNodes, node]));
      setCurrentOperation(
        `Reversed link: ${node.value} ← ${node.next?.value || "null"}`
      );

      setCurrentNode(node);
      return false;
    }
  };

  const togglePause = () => setIsPaused(!isPaused);

  const startProcess = () => {
    if (!isRunning) {
      reset();
      setIsRunning(true);
      setShowHint(false);
      setCurrentOperation("Starting recursive reversal...");
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

  const displayNodes = () => {
    // Show all nodes with arrows changing direction as they're reversed
    let current = nodes[0];
    const displayedNodes = [];

    while (current) {
      displayedNodes.push(
        <Node
          key={`node-${current.value}`}
          node={current}
          isCurrent={current === currentNode}
          isHead={current === newHead}
          isReversed={reversedNodes.has(current)}
        />
      );
      current = current.next;
    }

    return displayedNodes.length > 0 ? (
      <div className="flex flex-wrap items-center gap-1">{displayedNodes}</div>
    ) : (
      <div className="text-gray-500">(empty list)</div>
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
              <h3 className="font-medium text-blue-800 mb-1">
                How Recursive Reversal Works
              </h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Push all nodes except last onto stack</li>
                <li>Reach end of list (last node)</li>
                <li>Pop nodes one by one and reverse links</li>
                <li>Last node becomes new head</li>
              </ol>
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

      <div className="flex flex-wrap justify-between mb-12">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Original List</h2>
          <div className="flex flex-wrap items-center gap-1">
            {originalNodes.map((node) => (
              <Node
                key={`original-${node.value}`}
                node={node}
                isCurrent={false}
                isHead={false}
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
        <h2 className="text-xl font-semibold mb-4">Recursive Process</h2>

        <div className="mb-6">
          <h3 className="font-medium mb-2">
            Call Stack ({callStack.length} nodes)
          </h3>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            {callStack.length === 0 ? (
              <p className="text-gray-500">(empty)</p>
            ) : (
              <div className="space-y-2">
                {callStack.map((node, i) => (
                  <div
                    key={`call-${i}`}
                    className="bg-white p-2 rounded border"
                  >
                    <div className="font-mono">
                      Node {node.value} waiting to be processed
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="font-bold">Current Node</div>
          <div className="text-2xl">↑</div>
          <div
            className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
              currentNode ? "bg-blue-500" : "bg-blue-300"
            } text-white`}
          >
            {currentNode ? currentNode.value : "null"}
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
