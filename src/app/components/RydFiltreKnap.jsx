"use client";
import { useRouter } from "next/navigation";

export default function RydFiltreKnap({ harAktiveFiltre }) {
  const router = useRouter();

  if (!harAktiveFiltre) return null;

  return (
    <button
      onClick={() => router.push("/rejser")}
      style={{ fontSize: "var(--tag-size)", color: "var(--grey-300)" }}
      className="hover:underline"
    >
      Ryd filtre
    </button>
  );
}
