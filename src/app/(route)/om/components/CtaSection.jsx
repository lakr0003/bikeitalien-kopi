import LinkButton from "@/app/components/LinkButton";
const CtaSection = () => {
  return (
    <>
      <section className="col-[full] grid grid-cols-subgrid bg-(--background-tertiary) py-20 text-center md:py-27">
        <div className="col-[content]">
          <h2 className="mb-6 font-bold">Er du klar til dit næste eventyr?</h2>
          <p className="mx-auto mb-6 font-semibold md:w-[65ch]">
            Oplev verden fra cykelsadlen og kom tættere på både naturen,
            kulturen og de skjulte perler undervejs. Hos Bikeitalien finder du
            nøje udvalgte cykelrejser for både motionister og livsnydere – klar
            til dit næste eventyr på to hjul.
          </p>
          <LinkButton
            href="/rejser"
            variant="primary"
            className="mx-auto mt-8 w-fit place-content-center"
          >
            Se alle cykelrejser
          </LinkButton>
        </div>
      </section>
    </>
  );
};

export default CtaSection;
