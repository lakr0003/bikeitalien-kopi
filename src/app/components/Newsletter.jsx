"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowForward } from "react-icons/io";
import { subscribeToNewsletter } from "@/app/actions/action";
import Button from "./Button";

const Newsletter = () => {
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("email", data.email);

    try {
      const result = await subscribeToNewsletter(formData);
      if (result.success) {
        setSuccess(true);
        reset();
      }
      if (result.error) setServerError(result.error);
    } catch (err) {
      setServerError("Noget gik galt. Prøv igen senere.");
    }
  };

  return (
    <div
      className="my-13 rounded-[20px] bg-(--accent) px-10 py-10 md:mt-16 md:py-16"
      style={{ gridColumn: "content" }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h4 className="text-center font-semibold">
          Mangler du inspiration til dit næste eventyr?
        </h4>
        <p className="max-w-160 text-center">
          Tilmeld dig nyhedsbrevet og lad os holde dig opdateret med nye
          eventyr, destinationer og ledige pladser direkte i din indbakke.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 md:max-w-140"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="grid w-full min-w-0 gap-1.5 md:flex-1">
              <input
                type="text"
                placeholder="Skriv din email"
                {...register("email", {
                  required: "Email er påkrævet",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: "Indtast en gyldig email-adresse",
                  },
                })}
                className="w-full rounded-[20px] border border-(--grey-200) bg-(--background-tertiary) px-4 py-3 [font-size:var(--p-size)] outline-none"
              />
              {errors.email && (
                <p
                  className="text-red-500!"
                  style={{ fontSize: "var(--tag-size)" }}
                >
                  {errors.email.message}
                </p>
              )}
              {serverError && (
                <p
                  className="text-red-500!"
                  style={{ fontSize: "var(--tag-size)" }}
                >
                  {serverError}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="primary"
              icon={IoIosArrowForward}
              disabled={isSubmitting}
              className="w-full md:w-auto md:self-start"
            >
              {isSubmitting ? "Tilmelder..." : "Tilmeld nu"}
            </Button>
          </div>
          {success && (
            <p className="max-w-160 text-center text-green-700!">
              Din tilmelding er bekræftet.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
