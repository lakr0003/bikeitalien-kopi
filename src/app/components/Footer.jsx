"use client";
import Newsletter from "./Newsletter";
import Link from "./Link";
import NextLink from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="col-[full] grid grid-cols-subgrid rounded-t-[20px] bg-(--background-secondary)">
      <Newsletter />

      <div className="col-[content] mb-13 grid gap-10 text-(--text-secondary) lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex flex-col gap-10">
            <NextLink href="/" onClick={() => window.scrollTo(0, 0)}>
              <h5 className="text-(--text-secondary)!">
                <span className="font-semibold">Bike</span>
                <span className="font italic">Italien</span>
              </h5>
            </NextLink>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Adresse:</p>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Via+Umberto+I+24+37014+Castelnuovo+del+Garda"
                target="_blank"
                rel="noopener noreferrer"
                color="light"
                variant="small-external"
              >
                Via Umberto I, 24 T- 37014 Castelnuovo del Garda
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Kontakt:</p>
              <Link
                href="mailto:joachimjerichow@hotmail.com"
                color="light"
                variant="small"
              >
                joachimjerichow@hotmail.com
              </Link>
              <Link href="tel:+3939493672104" color="light" variant="small">
                +39-3493672104
              </Link>
            </div>
            <p className="">Copyright © 2026 bikeitalien</p>

            <div className="flex items-end gap-3">
              <a
                href="https://www.facebook.com/bikeitalien/?locale=da_DK"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Besøg BikeItalien på Facebook"
                className="text-(--text-secondary) transition-opacity hover:opacity-70"
              >
                <FaSquareFacebook size={21} />
              </a>
              <a
                href="https://www.instagram.com/joachimjerichow/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Besøg BikeItalien på Instagram"
                className="text-(--text-secondary) transition-opacity hover:opacity-70"
              >
                <BsInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <Link href="/rejser" color="light" variant="underline">
              Alle rejser
            </Link>
            {[
              "Cykelturisme",
              "Mountainbike",
              "Familieferier",
              "Landevej",
              "Eventyrrejser",
              "Gravel",
            ].map((item) => (
              <Link key={item} href="/rejser" color="light" variant="small">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/om" color="light" variant="underline">
              Om Bikelitalien
            </Link>
            <Link href="/kontakt" color="light" variant="underline">
              Kontakt
            </Link>
            <Link
              href="/rejsebestemmelser.pdf"
              color="light"
              variant="external"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              Rejsebestemelser
            </Link>
          </div>
        </div>
      </div>

      <div className="col-[content] flex justify-center gap-8 border-t border-(--text-secondary) pt-6 pb-13 text-(--text-secondary)">
        {["Privacy Policy", "Terms of Service", "Cookies Settings"].map(
          (item) => (
            <Link
              key={item}
              href="/"
              color="light"
              variant="small"
              className=""
            >
              {item}
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

export default Footer;
