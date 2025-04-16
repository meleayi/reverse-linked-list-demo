"use client";
import { useState, useEffect, useCallback } from "react";
import Node from "./Node";
import Controls from "./Controls";

export default function LinkedList({ nodes, setNodes }) {
  const [pointers, setPointers] = useState({
    prev: null,
    curr: nodes[0]?.id || null,
    next: nodes[0]?.next || null,
  });
  const [isReversing, setIsReversing] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [originalNodes] = useState([...nodes]);

  const moveNode = useCallback(
    (draggedId, targetId) => {
      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];
        const draggedIndex = newNodes.findIndex((n) => n.id === draggedId);
        const targetIndex = newNodes.findIndex((n) => n.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return prevNodes;

        // Swap nodes
        [newNodes[draggedIndex], newNodes[targetIndex]] = [
          newNodes[targetIndex],
          newNodes[draggedIndex],
        ];

        // Update next pointers
        newNodes.forEach((node, i) => {
          node.next = i < newNodes.length - 1 ? newNodes[i + 1].id : null;
        });

        return newNodes;
      });
    },
    [setNodes]
  );

  const nextStep = useCallback(() => {
    if (!isReversing) return;

    const { prev, curr } = pointers;
    const currentNode = nodes.find((node) => node.id === curr);

    if (!currentNode) {
      setIsReversing(false);
      return;
    }

    const newPointers = {
      prev: curr,
      curr: currentNode.next,
      next: currentNode.next
        ? nodes.find((n) => n.id === currentNode.next)?.next
        : null,
    };

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === currentNode.id ? { ...node, next: prev } : node
      )
    );
    setPointers(newPointers);
  }, [isReversing, nodes, pointers, setNodes]);

  const startReversal = useCallback(() => {
    setIsReversing(true);
  }, []);

  const reset = useCallback(() => {
    setNodes([...originalNodes]);
    setPointers({
      prev: null,
      curr: originalNodes[0]?.id || null,
      next: originalNodes[0]?.next || null,
    });
    setIsReversing(false);
  }, [originalNodes, setNodes]);

  useEffect(() => {
    if (!isReversing) return;

    const timer = setTimeout(() => {
      nextStep();
    }, 1500 / speed);

    return () => clearTimeout(timer);
  }, [isReversing, nextStep, speed]);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 mb-6">
        {nodes.map((node) => (
          <Node
            key={node.id}
            node={node}
            isCurrent={pointers.curr === node.id}
            isPrev={pointers.prev === node.id}
            isNext={pointers.next === node.id}
            moveNode={moveNode}
          />
        ))}
      </div>

      <Controls
        isReversing={isReversing}
        speed={speed}
        onStart={startReversal}
        onReset={reset}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}
