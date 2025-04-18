"use client";
import { useState, useCallback } from "react";
import {
  FiCheckCircle,
  FiInfo,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

export default function VisualizationMethod({ initialList }) {
  const [nodes, setNodes] = useState(() => createLinkedList(initialList));
  const [originalNodes] = useState(() => createLinkedList(initialList));
  const [showSuccess, setShowSuccess] = useState(false);

  const visualize = useCallback(() => {
    const reversed = [...originalNodes].reverse();
    reversed.forEach((node, i) => {
      node.next = i < reversed.length - 1 ? reversed[i + 1] : null;
    });
    setNodes(reversed);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [originalNodes]);

  const reset = useCallback(() => {
    setNodes(createLinkedList(initialList));
    setShowSuccess(false);
  }, [initialList]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Simplified UI showing original and reversed lists */}
      <button
        onClick={visualize}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Reversed
      </button>
      <button onClick={reset} className="bg-gray-200 px-4 py-2 rounded ml-2">
        Reset
      </button>
    </div>
  );
}
