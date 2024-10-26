"use client";

import { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { useDelayedVisibility } from "../../hooks/useDelayedVisibility";
import { motion, AnimatePresence } from "framer-motion";

interface ShapeToolProps {
  icon: LucideIcon | IconType;
  onClick: () => void;
}

const ShapeTool = ({ icon: Icon, onClick }: ShapeToolProps) => {
  const isVisible = useDelayedVisibility(300);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="aspect-square border rounded-md p-2"
          onClick={onClick}
        >
          <Icon className="h-full w-full" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ShapeTool;
