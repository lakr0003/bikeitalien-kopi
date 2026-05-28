import Image from "next/image";

const ImageCardSection = ({ rejse }) => {
  return (
    <section
      className="col-[content] scroll-mt-32 py-20 md:py-27"
      id="oplevelser"
    >
      <div className="grid gap-20">
        <div className="grid grid-cols-1 items-center justify-between gap-6 md:grid-cols-2">
          <div>
            <p>{rejse.oplevelse_tagline}</p>
            <h3 className="font-semibold">{rejse.oplevelse_titel}</h3>
          </div>

          <p className="max-w-[65ch]">{rejse.oplevelse_beskrivelse}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-20 md:gap-10">
          {rejse.oplevelse.map((oplevelse) => (
            <article key={oplevelse.id} className="flex flex-col gap-4">
              <Image
                src={oplevelse.image}
                width={600}
                height={800}
                alt={oplevelse.titel}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-video w-full rounded-[20px] object-cover"
              />

              <h5 className="font-semibold">{oplevelse.titel}</h5>

              <p className="text-grey-400 text-sm leading-relaxed">
                {oplevelse.beskrivelse}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCardSection;
