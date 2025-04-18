"use client";
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const DescriptionPanel = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto font-serif">
      <div className="card items-center text-center shadow-xl  rounded-lg">
        <h1 className="text-2xl font-bold mb-2 font-serif text-blue-600 bg-amber-50 py-3 rounded-lg">
          Linked List Reversal Visualization
        </h1>

        <div className="mb-2 flex flex-col justify-center gap-2 items-center">
          <a
            href="https://github.com/meleayi/reverse-linked-list-demo"
            target="_blank"
            className="flex items-center p-2 text-blue-500 hover:underline"
          >
            Source Code <FiGithub className="ml-1" />
          </a>
        </div>
      </div>

      <div className="space-y-8 mt-6">
        {/* Introduction */}
        <section>
          {/* 
          lb
          backb
          back
          value */}

          <div className="bg-green-50 p-5 rounded-lg">
            <h2 className="text-xl font-semibold mt-6 mb-2">
              1. Selected LeetCode Problem
            </h2>
            <p>
              <strong>Title:</strong> Reverse Linked List
            </p>
            <p>
              <strong>Link:</strong>{" "}
              <a
                href="https://leetcode.com/problems/reverse-linked-list/description/"
                className="text-blue-500 pointer"
                target="_blank"
              >
                LeetCode - Reverse Linked List
              </a>
            </p>
            <p>
              <strong>Difficulty:</strong> Easy
            </p>
            <p className="mt-2">
              <strong>Problem Description:</strong>
            </p>
            <p>
              Given the head of a singly linked list, reverse the list, and
              return the reversed list’s head. Each node contains an integer
              value and a pointer to the next node.
            </p>

            <p className="mt-2">
              <strong>Examples:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Example 1:</strong> Input:{" "}
                <code>head = [1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5]</code> Output:{" "}
                <code>[5 -&gt; 4 -&gt; 3 -&gt; 2 -&gt; 1]</code>
              </li>
              <li>
                <strong>Example 2:</strong> Input:{" "}
                <code>head = [1 -&gt; 2]</code> Output: <code>[2 -&gt; 1]</code>
              </li>
              <li>
                <strong>Example 3:</strong> Input: <code>head = []</code>{" "}
                Output: <code>[]</code>
              </li>
            </ul>
            <p className="mt-2">
              <strong>Follow-up:</strong> A linked list can be reversed either
              iteratively or recursively. Implement both solutions.
            </p>
            <br />
            <hr className="border-gray-300" />
          </div>

          {/* 
hhjds

differences

df */}
          <h2 className="text-xl font-semibold mt-6 mb-3">2. Solutions</h2>

          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p className="mb-4">
            This interactive visualization demonstrates three approaches to
            reversing a singly linked list:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Iterative Method:</strong> Uses pointers to reverse links
              in-place
            </li>
            <li>
              <strong>Recursive Method:</strong> Reverses the list through
              recursive calls
            </li>
            <li>
              <strong>Drag-and-Drop Practice:</strong> Manual rearrangement to
              build intuition
            </li>
          </ul>
        </section>

        {/* Iterative Method */}
        <section className="bg-blue-50 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">
            1. Iterative Reversal
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">How It Works</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Uses three pointers: <code>prev</code>, <code>current</code>,
                  and <code>next</code>
                </li>
                <li>Traverses the list once from head to tail</li>
                <li>Reverses links between nodes one at a time</li>
                <li>Operates in O(n) time with O(1) space complexity</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Visualization Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Step-by-step pointer movement animation</li>
                <li>Color-coded pointers for easy tracking</li>
                <li>Adjustable speed control</li>
                <li>Original vs. reversed list comparison</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-2">Algorithm Steps:</h4>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
              {`1. Initialize prev = null, current = head
2. While current is not null:
   a. Store next node (next = current.next)
   b. Reverse link (current.next = prev)
   c. Move pointers forward (prev = current, current = next)
3. Return prev (new head)`}
            </pre>
          </div>

          <div className="mt-4 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-2">Iterative using C++:</h4>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              <code>
                {`class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = NULL;  // Initialize previous pointer as NULL
        ListNode* curr = head;  // Start at the head

        while(curr != NULL){
            ListNode* forward = curr->next;  // Store next node
            curr->next = prev;  // Reverse the link
            prev = curr;  // Move prev forward
            curr = forward;  // Move curr forward
        }
        return prev;  // New head after reversal
    }
};`}
              </code>
            </pre>
          </div>
        </section>

        {/* Recursive Method */}
        <section className="bg-green-50 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-green-800">
            2. Recursive Reversal
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">How It Works</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Recursively processes each node until reaching the end</li>
                <li>On the way back up the call stack, reverses links</li>
                <li>Base case: empty list or single node</li>
                <li>Operates in O(n) time with O(n) space (call stack)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Visualization Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Call stack visualization showing recursion depth</li>
                <li>Highlighted current node being processed</li>
                <li>Animated link reversal during unwinding</li>
                <li>Base case detection visualization</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-2">Algorithm Steps:</h4>
            <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
              {`1. Base case: If head is null or single node, return head
2. Recursively reverse the rest of the list
3. Make head's next node point back to head
4. Set head's next to null
5. Return the new head from recursion`}
            </pre>
          </div>

          <div className="mt-4 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-2">Recursive using C++:</h4>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              <code>
                {`class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if(head == NULL || head->next == NULL) return head;  // Base case: empty list or single node
        ListNode* prev = NULL;
        ListNode* h2 = reverseList(head->next);  // Recursively reverse the rest of the list
        head->next->next = head;  // Reverse the link for the current node
        head->next = prev;  // Set next to prev (NULL for last node)
        return h2;  // Return the new head
    }
};`}
              </code>
            </pre>
          </div>
        </section>

        {/* Drag-and-Drop Practice */}
        <section className="bg-purple-50 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-purple-800">
            3. Drag-and-Drop Practice
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Learning Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Hands-on experience with node manipulation</li>
                <li>Builds intuition for pointer relationships</li>
                <li>Visual feedback reinforces understanding</li>
                <li>Prepares for more complex linked list operations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Interactive Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Drag any node to any position</li>
                <li>Visual cues during dragging operations</li>
                <li>Compare with original list</li>
                <li>Combine with automatic reversal</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 bg-white p-4 rounded-md">
            <h4 className="font-medium mb-2">Practice Exercises:</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Manually recreate the reversed list</li>
              <li>Swap just two nodes and observe pointer changes</li>
              <li>Create custom patterns and reverse them</li>
              <li>Time yourself reversing increasingly longer lists</li>
            </ol>
          </div>
        </section>

        {/* Comparative Analysis */}
        <section className="bg-amber-50 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-amber-800">
            Comparative Analysis
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-4 py-2 text-left">Method</th>
                  <th className="px-4 py-2 text-left">Time Complexity</th>
                  <th className="px-4 py-2 text-left">Space Complexity</th>
                  <th className="px-4 py-2 text-left">Best Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-amber-200">
                  <td className="px-4 py-2">Iterative</td>
                  <td className="px-4 py-2">O(n)</td>
                  <td className="px-4 py-2">O(1)</td>
                  <td className="px-4 py-2">
                    General use, memory-constrained environments
                  </td>
                </tr>
                <tr className="border-b border-amber-200">
                  <td className="px-4 py-2">Recursive</td>
                  <td className="px-4 py-2">O(n)</td>
                  <td className="px-4 py-2">O(n)</td>
                  <td className="px-4 py-2">
                    Educational purposes, small lists
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Manual (Drag-and-Drop)</td>
                  <td className="px-4 py-2">O(n²)</td>
                  <td className="px-4 py-2">O(1)</td>
                  <td className="px-4 py-2">
                    Learning fundamentals, building intuition
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Educational Value */}
        <section>
          <h2 className="text-xl font-semibold mb-3">Educational Value</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Key Concepts Reinforced</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pointer manipulation and reference handling</li>
                <li>Iterative vs. recursive thinking</li>
                <li>Time-space complexity tradeoffs</li>
                <li>List traversal techniques</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Learning Progression</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Start with drag-and-drop to build intuition</li>
                <li>Observe the iterative method's step-by-step process</li>
                <li>Analyze the recursive method's call stack</li>
                <li>Compare performance characteristics</li>
              </ol>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="bg-gray-50 p-5 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            How to Use This Visualization
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">1. Modify the List</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Add nodes with different values</li>
                <li>Remove nodes to see edge cases</li>
                <li>Create custom list configurations</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">2. Select Method</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Switch between visualization modes</li>
                <li>Compare how each method works</li>
                <li>Observe differences in approach</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">3. Interact & Learn</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Step through at your own pace</li>
                <li>Adjust animation speed</li>
                <li>Use hints when needed</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="mt-8 bg-gray-100 p-4 rounded-lg shadow-sm text-center">
        <p className="text-sm text-gray-600">
          Created by Melese Ayichlie for DC Platform Content Creator Assessment
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://github.com/meleayi/reverse-linked-list-demo"
            target="_blank"
            className="flex items-center text-blue-500 hover:underline text-sm"
          >
            GitHub <FiGithub className="ml-1" />
          </a>
          <a
            href="https://meleseayichlie.netlify.app/"
            target="_blank"
            className="flex items-center text-blue-500 hover:underline text-sm"
          >
            Portfolio <FiExternalLink className="ml-1" />
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Contact:{" "}
          <a
            href="mailto:meleayi2021@gmail.com"
            className="text-blue-500 hover:underline"
          >
            meleayi2021@gmail.com
          </a>{" "}
          | +(251) 930-707-411
        </p>
        <p className="text-sm text-gray-600 mt-1">
          &copy; 2025 Melese Ayichlie. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DescriptionPanel;
