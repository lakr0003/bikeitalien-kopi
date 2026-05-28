import Image from "next/image";
import HeadingSection from "../HeadingSection";
import LinkButton from "../LinkButton";

const AboutSection = () => {
  return (
    <section className="col-[full] grid grid-cols-subgrid bg-(--background-alternate) md:py-27 py-20">
      <div className="col-[content] grid gap-12 lg:grid-cols-2 lg:gap-20">
        <HeadingSection title="Velkommen til Joachims cykelferieunivers">
          <p className="pt-2 pb-6">
            Hvis du leder efter en cykelferie med gode oplevelser, nærvær og
            masser af indhold, så er du landet det rigtige sted! <br />
            <br />
            Jeg arrangerer primært cykelferier i Norditalien, men har også
            løbende eventyrrejser til destinationer længere væk på programmet.
            Her finder du både ture for familier, par og venner, der ønsker
            friheden til at opleve på egen hånd, samt guidede ture for
            cykelturister og motionister på landevej, mountainbike og E-bike.{" "}
            <br />
            <br />
            Fælles for alle mine rejser er kærligheden til cykling, et højt
            serviceniveau og det gode fællesskab, der opstår undervejs.
          </p>
          <LinkButton href="/om" className="w-fit">Læs mere om mig</LinkButton>
        </HeadingSection>
        <div className="overflow-hidden rounded-[20px]">
          <Image
            src="/assets/joachimAbout.webp"
            alt="Joachim Jerichow"
            width={800}
            height={600}
            className="aspect-5/4 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
