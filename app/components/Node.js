"use client";
import { motion } from "framer-motion";
import { useDrag, useDrop } from "react-dnd";

const Node = ({ node, isCurrent, isPrev, isNext, moveNode }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NODE",
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "NODE",
    drop: (item) => {
      if (item.id !== node.id) {
        moveNode(item.id, node.id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getNodeColor = () => {
    if (isCurrent) return "bg-blue-500";
    if (isPrev) return "bg-red-500";
    if (isNext) return "bg-green-500";
    return "bg-gray-200";
  };

  return (
    <div ref={drop} className="flex items-center gap-2">
      <motion.div
        ref={drag}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isDragging ? 0.5 : 1,
          y: 0,
          scale: isOver ? 1.05 : 1,
        }}
        className={`${getNodeColor()} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-move`}
      >
        {node.value}
      </motion.div>

      {node.next && (
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl"
        >
          →
        </motion.div>
      )}
    </div>
  );
};

export default Node;
