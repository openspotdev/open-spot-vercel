"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/languageContext";

export default function Footer() {
  const { texts } = useLanguage();
  return (
    <footer className="w-full py-6 bg-gray-100">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-gray-500">{texts.footerRights}</p>
          <nav className="flex gap-4">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              {texts.termsOfService}
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              {texts.privacyPolicy}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
