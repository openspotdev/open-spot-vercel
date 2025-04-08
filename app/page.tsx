import Header from "@/components/open-spot/header";
import dynamic from "next/dynamic";

// Dynamically import client components with no SSR
const NearSpotsComponent = dynamic(
  () => import("@/components/open-spot/spots/near-spots"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="max-h-[100vh] grid grid-rows-[10vh_80vh]">
      <Header />
      <div className="flex flex-col min-w-2/3 mx-2 gap-4">
        <NearSpotsComponent />
      </div>
    </main>
  );
}
