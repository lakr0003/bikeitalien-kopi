"use server";

// import { supabaseAdmin } from "@/lib/supabaseServer";
import { supabase } from "@/lib/supabase";

export const submitBesked = async (formData) => {
  try {
    const name = formData.get("name");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const comment = formData.get("comment");

    if (!name || name.length < 2) {
      return {
        success: false,
        error: "Ugyldigt fornavn",
      };
    }

    if (!lastname || lastname.length < 2) {
      return {
        success: false,
        error: "Ugyldigt efternavn",
      };
    }

    if (!email || !email.includes("@")) {
      return {
        success: false,
        error: "Ugyldig email",
      };
    }

    if (!comment || comment.length < 10) {
      return {
        success: false,
        error: "Beskeden er for kort",
      };
    }

    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          lastname,
          email,
          content: comment,
        },
      ])
      .select();

    if (error) {
      return {
        success: false,
        error: "Kunne ikke sende beskeden",
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: "Serverfejl. Prøv igen senere.",
    };
  }
};
