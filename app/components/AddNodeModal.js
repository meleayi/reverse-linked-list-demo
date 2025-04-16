"use client";
import { useState } from "react";

export default function AddNodeModal({ onClose, onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onAdd(Number(value));
    setValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">Add New Node</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Enter node value"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
