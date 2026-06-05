"use client";
import Image from "next/image";
import LinkButton from "../LinkButton";
import { motion, animate } from "framer-motion";

const IndexHero = () => {
  const handleScroll = () => {
    document.documentElement.style.scrollBehavior = "auto";
    animate(window.scrollY, window.innerHeight * 0.8, {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (position) => window.scrollTo(0, position),
      onComplete: () => {
        document.documentElement.style.scrollBehavior = "";
      },
    });
  };
  return (
    <>
      <section className="relative col-[full] grid h-screen grid-cols-subgrid grid-rows-1 overflow-hidden">
        <Image
          className="col-[full] row-start-1 h-full w-full object-cover"
          priority
          src="/assets/herobikeitalien.webp"
          alt="Hero Image"
          width={1920}
          height={1080}
        />

        <div className="z-10 col-[content] row-start-1 grid place-items-center items-center text-center">
          <div className="space-y-4">
            <h1 className="text-(--text-secondary)! italic md:whitespace-nowrap">
              <span className="font-bold">Cykelferier</span>
              <span className="ml-[0.3em] font-light!">
                så livet kan mærkes
              </span>
            </h1>
            <div className="mx-auto max-w-2xl space-y-4">
              <h6 className="text-(--text-secondary)!">
                Oplev verden fra sadlen – uanset om du vil være en del af et
                stærkt fællesskab på vores grupperejser, eller du vil afsted
                alene med din egen familie på en skræddersyet, forplanlagt rute.
              </h6>
              <div className="flex justify-center pt-4">
                <LinkButton
                  href="/rejser"
                  variant="accent"
                  className="w-fit place-content-center"
                >
                  Se alle cykelrejser
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 cursor-pointer flex-col items-center text-(--text-secondary)!"
          onClick={handleScroll}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <Image
                src="/assets/polygon.svg"
                alt="Scroll down"
                width={50}
                height={50}
                loading="eager"
                className="h-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default IndexHero;
