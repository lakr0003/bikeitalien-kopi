"use client";
import Button from "@/app/components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitBesked } from "../action/action";

const ContactForm = () => {
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("comment", data.comment);

    const result = await submitBesked(formData);

    if (result.success) {
      setServerSuccess(true);
      reset();
    } else {
      setServerError(result.error);
    }
  };

  return (
    <>
      <section className="col-[content] grid">
        <div className="grid gap-20 py-20 md:grid-cols-2 md:py-27">
          <div>
            <h3 className="pb-4 font-semibold">Kontaktformular</h3>
            <p>
              Har du spørgsmål, feedback eller ønsker du at høre mere, er du
              meget velkommen til at skrive via formularen. Jeg laver også
              skræddersyede cykelferier for klubber, virksomheder og
              vennegrupper, hvor rute, niveau og indhold tilpasses jeres ønsker.
              Kontakt mig gerne, så finder vi ud af det sammen.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              {/* {isSubmitSuccessful && (
                <div className="text-md rounded-[20px] border border-green-500/30 bg-green-500/10 px-2 py-3 text-green-400">
                  Din besked er blevet sendt.
                </div>
              )} */}

              {serverError && (
                <div className="rounded-[20px] border border-red-500/30 bg-red-500/10 px-3 py-3 text-red-400">
                  {serverError}
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="pb-2 text-(--text-primary)">Fornavn</p>
                  <input
                    type="text"
                    placeholder="Fornavn"
                    {...register("name", {
                      required: "Fornavn er påkrævet",
                      minLength: {
                        value: 2,
                        message: "Fornavn skal være mindst 2 tegn",
                      },
                      maxLength: {
                        value: 50,
                        message: "Fornavn må ikke overstige 50 tegn",
                      },
                      pattern: {
                        value: /^[a-zA-ZæøåÆØÅ\s-]+$/,
                        message:
                          "Fornavn kan kun indeholde bogstaver og mellemrum",
                      },
                    })}
                    className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3"
                  />
                  {errors.name && (
                    <span className="mt-1 text-sm text-red-400">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <p className="pb-2 text-(--text-primary)">Efternavn</p>
                  <input
                    type="text"
                    placeholder="Efternavn"
                    {...register("lastname", {
                      required: "Efternavn er påkrævet",
                      minLength: {
                        value: 2,
                        message: "Efternavn skal være mindst 2 tegn",
                      },
                      maxLength: {
                        value: 50,
                        message: "Efternavn må ikke overstige 50 tegn",
                      },
                      pattern: {
                        value: /^[a-zA-ZæøåÆØÅ\s-]+$/,
                        message:
                          "Efternavn kan kun indeholde bogstaver og mellemrum",
                      },
                    })}
                    className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3"
                  />
                  {errors.lastname && (
                    <span className="mt-1 text-sm text-red-400">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="pb-2 text-(--text-primary)">Din email</p>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email er påkrævet",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: "Ugyldig email adresse",
                    },
                  })}
                  className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3"
                />
                {errors.email && (
                  <span className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid">
                <p className="pb-2 text-(--text-primary)">Din forespørgsel</p>
                <textarea
                  placeholder="Din Besked"
                  {...register("comment", {
                    required: "Besked er påkrævet",
                    minLength: {
                      value: 2,
                      message: "Besked skal være mindst 2 tegn",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Besked må ikke overstige 1000 tegn",
                    },
                  })}
                  className="w-full rounded-[20px] border border-(--grey-200) bg-(--card-background) px-4 py-3 pb-30"
                />
                {errors.comment && (
                  <span className="mt-1 text-sm text-red-400">
                    {errors.comment.message}
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                {serverSuccess && (
                  <p className="text-green-700!">Din besked er blevet sendt.</p>
                )}
                <Button type="submit" variant="primary" className="ml-auto w-fit">
                  {isSubmitting ? "Sender..." : "Send besked"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
