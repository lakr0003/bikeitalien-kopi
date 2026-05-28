"use client";

import { motion, useTransform } from "framer-motion";

const RevealWord = ({ word, index, totalWords, scrollYProgress }) => {
  const start = index / totalWords;
  const end = (index + 1) / totalWords;

  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-2 inline-block">
      {word}
    </motion.span>
  );
};

export default RevealWord;
