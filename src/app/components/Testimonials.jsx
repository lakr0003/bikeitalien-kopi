"use client";

import { useState } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials({ testimonials }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const cardWidth = 432; // 400px kort + 32px padding/gap

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const cardColors = [
    "bg-[var(--background-tertiary)]",
    "bg-[var(--background-alternate)]",
    "bg-[var(--background-card)]",
    "bg-[var(--accent)]",
  ];

  const rotations = [
    "rotate-[-4deg]",
    "rotate-[3deg]",
    "rotate-[-3deg]",
    "rotate-[2deg]",
  ];

  return (
    <section
      className="col-[full] grid scroll-mt-32 grid-cols-subgrid overflow-x-hidden py-20 md:py-27"
      id="anmeldelser"
    >
      <div className="col-[content]">
        <div className="mb-12 md:mb-10">
          <h3 className="mb-5 text-4xl font-semibold md:text-6xl">
            Det siger vores rejsende
          </h3>
          <p>
            Her er et udsnit af hvad vores tidligere rejseglade kunder har at
            sige om deres rejser.
          </p>
        </div>
      </div>

      <div className="col-[content-start/full-end]">
        <div className="overflow-x-auto overflow-y-visible">
          <motion.div
            className="flex w-max items-stretch gap-2 p-4 md:p-8"
            animate={{ x: `-${current * 400}px` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {testimonials.map((item, index) => (
              <div
                key={item.id}
                className={`flex w-[400px] flex-none pr-6 md:w-[400px] md:pr-8 ${
                  rotations[index % rotations.length]
                }`}
              >
                <TestimonialCard
                  testimonial={item}
                  bgColor={cardColors[index % cardColors.length]}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between pr-[5%]">
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Gå til anmeldelse ${index + 1}`}
                className={`h-2 w-2 rounded-full ${
                  current === index ? "bg-black" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              aria-label="Forrige anmeldelse"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--background-secondary)]"
            >
              <RxChevronLeft style={{ color: "#ffff" }} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Næste anmeldelse"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--background-secondary)]"
            >
              <RxChevronRight style={{ color: "#ffff" }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
