import { AnimatePresence, motion } from "framer-motion";

interface RotatingWordProps {
  word: string;
  /** unique key to trigger animation */
  wordKey: string;
}

const RotatingWord = ({ word, wordKey }: RotatingWordProps) => {
  return (
    <span className="relative inline-flex items-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={wordKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="relative inline-block"
        >
          {word}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingWord;
