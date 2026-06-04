"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[var(--background-primary)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Baggrund */}
          <div className="absolute inset-0 bg-[var(--background-secondary)] bg-[url('/assets/backgroundIllu.svg')] bg-cover bg-center opacity-20" />

          {/* Animation */}
          <div className="relative z-10 flex h-48 w-80 items-center justify-center md:w-[460px]">
            {/* Vej */}
            <div className="absolute top-1/2 mt-6 h-[2px] w-56 bg-[var(--text-primary)]/20" />

            {/* Cykel */}
            <motion.img
              src="/assets/bike.svg"
              alt="Cykel animation"
              className="relative z-10 w-12 md:w-16"
              initial={{ x: -40, opacity: 1 }}
              animate={{
                x: [-40, 50],
                
              }}
              transition={{
                duration: "2",
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
