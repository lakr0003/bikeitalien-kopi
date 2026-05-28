import LinkButton from "./LinkButton";
import HeadingSection from "./HeadingSection";
import Image from "next/image";
import Link from "./Link";

const ContactSection = () => {
  return (
    <section
      className={`col-[full] grid md:py-27 py-20 md:mb-27 mb-20  grid-cols-subgrid bg-(--background-alternate)`}
    >
      <div className="col-[content] grid items-start gap-8 xl:grid-cols-2 xl:gap-28">
        <HeadingSection
          tagline="Har du flere spørgsmål?"
          title="Kontakt mig her, så finder vi ud af det sammen"
        >
          <LinkButton href="/kontakt" variant="primary" className="w-fit">
            Kontakt mig
          </LinkButton>
        </HeadingSection>

        <div className="grid items-start gap-6 md:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-xl md:-order-1 xl:aspect-3/4">
            <Image
              src="/assets/joachimContact.webp"
              alt="Johan Joachim Jerichow"
              width={900}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex h-full flex-col items-start justify-between gap-6">
            <div>
              <h6 className="[font-size:var(--h6-size)] font-medium">
                Johan Joachim Jerichow
              </h6>
              <p className="text-(--grey-400)">Ejer af Bike Italien</p>
            </div>

            <div className="flex flex-col gap-1">
              <Link href="mailto:joachimjerichow@hotmail.com" variant="p">
                joachimjerichow@hotmail.com
              </Link>
              <Link href="tel:+3939493672104" variant="p">
                +39-3493672104
              </Link>
              <Link
                href="https://www.facebook.com/bikeitalien/?locale=da_DK"
                variant="p"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
