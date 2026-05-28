import LinkButton from "@/app/components/LinkButton";

const BookingCard = ({ rejse }) => {
  return (
    <div className="grid min-w-[320px] gap-7 rounded-[20px] border border-(--grey-100) bg-(--card-background) p-6 md:w-full">
      <div className="flex gap-2">
        <h6>{rejse.pris} kr.</h6>
        <p>inkl. fly</p>
      </div>

      <div>
        <p>{rejse.land}</p>
        <h6 className="font-semibold">{rejse.titel}</h6>
      </div>

      <h6>{rejse.dato}</h6>

      <LinkButton href={`/booking?id=${rejse.id}`}>Book rejsen nu</LinkButton>
    </div>
  );
};

export default BookingCard;
