"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitBooking } from "./action";
import Button from "@/app/components/Button";

function getGemt(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

const LANDEKODER = [
  { kode: "+45", flag: "🇩🇰", navn: "Danmark" },
  { kode: "+47", flag: "🇳🇴", navn: "Norge" },
  { kode: "+46", flag: "🇸🇪", navn: "Sverige" },
  { kode: "+39", flag: "🇮🇹", navn: "Italien" },
];

function LandekodeVaelger({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = LANDEKODER.find((l) => l.kode === value) || LANDEKODER[0];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1 rounded-[20px] border border-(--grey-200) bg-(--card-background) px-3 py-3 whitespace-nowrap outline-none"
        style={{ fontSize: "var(--p-size)" }}
      >
        {selected.flag} {selected.kode}
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 overflow-hidden rounded-[12px] border border-(--grey-200) bg-(--card-background) shadow-md">
          {LANDEKODER.map((l) => (
            <button
              key={l.kode}
              type="button"
              onMouseDown={() => {
                onChange(l.kode);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left whitespace-nowrap hover:bg-(--card-background)"
              style={{ fontSize: "var(--p-size)" }}
            >
              {l.flag} {l.navn} ({l.kode})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const TELEFON_REGLER = {
  "+45": {
    cifre: 8,
    placeholder: "12 34 56 78",
    besked: "Dansk telefonnummer skal have 8 cifre",
    format: [2, 2, 2, 2],
  },
  "+47": {
    cifre: 8,
    placeholder: "12 34 56 78",
    besked: "Norsk telefonnummer skal have 8 cifre",
    format: [2, 2, 2, 2],
  },
  "+46": {
    cifre: 9,
    placeholder: "12 345 67 89",
    besked: "Svensk telefonnummer skal have 9 cifre",
    format: [2, 3, 2, 2],
  },
  "+39": {
    cifre: 10,
    placeholder: "123 456 7891",
    besked: "Italiensk telefonnummer skal have 10 cifre",
    format: [3, 3, 4],
  },
};

function formaterTelefon(value, kode) {
  const digits = value.replace(/\D/g, "");
  const regel = TELEFON_REGLER[kode];
  if (!regel?.format) return digits;
  let result = "";
  let pos = 0;
  for (const group of regel.format) {
    if (pos >= digits.length) break;
    if (result) result += " ";
    result += digits.slice(pos, pos + group);
    pos += group;
  }
  return result;
}

// Hvilke felter der skal valideres på hvert trin
const STEP_FIELDS = {
  1: ["navn", "email"],
  2: ["pasnummer", "pasUdloeb", "foedselsdag"],
  3: ["cykelstorrelse", "egenCykel"],
  4: [
    "kontaktNavn",
    "kontaktEmail",
    "kontaktTelefon",
    "kontaktVej",
    "kontaktPostnummer",
    "kontaktBy",
  ],
  5: [],
};

function StepIndicator({ current, onStepClick }) {
  return (
    <div className="flex w-full items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const num = i + 1;
        const active = num <= current;
        const clickable = num < current;
        return (
          <div key={num} className="contents">
            <button
              type="button"
              onClick={() => clickable && onStepClick(num)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                active
                  ? "bg-(--accent) text-(--text-primary)"
                  : "border border-(--grey-200) text-(--grey-300)"
              } ${clickable ? "cursor-pointer" : "cursor-default"}`}
            >
              {num}
            </button>
            {num < 5 && <div className="h-px flex-1 bg-(--grey-200)" />}
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="grid gap-1.5">
      <label style={{ fontSize: "var(--p-size)" }}>{label}</label>
      {children}
      {error && (
        <p className="text-red-500!" style={{ fontSize: "var(--tag-size)" }}>
          {error.message}
        </p>
      )}
    </div>
  );
}

export default function BookingForm({ rejse }) {
  const [step, setStep] = useState(() => getGemt("bookingStep", 1));
  const [serverError, setServerError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: getGemt("bookingData", {
      telefonLandekode: "+45",
      kontaktTelefonLandekode: "+45",
    }),
  });

  const changeStep = (n) => {
    localStorage.setItem("bookingStep", JSON.stringify(n));
    setStep(n);
  };

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) {
      localStorage.setItem("bookingData", JSON.stringify(getValues()));
      changeStep(step + 1);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries({ ...data, rejseId: rejse?.id ?? "" }).forEach(
      ([key, val]) => {
        formData.append(key, val ?? "");
      },
    );
    const result = await submitBooking(formData);
    if (result.error) {
      setServerError(result.error);
      return;
    }
    localStorage.removeItem("bookingData");
    localStorage.removeItem("bookingStep");
    router.push("/booking/betaling");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <StepIndicator current={step} onStepClick={changeStep} />

      <div className="grid gap-2">
        <h3 className="font-bold">Tilmeld dig rejsen</h3>
        <p style={{ color: "var(--grey-400)" }}>
          Følg formularens trin, udfyld felterne, så kontakter vi dig hurtigst
          muligt
        </p>
      </div>

      {/* Trin 1: Personlig info */}
      {step === 1 && (
        <div className="grid gap-6">
          <Field label="Fulde navn (som i pas)" error={errors.navn}>
            <input
              type="text"
              placeholder="Skriv her..."
              {...register("navn", {
                required: "Navn er påkrævet",
                minLength: {
                  value: 2,
                  message: "Navn skal være mindst 2 tegn",
                },
                pattern: {
                  value: /^[a-zA-ZæøåÆØÅ\s\-]+$/,
                  message: "Navn må kun indeholde bogstaver",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 capitalize transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field label="E-mail" error={errors.email}>
            <input
              type="email"
              placeholder="Skriv her..."
              {...register("email", {
                required: "E-mail er påkrævet",
                pattern: {
                  value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                  message: "Indtast en gyldig e-mailadresse",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field label="Telefonnummer *valgfri" error={errors.telefon}>
            <div className="flex gap-2">
              <LandekodeVaelger
                value={watch("telefonLandekode")}
                onChange={(kode) => {
                  setValue("telefonLandekode", kode);
                  setValue("telefon", "");
                }}
              />
              <input
                type="tel"
                placeholder={
                  TELEFON_REGLER[watch("telefonLandekode")]?.placeholder ??
                  "12 34 56 78"
                }
                {...(() => {
                  const { onChange, ...rest } = register("telefon", {
                    pattern: {
                      value: /^[\d\s]+$/,
                      message: "Kun tal er tilladt",
                    },
                    validate: (val) => {
                      if (!val) return true;
                      const kode = watch("telefonLandekode") || "+45";
                      const regel = TELEFON_REGLER[kode];
                      if (!regel) return true;
                      return (
                        val.replace(/\s/g, "").length === regel.cifre ||
                        regel.besked
                      );
                    },
                  });
                  return {
                    ...rest,
                    onChange: (e) => {
                      e.target.value = formaterTelefon(
                        e.target.value,
                        watch("telefonLandekode"),
                      );
                      onChange(e);
                    },
                  };
                })()}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
                style={{ fontSize: "var(--p-size)" }}
              />
            </div>
          </Field>
        </div>
      )}

      {/* Trin 2: Pas */}
      {step === 2 && (
        <div className="grid gap-6">
          <Field label="Pasnummer" error={errors.pasnummer}>
            <input
              type="text"
              placeholder="AB1234567"
              {...register("pasnummer", {
                required: "Pasnummer er påkrævet",
                pattern: {
                  value: /^[A-Z0-9]{6,9}$/i,
                  message: "Pasnummer skal være 6–9 bogstaver og/eller tal",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 uppercase transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field label="Udløbsdato af pas" error={errors.pasUdloeb}>
            <input
              type="text"
              placeholder="dd/mm/åååå"
              {...register("pasUdloeb", {
                required: "Udløbsdato er påkrævet",
                pattern: {
                  value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                  message: "Datoen skal skrives som dd/mm/åååå",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field label="Fødselsdag" error={errors.foedselsdag}>
            <input
              type="text"
              placeholder="dd/mm/åååå"
              {...register("foedselsdag", {
                required: "Fødselsdag er påkrævet",
                pattern: {
                  value: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                  message: "Datoen skal skrives som dd/mm/åååå",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
        </div>
      )}

      {/* Trin 3: Cykel */}
      {step === 3 && (
        <div className="grid gap-6">
          <Field label="Medbringer du din egen cykel?" error={errors.egenCykel}>
            <div className="grid gap-3">
              {[
                { value: "ja", label: "Ja, jeg har min egen" },
                {
                  value: "nej",
                  label: "Nej, jeg vil gerne låne en cykel",
                },
                {
                  value: "nej-e-cykel",
                  label: "Nej, jeg vil gerne låne en E-cykel (+1600-2000 kr)",
                },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    {...register("egenCykel", { required: "Vælg en mulighed" })}
                    className="h-4 w-4 accent-(--button-dark)"
                  />
                  <span style={{ fontSize: "var(--p-size)" }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </Field>
          {["nej", "nej-e-cykel"].includes(watch("egenCykel")) && (
            <Field
              label="Cykelstørrelse (evt højde i cm)"
              error={errors.cykelstorrelse}
            >
              <input
                type="text"
                placeholder="s/m/l/xl/xxl eller højde i cm"
                {...register("cykelstorrelse", {
                  validate: (val) => {
                    if (getValues("egenCykel") === "ja") return true;
                    return val ? true : "Cykelstørrelse er påkrævet";
                  },
                })}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
                style={{ fontSize: "var(--p-size)" }}
              />
            </Field>
          )}
        </div>
      )}

      {/* Trin 4: Nødkontakt */}
      {step === 4 && (
        <div className="grid gap-6">
          <Field label="Navn på kontaktperson" error={errors.kontaktNavn}>
            <input
              type="text"
              placeholder="Fulde navn..."
              {...register("kontaktNavn", {
                required: "Kontaktnavn er påkrævet",
                minLength: {
                  value: 2,
                  message: "Navn skal være mindst 2 tegn",
                },
                pattern: {
                  value: /^[a-zA-ZæøåÆØÅ\s\-]+$/,
                  message: "Navn må kun indeholde bogstaver",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 capitalize transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field label="Din kontaktpersons e-mail" error={errors.kontaktEmail}>
            <input
              type="email"
              placeholder="eksempel@gmail.com"
              {...register("kontaktEmail", {
                required: "Kontakt e-mail er påkrævet",
                pattern: {
                  value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
                  message: "Indtast en gyldig e-mailadresse",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <Field
            label="Din kontaktpersons telefonnummer"
            error={errors.kontaktTelefon}
          >
            <div className="flex gap-2">
              <LandekodeVaelger
                value={watch("kontaktTelefonLandekode")}
                onChange={(kode) => {
                  setValue("kontaktTelefonLandekode", kode);
                  setValue("kontaktTelefon", "");
                }}
              />
              <input
                type="tel"
                placeholder={
                  TELEFON_REGLER[watch("kontaktTelefonLandekode")]
                    ?.placeholder ?? "12 34 56 78"
                }
                {...(() => {
                  const { onChange, ...rest } = register("kontaktTelefon", {
                    required: "Kontakt telefonnummer er påkrævet",
                    pattern: {
                      value: /^[\d\s]+$/,
                      message: "Kun tal er tilladt",
                    },
                    validate: (val) => {
                      if (!val) return true;
                      const kode = watch("kontaktTelefonLandekode") || "+45";
                      const regel = TELEFON_REGLER[kode];
                      if (!regel) return true;
                      return (
                        val.replace(/\s/g, "").length === regel.cifre ||
                        regel.besked
                      );
                    },
                  });
                  return {
                    ...rest,
                    onChange: (e) => {
                      e.target.value = formaterTelefon(
                        e.target.value,
                        watch("kontaktTelefonLandekode"),
                      );
                      onChange(e);
                    },
                  };
                })()}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
                style={{ fontSize: "var(--p-size)" }}
              />
            </div>
          </Field>
          <Field label="Vejnavn og nummer" error={errors.kontaktVej}>
            <input
              type="text"
              placeholder="Gadenavn 12"
              {...register("kontaktVej", {
                required: "Vejnavn og nummer er påkrævet",
                pattern: {
                  value: /^.+\d+.*$/,
                  message: "Husk at inkludere husnummeret",
                },
              })}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 capitalize transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Postnummer" error={errors.kontaktPostnummer}>
              <input
                type="text"
                placeholder="1200"
                {...register("kontaktPostnummer", {
                  required: "Postnummer er påkrævet",
                  pattern: {
                    value: /^[\d\s]{4,6}$/,
                    message: "Postnummer skal være 4-5 cifre",
                  },
                })}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
                style={{ fontSize: "var(--p-size)" }}
              />
            </Field>
            <Field label="By" error={errors.kontaktBy}>
              <input
                type="text"
                placeholder="By"
                {...register("kontaktBy", {
                  required: "By er påkrævet",
                })}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 capitalize transition-colors outline-none focus:border-(--button-dark)"
                style={{ fontSize: "var(--p-size)" }}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Trin 5: Bemærkninger */}
      {step === 5 && (
        <div className="grid gap-6">
          <Field
            label="Har du en bemærkning, noget vi skal vide?"
            error={errors.bemaerkning}
          >
            <textarea
              {...register("bemaerkning")}
              placeholder="Skriv her..."
              rows={6}
              className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 transition-colors outline-none focus:border-(--button-dark)"
              style={{ fontSize: "var(--p-size)" }}
            />
          </Field>
        </div>
      )}

      {serverError && (
        <p className="text-red-500!" style={{ fontSize: "var(--tag-size)" }}>
          {serverError}
        </p>
      )}

      <div className="mt-5 flex justify-between gap-8">
        {step > 1 && (
          <Button
            variant="secondary"
            type="button"
            onClick={() => changeStep(step - 1)}
            className="flex-1"
            icon={false}
          >
            Forrige
          </Button>
        )}
        {step < 5 ? (
          <Button
            key="next"
            variant="primary"
            type="button"
            onClick={next}
            className="flex-1"
            icon={false}
          >
            Næste
          </Button>
        ) : (
          <Button
            key="submit"
            variant="primary"
            type="submit"
            className="flex-1"
          >
            Gå til betaling
          </Button>
        )}
      </div>
    </form>
  );
}
