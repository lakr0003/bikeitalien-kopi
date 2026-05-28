import { Accordion } from "@/components/ui/accordion";
import FaqItem from "./FaqItem";

import LinkButton from "./LinkButton";

const Faq = ({ items = [], className = "", hoverClassName, showKontaktButton = true }) => {
  return (
    <>
      <section
        className={`text-primary bg-primary col-[full] grid scroll-mt-32 grid-cols-subgrid py-20 md:py-27 ${className || ""}`}
        id="faq"
      >
        <div className="col-[content] grid grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <div className="flex flex-col gap-6 pb-8">
              <h3 className="font-semibold">Ofte stillede spørgsmål</h3>
              <p>
                Har du spørgsmål om cykelferierne? Her finder du de vigtigste
                svar og ellers hjælper jeg dig gerne videre.
              </p>
            </div>
            {showKontaktButton && (
              <LinkButton href="/kontakt" variant="primary" className="w-fit">
                Gå til kontakt
              </LinkButton>
            )}
          </div>
          <Accordion type="single" collapsible className="w-full">
            {items.map((items) => (
              <FaqItem
                key={items.id}
                items={items}
                hoverClassName={hoverClassName}
              />
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Faq;
