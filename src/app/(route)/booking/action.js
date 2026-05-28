"use server";

import { supabase } from "@/lib/supabase";

export async function submitBooking(formData) {
  const rejseId = formData.get("rejseId") || null;
  const navn = formData.get("navn");
  const email = formData.get("email");
  const telefon = formData.get("telefon") || null;
  const pasnummer = formData.get("pasnummer");
  const pasUdloeb = formData.get("pasUdloeb");
  const foedselsdag = formData.get("foedselsdag");
  const cykelstorrelse = formData.get("cykelstorrelse");
  const egenCykel = formData.get("egenCykel");
  const kontaktNavn = formData.get("kontaktNavn");
  const kontaktEmail = formData.get("kontaktEmail");
  const kontaktTelefon = formData.get("kontaktTelefon");
  const kontaktAdresse = `${formData.get("kontaktVej")}, ${formData.get("kontaktPostnummer")} ${formData.get("kontaktBy")}`;
  const bemaerkning = formData.get("bemaerkning") || null;

  const { error } = await supabase.from("bookings").insert([
    {
      rejse_id: rejseId,
      navn,
      email,
      telefon,
      pasnummer,
      pas_udloeb: pasUdloeb,
      foedselsdag,
      cykelstorrelse,
      egen_cykel: egenCykel,
      kontakt_navn: kontaktNavn,
      kontakt_email: kontaktEmail,
      kontakt_telefon: kontaktTelefon,
      kontakt_adresse: kontaktAdresse,
      bemaerkning,
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
