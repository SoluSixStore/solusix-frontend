"use client";

import { DemoOne, DemoTwo, DemoThree, DemoFour } from "@/components/ui/magic-text-reveal-demo";

export default function MagicDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Magic Text Reveal
          </h1>
          <p className="text-xl text-gray-300">
            Interactive particle-based text animations
          </p>
        </div>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-white text-center">Default Demo</h2>
          <div className="flex justify-center">
            <DemoOne />
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-white text-center">SoluSix Branded</h2>
          <div className="flex justify-center">
            <DemoTwo />
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-white text-center">Large Magic Text</h2>
          <div className="flex justify-center">
            <DemoThree />
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-white text-center">Multiple Instances</h2>
          <DemoFour />
        </section>
      </div>
    </div>
  );
} 