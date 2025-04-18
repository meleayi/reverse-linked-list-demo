"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Controls from "./Controls";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const DraggableNode = ({ value, index, moveNode, isActive }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "NODE",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "NODE",
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveNode(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isDragging ? 0.6 : 1,
        y: 0,
        scale: isOver ? 1.05 : 1,
        boxShadow: isActive ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
      }}
      className={`p-3 rounded-lg text-center min-w-12 cursor-move ${
        isDragging ? "bg-purple-300" : "bg-green-100"
      }`}
    >
      {value}
    </motion.div>
  );
};

const LinkedListVisualizer = ({ initialList, list, setList }) => {
  const [originalList] = useState(() => [...initialList]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(initialList.length - 1);
  const [isReversing, setIsReversing] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [temp, setTemp] = useState(null);
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const timerRef = useRef(null);

  const moveNode = useCallback((dragIndex, hoverIndex) => {
    setList((prevList) => {
      const newList = [...prevList];
      const [removed] = newList.splice(dragIndex, 1);
      newList.splice(hoverIndex, 0, removed);
      return newList;
    });
  }, []);

  const reverseStep = useCallback(() => {
    if (start >= end) {
      setIsReversing(false);
      setShowSuccess(true);
      timerRef.current = setTimeout(() => setShowSuccess(false), 3000);
      return;
    }

    switch (step) {
      case 0: // Store first element in temp
        setTemp(list[start]);
        setStep(1);
        break;
      case 1: // Swap first and last
        const newList = [...list];
        newList[start] = newList[end];
        newList[end] = temp;
        setList(newList);
        setStep(2);
        break;
      case 2: // Move pointers
        setStart(start + 1);
        setEnd(end - 1);
        setStep(0);
        break;
    }
  }, [start, end, step, list, temp, setList]);

  const startReversal = useCallback(() => {
    clearTimeout(timerRef.current);
    setStart(0);
    setEnd(list.length - 1);
    setIsReversing(true);
    setStep(0);
    setTemp(null);
    setShowHint(false);
  }, [list.length]);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    setList([...initialList]);
    setStart(0);
    setEnd(initialList.length - 1);
    setIsReversing(false);
    setStep(0);
    setTemp(null);
    setShowSuccess(false);
    setShowHint(true);
  }, [initialList, setList]);

  useEffect(() => {
    if (!isReversing) return;

    timerRef.current = setTimeout(() => {
      reverseStep();
    }, speed * 1000);

    return () => clearTimeout(timerRef.current);
  }, [isReversing, step, speed, reverseStep]);

  const isReversed =
    JSON.stringify(list) === JSON.stringify([...initialList].reverse());

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

      <AnimatePresence>
        {showHint && !isReversed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3"
          >
            <FiInfo className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">
                Try This First!
                <br />
                This is a list for demo and introduction purposes.{" "}
              </h3>
              <p className="text-blue-700">
                In the "Reversed List" section, you can manually reverse the
                order of the list items by using the drag-and-drop feature. This
                interactive tool helps you understand how reversing a list
                works, similar to how you might do it on your phone.{" "}
              </p>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="text-blue-500 hover:text-blue-700 ml-auto"
              aria-label="Close hint"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between mb-12 gap-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Original List</h2>
          <div className="flex flex-wrap items-center gap-1">
            {originalList.map((val, i) => (
              <div
                key={`original-${i}`}
                className="bg-gray-200 p-3 rounded-lg text-center min-w-12"
              >
                {val}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Reversed List</h2>
          <div className="flex flex-wrap items-center gap-1">
            {list.map((val, i) => (
              <DraggableNode
                key={`reversed-${i}`}
                value={val}
                index={i}
                moveNode={moveNode}
                isActive={isReversing && (i === start || i === end)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Reversal Process</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="font-bold">Start List</div>
            <div className="text-2xl">→</div>
            <div
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                step === 0 ? "bg-blue-500 animate-pulse" : "bg-blue-300"
              } text-white`}
            >
              {start}
            </div>
          </div>

          <div className="text-center">
            <div className="font-bold">Temp Value</div>
            <div
              className={`p-2 rounded-lg min-w-12 ${
                step === 1 ? "bg-purple-500 animate-pulse" : "bg-purple-300"
              } text-white`}
            >
              {temp !== null ? temp : "--"}
            </div>
          </div>

          <div className="text-center">
            <div className="font-bold">End List</div>
            <div className="text-2xl">←</div>
            <div
              className={`p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto ${
                step === 1 ? "bg-red-500 animate-pulse" : "bg-red-300"
              } text-white`}
            >
              {end}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-1">
          {list.map((val, i) => (
            <motion.div
              key={`process-${i}`}
              className={`p-3 rounded-lg text-center min-w-12 ${
                i === start
                  ? "bg-blue-500 text-white"
                  : i === end
                  ? "bg-red-500 text-white"
                  : "bg-gray-100"
              }`}
              animate={{
                scale: isReversing && (i === start || i === end) ? 1.1 : 1,
              }}
            >
              {val}
            </motion.div>
          ))}
        </div>
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
};

export default function WrappedVisualizer(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <LinkedListVisualizer {...props} />
    </DndProvider>
  );
}
