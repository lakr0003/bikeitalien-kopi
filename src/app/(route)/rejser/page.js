import Header from "@/app/components/Header";
import TravelCard from "@/app/components/TravelCard";
import Footer from "@/app/components/Footer";
import { Suspense } from "react";
import PageHero from "@/app/components/PageHero";
import FilterDropdowns from "@/app/components/FilterDropdowns";
import { supabase } from "@/lib/supabase";
import IdPageHeading from "./components/IdPageHeading";

const MAANED_NAVNE = {
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

const DANSK_MAANED_NR = {
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

function parseMaanedFraDato(dato) {
  if (!dato) return null;
  const num = parseInt(dato);
  if (!isNaN(num) && num >= 1 && num <= 12) return num;
  const d = new Date(dato);
  if (!isNaN(d.getTime())) return d.getMonth() + 1;
  const lower = String(dato).toLowerCase();
  for (const [navn, nr] of Object.entries(DANSK_MAANED_NR)) {
    if (lower.includes(navn)) return nr;
  }
  return null;
}

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
    ...new Set(filterData?.map((t) => t.land).filter(Boolean)),
  ].sort();

  const varigheder = [
    ...new Set(
      filterData
        ?.map((t) => Number(t.antal_dage))
        .filter((n) => !isNaN(n) && n > 0),
    ),
  ].sort((a, b) => a - b);

  const månedSet = new Set();
  filterData?.forEach((t) => {
    const nr = parseMaanedFraDato(t.tidspunkt);
    if (nr) månedSet.add(nr);
  });
  const maaneder = [...månedSet]
    .sort((a, b) => a - b)
    .map((n) => ({ num: String(n), navn: MAANED_NAVNE[n] }));

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

  const { data: travels, error } = await query.order("id", { ascending: true });

  if (error) {
    return <p>Kunne ikke hente rejser.</p>;
  }

  let filtered = travels ?? [];

  if (aktivFiltre.maaned.length > 0) {
    const monthNums = aktivFiltre.maaned.map(Number);
    filtered = filtered.filter((t) => {
      const nr = parseMaanedFraDato(t.tidspunkt);
      return nr !== null && monthNums.includes(nr);
    });
  }

  return (
    <>
      <div className="col-[content] border-t border-(--grey-200) pt-4">
        <p style={{ fontSize: "var(--tag-size)", color: "var(--grey-300)" }}>
          {filtered.length} rejser
        </p>
      </div>
      <section className="col-[content] grid py-10">
        {filtered.length === 0 ? (
          <h6 className="text-(--grey-400)">
            Ingen rejser matcher dit filter.
          </h6>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] items-stretch gap-8">
            {filtered.map((rejse) => (
              <TravelCard key={rejse.id} rejse={rejse} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
