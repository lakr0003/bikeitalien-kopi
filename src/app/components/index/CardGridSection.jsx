import { Suspense } from "react";
import TravelCard from "../TravelCard";
import { supabase } from "@/lib/supabase";
import HeadingSection from "../HeadingSection";
import LinkButton from "../LinkButton";
import PageLoader from "../PageLoader";

const CardGridSection = () => {
  return (
    <section className={`col-[content] md:py-27 py-20`}>
      <div className="grid gap-8">
        <div className="flex flex-col items-baseline justify-between gap-4 md:flex-row">
          <HeadingSection
            tagline="Udvalgte rejser"
            title="Rejser til enhver rytter"
          >
            <p className="max-w-[65ch]">
              Fra familieferier til bjergpas og eventyr. Her er et lille udpluk
              af de cykelferier jeg har skabt til mine gæster
            </p>
          </HeadingSection>
          <div className="mt-auto">
            <LinkButton variant="primary" href="/rejser">
              Se alle rejser
            </LinkButton>
          </div>
        </div>
        <Suspense fallback={<PageLoader />}>
          <FetchSelectedTravels />
        </Suspense>
      </div>
    </section>
  );
};

export default CardGridSection;

const FetchSelectedTravels = async () => {
  const selectedIds = [1, 2, 3];

  const { data: rejser, error } = await supabase
    .from("cykelrejser")
    .select("*")
    .in("id", selectedIds);

  if (error) {
    return <p>Kunne ikke hente rejser.</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-8">
      {rejser.map((rejse) => (
        <TravelCard key={rejse.id} rejse={rejse} isPopular />
      ))}
    </div>
  );
};
