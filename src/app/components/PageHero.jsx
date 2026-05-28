import Image from "next/image";

const PageHero = ({
  bgColor = "bg-[var(--background-card)]",
  tagline,
  heading,
  image,
  imageAlt = "",
}) => {
  return (
    <section className={`col-[content] rounded-[20px] md:mb-10 mb-5 p-6 md:p-8 ${bgColor}`}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-2">
          {tagline && <p className="text-(--tag-size)]">{tagline}</p>}

          {heading && (
            <h2 className="text-(--h2-size)] font-medium">{heading}</h2>
          )}
        </div>

        {image && (
          <Image
            src={image}
            alt={imageAlt}
            width={800}
            height={530}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-video w-full rounded-[20px] object-cover object-top"
          />
        )}
      </div>
    </section>
  );
};

export default PageHero;
