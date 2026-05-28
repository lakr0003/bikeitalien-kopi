import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import PageHero from "@/app/components/PageHero";
import IconGrid from "@/app/components/IconGrid";
import ImageCardSection from "@/app/components/ImageCardSection";
import Testimonials from "@/app/components/Testimonials";
import Faq from "@/app/components/Faq";
import { supabase } from "@/lib/supabase";
import AboutTimeline from "./components/AboutTimeline";
import CtaSection from "./components/CtaSection";
import OurVision from "./components/OurVision";
import Gallery from "@/app/components/Gallery";

import { TbHeartHandshake } from "react-icons/tb";
import { MdGroups2 } from "react-icons/md";
import { FaRegHeart, FaGlobeAfrica } from "react-icons/fa";

export default async function OmSide() {
  const { data, error } = await supabase.from("faq").select("*");
  if (error || !data) {
    console.error(error);
    return <p>FAQ kunne ikke indlæses</p>;
  }

  const { data: rejse } = await supabase
    .from("cykelrejser")
    .select("testimonials")
    .eq("id", 2)
    .single();

  const images = [
    { src: "/assets/apulien.webp", alt: "Apulien" },
    { src: "/assets/gardaverona.webp", alt: "Gardaverona" },
    { src: "/assets/eventyrrejser.webp", alt: "Eventyrrejser" },
    { src: "/assets/familieferie.webp", alt: "Familieferie" },
    { src: "/assets/frankerstien.webp", alt: "Frankerstien" },
    { src: "/assets/gravel.webp", alt: "Gravel biking" },
    { src: "/assets/grandissimo.webp", alt: "Grandissimo" },
    { src: "/assets/jordan.webp", alt: "Jordan" },
  ];

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>
      <main className="grid">
        <PageHero
          bgColor="bg-[var(--background-alternate)]"
          tagline="Om BikeItalien"
          heading="Skabt af passion for cykling, oplevelser og fællesskab"
          image="/assets/joachimContact.webp"
          imageAlt="Cykelrejse"
        />
        <AboutTimeline />
        <OurVision />
        <IconGrid
          title="Hvad gør BikeItalien unikt?"
          items={[
            {
              icon: <TbHeartHandshake size={30} />,
              undertitle: "Personlige rejser",
              beskrivelse:
                "Rejserne er skabt med en personlig tilgang, hvor der er fokus på nærvær, fleksibilitet og gode oplevelser for den enkelte gæst.",
            },
            {
              icon: <MdGroups2 size={30} />,
              undertitle: "Fokus på fællesskab",
              beskrivelse:
                "Der lægges stor vægt på det sociale fællesskab både på og uden for cyklen, hvor gode oplevelser deles undervejs.",
            },
            {
              icon: <FaRegHeart size={30} />,
              undertitle: "Lokalkendskab",
              beskrivelse:
                "Rejserne bygger på mange års liv i Italien og giver adgang til autentiske steder, ruter og oplevelser væk fra de klassiske turistspor.",
            },
            {
              icon: <FaGlobeAfrica size={30} />,
              undertitle: "Gennemtestede ruter",
              beskrivelse:
                "Alle ruter er nøje udvalgt og afprøvet gennem mange år for at sikre kvalitet, variation og gode cykeloplevelser.",
            },
          ]}
        />
        <Gallery images={images} />
        <Testimonials testimonials={rejse.testimonials} />
        <ImageCardSection
          rejse={{
            oplevelse_tagline: "Vores historie",
            oplevelse_titel: "Teamet bag BikeItalien",
            oplevelse_beskrivelse:
              "BikeItalien er skabt ud fra en passion for cykling, eventyr og autentiske oplevelser. Bag rejserne står mennesker med mange års erfaring fra både Italien og landevejen, som brænder for at skabe ture med nærvær, fællesskab og oplevelser på to hjul.",
            oplevelse: [
              {
                id: 5,
                titel: "Johan Joachim Jerichow",
                beskrivelse:
                  "Joachim er drivkraften bag Bike Italien. Han har boet i Italien i mange år og har gjort Gardasøen til sit hjem sammen med sin familie. Herfra har han skabt Bike Italien med en klar passion for cykling, bjergene, den italienske livsstil og gode oplevelser i naturen. I dag er han guide og vært på cykelferier i både Italien og resten af verden, hvor fokus altid er på fællesskab, lokalkendskab og oplevelser, der går lidt dybere end bare selve cyklingen.",
                image: "/assets/joachimPortait.webp",
              },
              {
                id: 4,
                titel: "Bjarke Andersen",
                beskrivelse:
                  "Bjarke Andersen fra Ikast har været fast med-guide hos Bike Italien næsten fra begyndelsen. Han har stor erfaring med motionscykling, en stærk passion for Italien og er kendt for sin gode humor og midtjyske lune i feltet. Bjarke har guidet på mange af Bike Italiens ture gennem årene og er en vigtig del af teamet både på og uden for cyklen. Han er gift med Lotte, som ofte deltager på rejserne og bidrager til den gode stemning blandt gæsterne.",
                image: "/assets/bjarke.webp",
              },
            ],
          }}
        />

        <CtaSection />

        <Faq items={data} hoverClassName="hover:bg-(--card-background)" />
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}
