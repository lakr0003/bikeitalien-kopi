"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { IoIosCheckmark, IoIosArrowDown, IoIosClose } from "react-icons/io";

// --- Statiske filterdata ---

const KATEGORIER = [
  {
    value: "Cykelturisme",
    label: "Cykelturisme",
    description: "Ruter langs smukke landskaber og kulturelle seværdigheder.",
  },
  {
    value: "Eventyrrejse",
    label: "Eventyrrejse",
    description: "Rejser for dem der søger noget ekstraordinært.",
  },
  {
    value: "Familieferie",
    label: "Familieferie",
    description:
      "Familievenlige ruter med aktiviteter for alle familiens medlemmer (+9 år).",
  },
  {
    value: "Mountainbike",
    label: "Mountainbike",
    description: "Tekniske spor og off-road ruter i kuperet terræn.",
  },
  {
    value: "Gravel",
    label: "Gravel",
    description: "Grusveje og blandede underlag for .",
  },
  {
    value: "Landevej",
    label: "Landevej",
    description: "Klassiske landevejsruter for raceryckelentusiaster.",
  },
];

const NIVEAUER = [
  {
    value: "Let",
    label: "Let",
    description:
      "Flade ruter med god infrastruktur og korte dagsetaper. Perfekt til begyndere eller hyggelige ture i roligt tempo.",
  },
  {
    value: "Middel",
    label: "Middel",
    description:
      "Varierende terræn med nogle bakker og længere distancer. Kræver en rimelig grundform og lidt erfaring.",
  },
  {
    value: "Krævende",
    label: "Krævende",
    description:
      "Lange etaper, stejle stigninger og udfordrende underlag. For erfarne cyklister med god udholdenhed og styrke.",
  },
];

const LOKATION_BESKRIVELSER = {
  Italien:
    "Ruter i Norditalien, ved Gardasøen, Dolomitterne, Trentino, Apulien og Rom.",
  Spanien: "Cykling på Gran Canaria med sol og varieret terræn.",
  Asien: "Eventyrrejser i Jordan, Nepal, Vietnam og Cambodia.",
};

const MAANED_NAVNE = {
  1: "Januar",
  2: "Februar",
  3: "Marts",
  4: "April",
  5: "Maj",
  6: "Juni",
  7: "Juli",
  8: "August",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "December",
};

// --- Checkbox: viser flueben når et filterpunkt er valgt ---
function Checkbox({ checked }) {
  return (
    <div
      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
        checked
          ? "border-(--button-dark) bg-(--button-dark)"
          : "border-(--grey-200)"
      }`}
    >
      {checked && (
        <IoIosCheckmark size={14} color="var(--background-primary)" />
      )}
    </div>
  );
}

// --- DropdownFilter: enkelt filter-knap med liste af valgmuligheder ---
function DropdownFilter({
  label,
  options,
  activeValues,
  onToggle,
  onClear,
  isOpen,
  onToggleDropdown,
  narrow = false,
}) {
  const count = activeValues.length;
  const wrapperRef = useRef(null);

  // Delt indhold til begge dropdown-versioner
  const dropdownItems = (
    <>
      {options.map((opt) => {
        const checked = activeValues.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className="flex w-full items-start gap-4 px-6 py-3 text-left first:pt-6 last:pb-6 hover:bg-(--card-background)"
          >
            <div className="mt-0.5 shrink-0">
              <Checkbox checked={checked} />
            </div>
            <div>
              <p className="text-sm font-semibold">{opt.label}</p>
              {opt.description && (
                <p
                  className="mt-0.5 leading-snug font-normal text-(--grey-400)"
                  style={{ fontSize: "var(--tag-size)" }}
                >
                  {opt.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
      {count > 0 && (
        <button
          onClick={onClear}
          className="size-var(--p-size) flex w-full items-center gap-1.5 border-t border-(--grey-100) px-6 py-3 text-left text-(--grey-400) hover:bg-(--card-background)"
        >
          <IoIosClose size={22} />
          Ryd filtre
        </button>
      )}
    </>
  );

  return (
    // md:relative: på mobil er filter-containeren positioning-parent; på desktop er det denne wrapper
    <div ref={wrapperRef} className="md:relative">
      <button
        onClick={onToggleDropdown}
        className={`relative flex items-center gap-2 rounded-[20px] border px-4 py-2 transition-colors hover:bg-(--card-background) ${count > 0 ? "border-(--button-dark) bg-(--card-background)" : "border-(--grey-200)"}`}
      >
        <span className="font-semibold" style={{ fontSize: "var(--p-size)" }}>
          {label}
        </span>
        <IoIosArrowDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
        {count > 0 && (
          <span className="absolute -top-3 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-(--button-dark) text-sm text-[var(--text-secondary)]">
            {count}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Mobil: spænder over fuld container-bredde og placeres under netop denne knap */}
          <div
            className="absolute right-0 left-0 z-50 md:hidden"
            style={{
              top: wrapperRef.current
                ? wrapperRef.current.offsetTop + wrapperRef.current.offsetHeight
                : undefined,
            }}
          >
            <div className="mt-2 overflow-hidden rounded-[20px] border border-(--grey-200) bg-(--background-primary) shadow-lg">
              {dropdownItems}
            </div>
          </div>

          {/* Desktop: placeres under denne knap med passende minimumsbredde */}
          <div className="absolute top-full left-0 z-50 hidden md:block">
            <div
              className={`mt-2 overflow-hidden rounded-[20px] border border-(--grey-200) bg-(--background-primary) shadow-lg ${narrow ? "md:min-w-48" : "md:min-w-120"}`}
            >
              {dropdownItems}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- FilterDropdowns: samler alle filtre, håndterer URL-state og lukker dropdown når cursor forlader ---
export default function FilterDropdowns({
  aktivFiltre,
  lokationer,
  maaneder,
  varigheder,
}) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Bygger URL-params ud fra alle aktive filtre og navigerer til /rejser
  // Filtre med tomme arrays udelades, så URL'en holdes ren
  const pushParams = (filtre) => {
    const params = new URLSearchParams();
    Object.entries(filtre).forEach(([key, values]) => {
      if (values?.length) params.set(key, values.join(","));
    });
    const qs = params.toString();
    router.push(`/rejser${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  // Tilføjer eller fjerner en enkelt værdi fra et filter og opdaterer URL
  const toggleOption = (filterKey, value) => {
    const current = aktivFiltre[filterKey] ?? [];
    const next = current.includes(value)
      ? current.filter((val) => val !== value)
      : [...current, value];
    pushParams({ ...aktivFiltre, [filterKey]: next });
  };

  // Nulstiller ét filter ved at sende et tomt array for den pågældende nøgle
  const clearFilter = (filterKey) =>
    pushParams({ ...aktivFiltre, [filterKey]: [] });

  const dropdowns = [
    {
      name: "kategori",
      label: "Kategori",
      options: KATEGORIER,
    },
    {
      name: "land",
      label: "Lokation",
      options: lokationer.map((l) => ({
        value: l,
        label: l,
        description: LOKATION_BESKRIVELSER[l],
      })),
    },
    {
      name: "maaned",
      label: "Måned",
      narrow: true,
      options: maaneder.map((m) => ({
        value: m.num,
        label: MAANED_NAVNE[m.num] ?? m.num,
      })),
    },
    {
      name: "sværhedsgrad",
      label: "Sværhedsgrad",
      options: NIVEAUER,
    },
    {
      name: "varighed",
      label: "Varighed",
      narrow: true,
      options: varigheder.map((d) => ({
        value: String(d),
        label: `${d} dage`,
      })),
    },
  ];

  return (
    <>
      {/* Mobil: lukker dropdown ved tryk udenfor (overlay under dropdown) */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpenDropdown(null)}
        />
      )}
      <div
        onPointerLeave={(e) =>
          e.pointerType !== "touch" && setOpenDropdown(null)
        }
        className="relative z-50 flex flex-wrap gap-4"
      >
        {dropdowns.map((d) => (
          <DropdownFilter
            key={d.name}
            name={d.name}
            label={d.label}
            options={d.options}
            activeValues={aktivFiltre[d.name] ?? []}
            onToggle={(value) => toggleOption(d.name, value)}
            onClear={() => clearFilter(d.name)}
            isOpen={openDropdown === d.name}
            narrow={d.narrow ?? false}
            onToggleDropdown={() =>
              setOpenDropdown(openDropdown === d.name ? null : d.name)
            }
          />
        ))}

        {Object.values(aktivFiltre).some((v) => v.length > 0) && (
          <button
            onClick={() => router.push("/rejser")}
            className="flex items-center gap-1.5 self-center rounded-[20px] px-4 py-2 text-(--grey-400) transition-colors hover:bg-(--card-background)"
          >
            <IoIosClose size={22} />
            Ryd filtre
          </button>
        )}
      </div>
    </>
  );
}
