"use client";
import { useState, useEffect } from "react";

export default function Controls({
  isReversing,
  speed,
  onStart,
  onReset,
  onSpeedChange,
}) {
  const [localSpeed, setLocalSpeed] = useState(speed);

  // Update parent speed state after user stops dragging
  useEffect(() => {
    const timer = setTimeout(() => {
      onSpeedChange(localSpeed);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSpeed]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={onStart}
          disabled={isReversing}
          className={`px-6 py-2 rounded-lg ${
            isReversing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          } text-white font-medium transition-colors`}
        >
          {isReversing ? "Reversing..." : "Start Reversal"}
        </button>

        <button
          onClick={onReset}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            Step Duration
          </span>
          <span className="text-sm font-medium text-gray-700">
            {localSpeed}s
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={localSpeed}
          onChange={(e) => setLocalSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0.5s</span>
          <span>3s</span>
        </div>
      </div>
    </div>
  );
}
