import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import ContactForm from "./components/ContactForm";
import IconGrid from "@/app/components/IconGrid";
import Faq from "@/app/components/Faq";
import { AiOutlineMail } from "react-icons/ai";
import { FiMapPin, FiPhone } from "react-icons/fi";
import PageHero from "@/app/components/PageHero";

const KontaktSide = async () => {
  const { data, error } = await supabase.from("faq").select("*");

  if (error || !data) {
    console.error(error);
    return <p>FAQ kunne ikke indlæses</p>;
  }

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>
      <main>
        <PageHero
          bgColor="bg-[var(--background-tertiary)]"
          tagline="Vi hjælper dig hele vejen"
          heading="Kontakt os og få hjælp til at finde den cykelrejse, der passer bedst til dig."
          image="/assets/kontakt-image.webp"
          imageAlt="kontakt"
          className="h-0"
        />
        <ContactForm />
        <Faq
          items={data}
          hoverClassName="hover:bg-[#B8D9F8]"
          className="bg-(--background-alternate)"
          showKontaktButton={false}
        />

        <IconGrid
          title="Har du stadig spørgsmål?"
          items={[
            {
              href: "tel:+393493672104",
              icon: <FiPhone size={30} />,
              undertitle: "Telefon",
              beskrivelse: "+39 349 367 2104",
            },
            {
              href: "mailto:joachimjerichow@hotmail.com",
              icon: <AiOutlineMail size={30} />,
              undertitle: "Email",
              beskrivelse: "Joachimjerichow@hotmail.com",
            },
            {
              href: "https://maps.google.com/?q=Via+Umberto+I+24+Castelnuovo+del+Garda+VR+Italy",
              target: "_blank",
              rel: "noopener noreferrer",
              icon: <FiMapPin size={30} />,
              undertitle: "Adresse",
              beskrivelse:
                "Via Umberto I, 24, IT-37014 Castelnuovo del Garda VR",
            },
          ]}
        />
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
};

export default KontaktSide;
