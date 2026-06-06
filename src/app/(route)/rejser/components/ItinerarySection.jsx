"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "@/app/components/Button";

export default function RejseDageTimeline({ rejse }) {
  const dage = rejse?.dage || [];
  const [active, setActive] = useState(0);

  if (!dage.length) return null;

  const dag = dage[active];

  const next = () => setActive((p) => (p === dage.length - 1 ? 0 : p + 1));
  const prev = () => setActive((p) => (p === 0 ? dage.length - 1 : p - 1));

  const progress =
    dage.length > 1 ? `${(active / (dage.length - 1)) * 100}%` : "0%";

  //NYYYYT
  const mapUrl = rejse?.travelMap || [];

  return (
    <section className="col-[content] py-16 md:py-24" id="dagsplan">
      <div className="grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">
        <div>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
              >
                <h4 className="font-semibold">Dag {dag.dag}</h4>
                <h5 className="mb-3">{dag.dato || rejse.dato}</h5>
                <h6 className="mb-5">{dag.heading}</h6>

                <div className="relative">
                  <div className="custom-scroll h-36 overflow-y-auto pr-4 pb-10 md:h-64">
                    <motion.p
                      className="max-w-(--text-max-width) whitespace-pre-line"
                      animate={{ y: [0, -14, 0] }}
                      transition={{
                        delay: 0.7,
                        duration: 0.9,
                        ease: "easeInOut",
                      }}
                    >
                      {dag.beskrivelse}
                    </motion.p>
                  </div>

                  <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-linear-to-t from-(--background-primary) to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              iconPosition="left"
              onClick={prev}
              aria-label="Forrige dag"
            >
              Forrige dag
            </Button>

            <Button
              variant="primary"
              iconPosition="right"
              onClick={next}
              aria-label="Næste dag"
            >
              Næste dag
            </Button>
          </div>

          <p className="text-var(--grey-400)! mt-4 font-bold md:hidden">
            Dag {dag.dag} af {dage.length}
          </p>
        </div>

        <div className="relative h-125 w-full overflow-hidden rounded-[10px] md:rounded-[20px]">
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={dag.billede}
                alt={dag.heading}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence> */}
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Rutekort for ${rejse?.titel || "rejsen"}`}
          ></iframe>
        </div>
      </div>

      <div className="relative mt-16 hidden md:block">
        <div className="absolute top-1.75 h-0.75 w-full bg-(--grey-100)" />

        <motion.div
          animate={{ width: progress }}
          transition={{ duration: 0.35 }}
          className="absolute top-1.75 z-10 h-0.75 bg-(--text-primary)"
        />

        <div className="flex justify-between">
          {dage.map((item, index) => {
            const done = index <= active;
            const isActive = index === active;

            return (
              <button
                key={index}
                onClick={() => setActive(index)}
                className="z-20 flex flex-col items-center gap-3"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBike" //deler animation med de andre cykler, så det ligner den samme der flytter sig
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="pointer-events-none absolute -top-9 z-30 flex items-center justify-center"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-(--grey-100) bg-(--background-primary) shadow-sm">
                      <Image
                        src="/assets/bike_icon.webp"
                        alt="Cykel-indikator"
                        width={28}
                        height={28}
                        className="rounded-full object-contain"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  animate={{
                    backgroundColor: done
                      ? "var(--text-primary)"
                      : "var(--grey-300)",
                    scale: index === active ? 1.1 : 1,
                  }}
                  className="h-3.75 w-3.75 cursor-pointer overflow-hidden rounded-full"
                  style={{
                    boxShadow: "0 0 0 8px var(--background-primary)",
                  }}
                />

                <span
                  className={`font-bold whitespace-nowrap ${
                    done ? "text-(--text-primary)" : "text-(--grey-300)"
                  } `}
                >
                  Dag {item.dag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
