"use client";
import { useState } from "react";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import DescriptionPanel from "./components/DescriptionPanel";

export default function Home() {
  const initialList = [3, 5, 7, 9, 10];
  const [list, setList] = useState(initialList);
  const [activeTab, setActiveTab] = useState("demo"); // 'demo' or 'description'

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <nav className="flex border-b mb-6">
        <div className="flex w-full justify-between">
          <div>
            <h2 className="font-serif font-semibold text-sm ">
              Melese Ayichlie
            </h2>
          </div>{" "}
          <div className="font-semibold text-amber-600 font-serif">
            <h2>DC Platform Content Creator Assessment Submission</h2>
          </div>
          <div>
            {" "}
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
        <LinkedListVisualizer
          initialList={initialList}
          list={list}
          setList={setList}
        />
      ) : (
        <DescriptionPanel />
      )}
    </main>
  );
}
