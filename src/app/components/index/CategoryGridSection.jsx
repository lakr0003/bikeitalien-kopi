import HeadingSection from "../HeadingSection";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    href: "/rejser?kategori=Cykelturisme",
    src: "/assets/cykelturisme.webp",
    alt: "Cykelturisme",
    label: "Cykelturisme",
  },
  {
    href: "/rejser?kategori=Mountainbike",
    src: "/assets/mountainbike.webp",
    alt: "Mountainbike",
    label: "Mountainbike",
  },
  {
    href: "/rejser?kategori=Eventyrrejse",
    src: "/assets/eventyrrejser.webp",
    alt: "Eventyrrejser",
    label: "Eventyrrejser",
  },
  {
    href: "/rejser?kategori=Gravel",
    src: "/assets/gravel.webp",
    alt: "Gravel",
    label: "Gravel",
  },
  {
    href: "/rejser?kategori=Landevej",
    src: "/assets/landevej.webp",
    alt: "Landevej",
    label: "Landevej",
  },
  {
    href: "/rejser?kategori=Familieferie",
    src: "/assets/familieferie.webp",
    alt: "Familieferie",
    label: "Familieferie",
  },
];

const CategoryGridSection = () => {
  return (
    <section className="col-[full] grid grid-cols-subgrid bg-(--background-tertiary) md:py-27 py-20">
      <div className="col-[content] flex flex-col gap-12">
        <HeadingSection
          tagline="Kategorier"
          title="Find den cykelferie, der passer til dig"
        >
          <p className="max-w-[65ch]">
            Uanset om du drømmer om hyggelige familieoplevelser, store
            naturoplevelser eller udfordrende dage i sadlen, finder du en rejse,
            der matcher dig. Jeg tilbyder både afslappede cykelferier med fokus
            på oplevelserne undervejs og ture for motionister, hvor cyklingen er
            i centrum.
          </p>
        </HeadingSection>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((card) => (
            <CategoryCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridSection;
