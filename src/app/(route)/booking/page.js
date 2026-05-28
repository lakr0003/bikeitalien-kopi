import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { supabase } from "@/lib/supabase";
import BookingForm from "./BookingForm";
import Image from "next/image";

export default async function BookingSide({ searchParams }) {
  const params = await searchParams;
  const rejseId = params?.id;

  let rejse = null;
  if (rejseId) {
    const { data } = await supabase
      .from("cykelrejser")
      .select("id, titel, pris, dato")
      .eq("id", rejseId)
      .single();
    rejse = data;
  }

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>
      <main className="grid">
        <section className="col-[content] flex flex-col gap-8 py-12 md:grid md:grid-cols-2 md:flex-row md:gap-16 md:py-16">
          <div className="relative h-70 overflow-hidden rounded-[20px] md:order-1 md:h-full">
            <Image
              src="/assets/bjergsafaribrentadol.webp"
              fill
              alt={"Bikeitalien - cykelrejser"}
              className="object-cover object-center"
            />
          </div>
          <div>
            <BookingForm rejse={rejse} />
          </div>
        </section>
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}
