import Header from "@/app/components/Header";
import TravelCard from "@/app/components/TravelCard";
import Footer from "@/app/components/Footer";
import { Suspense } from "react";
import PageHero from "@/app/components/PageHero";
import FilterDropdowns from "@/app/components/FilterDropdowns";
import { supabase } from "@/lib/supabase";

const maanedNavne = {
  1: "Januar",
  2: "Februar",
  3: "Marts",
  4: "April",
  5: "Maj",
  6: "Juni",
  7: "Juli",
  8: "August",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "December",
};

const maanedNummer = {
  januar: 1,
  februar: 2,
  marts: 3,
  april: 4,
  maj: 5,
  juni: 6,
  juli: 7,
  august: 8,
  september: 9,
  oktober: 10,
  november: 11,
  december: 12,
};

export default async function AlleRejser({ searchParams }) {
  const params = await searchParams;

  const parseParam = (val) => (val ? val.split(",").filter(Boolean) : []);

  const aktivFiltre = {
    kategori: parseParam(params.kategori),
    land: parseParam(params.land),
    maaned: parseParam(params.maaned),
    sværhedsgrad: parseParam(params.sværhedsgrad),
    varighed: parseParam(params.varighed),
  };

  const { data: filterData } = await supabase
    .from("cykelrejser")
    .select("land, antal_dage, tidspunkt");

  const lokationer = [
    ...new Set(filterData?.map((rejse) => rejse.land).filter(Boolean)),
  ].sort();

  const varigheder = [
    ...new Set(
      filterData
        ?.map((rejse) => Number(rejse.antal_dage))
        .filter((antal) => !isNaN(antal) && antal > 0),
    ),
  ].sort((foerste, anden) => foerste - anden);

  const månedSet = new Set();
  filterData?.forEach((rejse) => {
    rejse.tidspunkt?.forEach((maanedNavn) => {
      const nummer = maanedNummer[maanedNavn];
      if (nummer) månedSet.add(nummer);
    });
  });
  const maaneder = [...månedSet]
    .sort((foerste, anden) => foerste - anden)
    .map((nummer) => ({ num: String(nummer), navn: maanedNavne[nummer] }));

  return (
    <>
      <header className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid">
        <Header />
      </header>

      <main className="grid">
        <PageHero
          bgColor="bg-[var(--background-tertiary)]"
          tagline="Hvor skal turen gå hen?"
          heading="Gå på opdagelse i alle vores cykelrejser"
          image="/assets/rejseside-hero.webp"
          imageAlt="Cykelrejse"
          className="h-0"
        />

        <section className="col-[content] grid py-8">
          <FilterDropdowns
            aktivFiltre={aktivFiltre}
            lokationer={lokationer}
            maaneder={maaneder}
            varigheder={varigheder}
          />
        </section>

        <Suspense fallback={<p>Indlæser rejser...</p>}>
          <TravelCardContainer aktivFiltre={aktivFiltre} />
        </Suspense>
      </main>
      <footer className="col-[full] grid grid-cols-subgrid">
        <Footer />
      </footer>
    </>
  );
}

async function TravelCardContainer({ aktivFiltre }) {
  let query = supabase.from("cykelrejser").select("*");

  if (aktivFiltre.kategori.length > 0)
    query = query.in("kategori", aktivFiltre.kategori);
  if (aktivFiltre.land.length > 0) query = query.in("land", aktivFiltre.land);
  if (aktivFiltre.sværhedsgrad.length > 0)
    query = query.in("niveau", aktivFiltre.sværhedsgrad);
  if (aktivFiltre.varighed.length > 0)
    query = query.in("antal_dage", aktivFiltre.varighed.map(Number));

  const { data: alleRejser, error } = await query.order("id", {
    ascending: true,
  });

  if (error) {
    return <p>Kunne ikke hente rejser.</p>;
  }

  let filtreretRejser = alleRejser ?? [];

  if (aktivFiltre.maaned.length > 0) {
    filtreretRejser = filtreretRejser.filter((rejse) =>
      rejse.tidspunkt?.some((maanedNavn) =>
        aktivFiltre.maaned.includes(String(maanedNummer[maanedNavn])),
      ),
    );
  }

  return (
    <>
      <div className="col-[content] border-t border-(--grey-200) pt-4">
        <p style={{ fontSize: "var(--tag-size)", color: "var(--grey-300)" }}>
          {filtreretRejser.length} rejser
        </p>
      </div>
      <section className="col-[content] grid py-10">
        {filtreretRejser.length === 0 ? (
          <h6 className="text-(--grey-400)">
            Ingen rejser matcher dit filter.
          </h6>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] items-stretch gap-8">
            {filtreretRejser.map((rejse) => (
              <TravelCard key={rejse.id} rejse={rejse} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}