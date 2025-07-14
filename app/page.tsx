"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AutoReposicao } from "@/components/sections/AutoReposicao";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";
import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import TestToolbar from "./test-toolbar";

/** Purpose: Main landing page integrating all sections and components */
export default function Home() {
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  // Exit-intent detection for lead magnet
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowLeadMagnet(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLeadMagnet(false);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      <Hero />
      <Benefits />
      <ProductCatalog />
      <Experience />
      <Testimonials />
      <HowItWorks />
      <AutoReposicao />
      <FAQ />

      <Footer />

      {/* Lead Magnet Form */}
      <LeadMagnetForm
        isOpen={showLeadMagnet}
        onClose={() => setShowLeadMagnet(false)}
      />

      {/* Debug Toolbar */}
      {process.env.NODE_ENV === "development" && <TestToolbar />}
    </main>
  );
}
