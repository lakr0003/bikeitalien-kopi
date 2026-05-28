"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TimelineItem = ({ item, index, length }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      initial={{ y: 40 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ amount: 0.4 }}
      className="grid min-h-[50vh] grid-cols-[40px_1fr] gap-20"
    >
      <div className="flex flex-col items-center">
        <div className="z-50 h-7 w-7 rounded-full bg-(--accent)" />

        {index !== length && (
          <div className="relative w-0.5 flex-1 bg-transparent">
            <motion.div
              style={{
                height: useTransform(lineProgress, [0, 1], ["0%", "100%"]),
              }}
              className="absolute top-0 left-0 w-full bg-(--accent)"
            />
          </div>
        )}
      </div>

      <div className="sticky top-24 h-fit pb-24">
        <p className="mb-4 text-sm font-semibold">{item.year}</p>
        <h5 className="mb-4 leading-tight font-semibold">{item.title}</h5>
        <p className="leading-relaxed">{item.text}</p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
