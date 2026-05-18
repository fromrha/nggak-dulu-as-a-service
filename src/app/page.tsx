import { ApiDocs } from "@/components/ApiDocs";
import { Footer } from "@/components/Footer";
import { Generator } from "@/components/Generator";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_42%,#f5f5f4_100%)] text-stone-950">
      <Hero />
      <Generator />
      <ApiDocs />
      <Footer />
    </main>
  );
}
