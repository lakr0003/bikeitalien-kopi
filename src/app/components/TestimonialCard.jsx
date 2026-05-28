import { RiDoubleQuotesL } from "react-icons/ri";

export default function TestimonialCard({ testimonial, bgColor }) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-[20px] p-3 md:p-4 ${bgColor}`}
    >
      <RiDoubleQuotesL size={50} />

      <p className="mb-2 text-base md:text-lg">
        {testimonial.beskrivelse}
      </p>

      <div>
        <p className="font-semibold">{testimonial.navn}</p>
        <p>{testimonial.by}</p>
      </div>
    </div>
  );
}
