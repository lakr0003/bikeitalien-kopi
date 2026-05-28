"use client";
import Image from "next/image";

import TimelineItem from "./TimelineItem";

const items = [
  {
    year: "2000'erne",
    title: "Drømmen om Italien tager form",
    text: "Joachim flytter til Italien og forelsker sig i bjergene, kulturen og den italienske livsstil. Her begynder idéen om at kombinere cykling, natur og gode oplevelser.",
  },
  {
    year: "2007",
    title: "Bike Italien bliver født",
    text: "Med en stærk passion for cykling og Italien starter han Bike Italien. Målet er enkelt: at skabe cykelferier med sjæl, nærvær og lokalkendskab, ikke standardrejser.",
  },
  {
    year: "2010'erne",
    title: "Rejserne vokser",
    text: "Ture i Gardasøen, Dolomitterne og resten af Italien bliver udviklet. Konceptet tager form: små grupper, stærke oplevelser, god mad og autentiske steder, altid med Joachim som guide og vært.",
  },
  {
    year: "I dag",
    title: "Et cykelunivers med personlighed",
    text: "Bike Italien er et rejseunivers for familier, motionister og eventyrere. Joachim er stadig den gennemgående figur som guide og vært med fokus på fællesskab, sikkerhed og gode oplevelser.",
  },
];

const AboutTimeline = () => {
  return (
    <>
      <section className="col-[content] grid grid-cols-1 gap-20 py-20 md:grid-cols-2 md:py-27">
        <div className="h-fit md:sticky md:top-24">
          <p className="mb-4 font-semibold">Vores historie</p>
          <h3 className="mb-4 font-semibold">Historien bag BikeItalien</h3>
          <p className="mb-7.5">
            Bike Italien blev startet i 2007. Det begyndte med cykelferier i
            Norditalien for familier og motionister, men er siden vokset til
            både mountainbike-, landevejs- og eventyrrejser i store dele af
            verden.
          </p>
          <Image
            src="/assets/nepal.webp"
            alt="Nepal"
            width={1080}
            height={1440}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-video w-full rounded-[20px] object-cover"
          />
        </div>

        <div className="relative flex flex-col">
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              length={items.length}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutTimeline;
