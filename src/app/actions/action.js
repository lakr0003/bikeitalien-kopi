"use server";

import { supabase } from "@/lib/supabase";

export async function subscribeToNewsletter(formData) {
  const email = formData.get("email");

  if (!email || !email.includes("@")) {
    return { error: "Ugyldig email-adresse" };
  }

  const { error } = await supabase.from("newsletter").insert([{ email }]);

  if (error) {
    if (error.code === "23505") {
      return { error: "Denne email er allerede tilmeldt" };
    }
    return { error: "Noget gik galt. Prøv igen senere." };
  }

  return { success: true };
}
