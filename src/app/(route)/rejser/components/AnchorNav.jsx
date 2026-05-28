"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import LinkButton from "@/app/components/LinkButton";

const links = [
  { label: "Overblik", href: "overblik" },
  { label: "Dagsplan", href: "dagsplan" },
  { label: "Oplevelser", href: "oplevelser" },
  { label: "Praktisk info", href: "praktisk" },
  { label: "Anmeldelser", href: "anmeldelser" },
  { label: "Galleri", href: "galleri" },
  { label: "FAQ", href: "faq" },
];

const AnchorNav = ({ rejseId }) => {
  const [active, setActive] = useState("overview");
  const buttonRefs = useRef({});
  const scrollTimer = useRef(null);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      buttonRefs.current[active]?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    }, 180);
  }, [active]);

  const handleClick = (href) => {
    setActive(href);

    document.getElementById(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-0 z-60 col-[full] grid grid-cols-subgrid border-b border-[var(--grey-100)] bg-[var(--background-primary)] py-0">
      <div className="col-[content] flex justify-between gap-6 overflow-x-auto">
        {links.map((link) => {
          const isActive = active === link.href;
          return (
            <button
              key={link.href}
              ref={(el) => (buttonRefs.current[link.href] = el)}
              onClick={() => handleClick(link.href)}
              className={`relative cursor-pointer text-[16px] font-medium whitespace-nowrap transition-colors md:px-4 md:text-[16px] ${
                isActive
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--grey-300)] hover:text-[var(--text-primary)]"
              }`}
            >
              {link.label}

              {isActive && (
                <motion.span
                  layoutId="activeAnchorUnderline"
                  className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[var(--text-primary)]"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              )}
            </button>
          );
        })}
        <div className="pt-2 pb-2 whitespace-nowrap">
          <LinkButton href={`/booking?id=${rejseId}`}>Book nu</LinkButton>
        </div>
      </div>
    </nav>
  );
};

export default AnchorNav;
