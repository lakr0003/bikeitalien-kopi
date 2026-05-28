import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqItem = ({
  items,
  hoverClassName = "hover:bg-(--card-background)",
}) => {
  return (
    <>
      <AccordionItem
        value={`item-${items.id}`}
        className="border-(primary) border-t"
      >
        <div className="cursor-pointer py-4">
          {/* <AccordionTrigger className="align-center underline-none cursor-pointer items-center px-2 text-left font-semibold hover:bg-(--card-background)"> */}
          <AccordionTrigger
            className={`align-center underline-none cursor-pointer items-center px-2 text-left font-semibold ${hoverClassName}`}
          >
            <p className="font-bold">{items.question}</p>
          </AccordionTrigger>
        </div>

        <AccordionContent className="px-2 pb-6">
          <p>{items.answer}</p>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default FaqItem;
