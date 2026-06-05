import LinkButton from "@/app/components/LinkButton";

const BookingCard = ({ rejse }) => {
  return (
    <div className="grid min-w-80 gap-7 rounded-[20px] border border-(--grey-100) bg-(--card-background) p-6 md:min-w-100">
      <section className="flex flex-col justify-between gap-8">
        <div className="grid gap-2">
          <p className="font-medium">{rejse.land}</p>
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
        </div>
        <LinkButton href={`/booking?id=${rejse.id}`}>Book rejsen nu</LinkButton>
      </section>
    </div>
  );
};

export default BookingCard;
