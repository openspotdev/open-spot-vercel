"use client";

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center space-x-2"
      onClick={() => router.back()}
    >
      <span className="icon-[circle-flags--olympics] w-12 h-12"></span>
      <span className="font-bold">Volver</span>
    </button>
  );
}
