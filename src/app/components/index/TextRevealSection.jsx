"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";
import WordReveal from "./WordReveal";
import { motion } from "framer-motion";

const text =
  "BikeItalien arrangerer personlige cykelrejser for mennesker, der søger mere end bare en ferie. Bag BikeItalien står jeg, Joachim, som siden 2007 har skabt oplevelser med fokus på fællesskab, natur og kultur fra italienske bjergpas til eventyr i Vietnam og Cambodia. Turene er planlagt ned til mindste detalje, så du kan slippe bekymringerne og nyde rejsen, ruterne og menneskene omkring dig. Her handler det ikke kun om at nå frem, men om at opleve noget undervejs.";

const TextRevealSection = () => {
  const ref = useRef(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 80%"],
  });

  const stats = [
    {
      number: "18+",
      title: "års erfaring",
      text: "Personlige cykelrejser siden 2007",
    },
    {
      number: "100+",
      title: "ture gennemført",
      text: "Gennemtestede ruter og oplevelser",
    },
    {
      number: "6+",
      title: "lande",
      text: "Fra Gardasøen til Vietnam og Cambodia",
    },

    // {
    //   number: "Små",
    //   title: "grupper",
    //   text: "Fokus på fællesskab og nærvær",
    // },
  ];

  return (
    <section ref={ref} className="col-[full] grid grid-cols-subgrid">
      <Image
        src="/assets/backgroundIllu.svg"
        alt=""
        width={2000}
        height={1200}
        className="col-[full] row-start-1 row-end-3 h-full w-full object-cover"
      />

      <div className="col-[content] row-start-1 grid py-18 md:pt-24">
        <div className="md::grid-cols-2 grid items-end gap-10">
          <div className="grid gap-3 md:w-2xl">
            <p className="font-semibold">Hvad er BikeItalien?</p>
            <h5>
              {words.map((word, index) => (
                <WordReveal
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  totalWords={words.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </h5>
          </div>
          <div className="grid gap-8 md:flex xl:col-start-2 xl:row-start-2 xl:gap-3">
            {stats.map((item, index) => (
              <motion.article
                key={item.title}
                className="rounded-3xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{ duration: 0.9, delay: index * 0.2 }}
              >
                <h4 className="mb-2 leading-none font-bold text-[var(--background-secondary)] text-[var(--h3-size)]">
                  {item.number}
                </h4>

                <h6 className="mb-2 font-semibold text-[var(--h6-size)] text-[var(--text-primary)]">
                  {item.title}
                </h6>

                <p className="leading-relaxed text-[var(--grey-400)] text-[var(--p-size)]">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextRevealSection;
