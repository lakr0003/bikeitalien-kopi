import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import CategoryGridSection from "./components/index/CategoryGridSection";
import CardGridSection from "./components/index/CardGridSection";
import TextRevealSection from "./components/index/TextRevealSection";
import Faq from "./components/Faq";
import Header from "./components/Header";
import ProcessSection from "./components/index/ProcessSection";
import AboutSection from "./components/index/AboutSection";
import IndexHero from "./components/index/IndexHero";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase.from("faq").select("*");

  const { data: rejse, error: rejseError } = await supabase
    .from("cykelrejser")
    .select("testimonials")
    .eq("id", 1)
    .single();

  if (error || !data) {
    console.error(error);
    return <p>FAQ kunne ikke indlæses</p>;
  }

  if (rejseError || !rejse) {
    console.error(rejseError);
    return <p>Testimonials kunne ikke indlæses</p>;
  }

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid h-0 grid-cols-subgrid overflow-visible">
        <Header />
      </header>

      <main className="top-0 col-[full] grid">
        <IndexHero />
        <TextRevealSection />
        <CategoryGridSection />
        <ProcessSection />
        <AboutSection />
        <Testimonials testimonials={rejse.testimonials} />
        <CardGridSection />
        <Faq items={data} />
        <ContactSection />
      </main>

      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}
