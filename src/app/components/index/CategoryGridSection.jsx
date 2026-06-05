import HeadingSection from "../HeadingSection";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    href: "/rejser?kategori=Cykelturisme",
    src: "/assets/kategori_img/cykelturisme_img.webp",
    alt: "Cykelturisme",
    label: "Cykelturisme",
    description:
      "Guidede cykelferier med fokus på natur, kultur og historie. Oplev Gardasøen, Toscana, Rom og Syditalien på mountainbike eller e-bike.",
  },
  {
    href: "/rejser?kategori=Mountainbike",
    src: "/assets/kategori_img/mountainbike_img.webp",
    alt: "Mountainbike",
    label: "Mountainbike",
    description:
      "Mountainbikeoplevelser i rå og uspoleret natur med fokus på teknik, udfordring og fællesskab omkring Gardasøen og Dolomitterne.",
  },
  {
    href: "/rejser?kategori=Eventyrrejse",
    src: "/assets/kategori_img/eventyrrejse_img.webp",
    alt: "Eventyrrejser",
    label: "Eventyrrejser",
    description:
      "Eksotiske cykeleventyr i fjerne lande med fokus på kulturmøder, storslået natur og oplevelser ud over det sædvanlige.",
  },
  {
    href: "/rejser?kategori=Gravel",
    src: "/assets/kategori_img/gravel_img.webp",
    alt: "Gravel",
    label: "Gravel",
    description:
      "Eventyrlige gravelture på grusveje og bjergstier omkring Gardasøen, Lessinia og Valpolicella, langt fra trafik og hverdag.",
  },
  {
    href: "/rejser?kategori=Landevej",
    src: "/assets/kategori_img/landevej_img.webp",
    alt: "Landevej",
    label: "Landevej",
    description:
      "Guidede landevejsture og træningslejre i Norditalien og Spanien for motionister, der ønsker udfordrende ruter i smukke omgivelser.",
  },
  {
    href: "/rejser?kategori=Familieferie",
    src: "/assets/kategori_img/familieferier_img.webp",
    alt: "Familieferier",
    label: "Familieferier",
    description:
      "Cykelferier for hele familien med fleksible ruter, højt serviceniveau og oplevelser omkring Gardasøen, Verona og Trentino.",
  },
];

const CategoryGridSection = () => {
  return (
    <section className="col-[full] grid grid-cols-subgrid bg-(--background-tertiary) py-20 md:py-27">
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
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {categories.map((card) => (
            <CategoryCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGridSection;
