import Image from "next/image";

const IconGrid = ({ title, items = [], withBackground = false }) => {
  const hasLinks = items.some((item) => item.href);
  const colsClass = hasLinks ? "xl:grid-cols-3" : "xl:grid-cols-4";

  return (
    <section
      className={`relative col-[full] grid scroll-mt-32 grid-cols-subgrid py-20 md:py-27 ${withBackground ? "bg-(--background-alternate)" : ""} `}
      id="praktisk"
    >
      {withBackground && (
        <Image
          src="/assets/backgroundIllu.svg"
          alt="Background illustration"
          fill
          className="absolute inset-0 object-cover opacity-5 brightness-50"
        />
      )}
      <div className="relative col-[content] flex flex-col gap-12 md:gap-20">
        <h3 className="font-semibold">{title}</h3>
        <div className={`grid grid-cols-1 gap-13 md:grid-cols-2 ${colsClass}`}>
          {items.map((item, i) =>
            item.href ? (
              <a
                key={i}
                href={item.href}
                target={item.target}
                rel={item.rel}
                className="flex flex-col gap-4 rounded-[20px] p-6 transition-colors duration-200 hover:bg-(--card-background)"
              >
                {item.icon}
                <h5 className="font-medium">{item.undertitle}</h5>
                <p>{item.beskrivelse}</p>
              </a>
            ) : (
              <div key={i} className="flex flex-col gap-4 rounded-[20px] p-6">
                {item.icon}
                <h5 className="font-medium">{item.undertitle}</h5>
                <p>{item.beskrivelse}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default IconGrid;
