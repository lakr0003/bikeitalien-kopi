"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const KATEGORI_ID = {
  Mountainbike: 1,
  Cykelturisme: 2,
  Eventyrrejse: 3,
  Familieferie: 1,
  Gravel: 2,
  Landevej: 3,
};

const TravelCard = ({ rejse, isPopular }) => {
  const destId = KATEGORI_ID[rejse.kategori] ?? rejse.id;
  return (
    <Link href={`/rejser/${destId}`} scroll={false} onClick={() => window.scrollTo(0, 0)} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-(--grey-100) bg-(--card-background) shadow-(--card-background) hover:shadow-md">
        <div className="grid overflow-hidden">
          <Image
            src={rejse.cardImage}
            alt={rejse.titel}
            width={800}
            height={400}
            className="col-start-1 row-start-1 aspect-4/3 w-full object-cover transition-transform duration-400 group-hover:scale-103"
          />

          {isPopular && (
            <div className="z-10 col-start-1 row-start-1 self-start justify-self-start p-4">
              <div className="rounded-full bg-(--card-background)! px-3 py-1">
                <p>Populær</p>
              </div>
            </div>
          )}
        </div>
        <section className="flex flex-col justify-between gap-8 p-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <p className="text-(--grey-400)!">{rejse.land}</p>
              <div className="mx-1 h-1 w-1 rounded-full bg-(--grey-400)" />
              <p className="text-(--grey-400)!">{rejse.kategori}</p>
              <div className="mx-1 h-1 w-1 rounded-full bg-(--grey-400)" />
              <p className="text-(--grey-400)!">{rejse.niveau}</p>
            </div>
            <h6 className="font-semibold">{rejse.titel}</h6>
            <div className="flex items-center gap-2">
              <p>{rejse.dato}</p>
              <div className="mx-1 h-1 w-1 rounded-full bg-(--text-primary)" />
              <p>{rejse.antal_dage} dage</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-1 whitespace-nowrap">
              <h5>{rejse.pris} kr.</h5>
              <p>inkl. fly</p>
            </div>
            <Button className="shrink-0">
              Se rejse
            </Button>
          </div>
        </section>
      </article>
    </Link>
  );
};

export default TravelCard;
