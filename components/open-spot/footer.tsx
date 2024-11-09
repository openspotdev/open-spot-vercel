"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/languageContext";

export default function Footer() {
  const { texts } = useLanguage();
  return (
    <footer className="flex justify-between items-center w-full py-6 bg-gray-100 px-4 md:px-16">
      <p className="text-xs text-gray-500">{texts.footer.footerRights}</p>
      {/* <nav className="flex gap-4">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          {texts.footer.termsOfService}
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          {texts.footer.privacyPolicy}
        </Link>
      </nav> */}
    </footer>
  );
}
