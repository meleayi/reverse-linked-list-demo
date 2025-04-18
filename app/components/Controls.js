"use client";
import { FiPause, FiPlay, FiStepForward } from "react-icons/fi";

export default function Controls({
  isRunning,
  isPaused,
  speed,
  onStart,
  onReset,
  onPause,
  onSpeedChange,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center gap-4 flex-col md:flex-row">
        <div className="flex gap-4">
          <button
            onClick={onStart}
            className={`px-4 py-2 rounded-lg ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Reset
          </button>
          {isRunning && (
            <button
              onClick={onPause}
              className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
            >
              {isPaused ? <FiPlay /> : <FiPause />}
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Speed:</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={0.5}>Slow</option>
            <option value={1}>Normal</option>
            <option value={1.5}>Fast</option>
            <option value={2}>Very Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
