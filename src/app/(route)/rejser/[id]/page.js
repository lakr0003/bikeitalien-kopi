import Header from "@/app/components/Header";
import { supabase } from "@/lib/supabase";
import Footer from "@/app/components/Footer";
import ImageCardSection from "@/app/components/ImageCardSection";
import ContactSection from "@/app/components/ContactSection";
import Testimonials from "@/app/components/Testimonials";
import IconGrid from "@/app/components/IconGrid";
import { IoAirplaneOutline, IoRestaurantOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { PiPersonSimpleBike } from "react-icons/pi";
import IdPageHeading from "../components/IdPageHeading";
import Image from "next/image";
import Gallery from "@/app/components/Gallery";
import AnchorNav from "../components/AnchorNav";
import ItinerarySection from "../components/ItinerarySection";
import Faq from "@/app/components/Faq";

export default async function RejseDetalje({ params }) {
  const { id } = await params;

  const { data: rejse, error } = await supabase
    .from("cykelrejser")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return <p>Rejsen blev ikke fundet.</p>;
  }

  const faqItems = rejse.faq || [];

  //fra array af strings (url) til array af objects
  const galleryImages = rejse.gallery.map((src, index) => ({
    src,
    alt: `${rejse.title} billede ${index + 1}`,
  }));

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>
      <main>
        <IdPageHeading rejse={rejse} />
        <AnchorNav rejseId={id} />
        <ItinerarySection rejse={rejse} />
        <ImageCardSection rejse={rejse} />
        <IconGrid
          title="Hvad har vi styr på for dig?"
          withBackground
          items={rejse.praktisk.map((item, i) => ({
            icon: [
              <IoAirplaneOutline size={30} />,
              <AiOutlineHome size={30} />,
              <IoRestaurantOutline size={30} />,
              <PiPersonSimpleBike size={30} />,
            ][i],
            undertitle: item.undertitle,
            beskrivelse: item.beskrivelse,
          }))}
        />

        <Testimonials testimonials={rejse.testimonials} />
        <Gallery images={galleryImages} />
        <Faq items={faqItems} />
        <ContactSection />
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}
