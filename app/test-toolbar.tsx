"use client";

import { useEffect } from "react";

export default function TestToolbar() {
  useEffect(() => {
    console.log("🔧 21st.dev Toolbar Debug:");
    console.log("- NODE_ENV:", process.env.NODE_ENV);
    console.log("- Window object:", typeof window !== "undefined");
    console.log("- Document object:", typeof document !== "undefined");

    // Check if toolbar elements are present
    setTimeout(() => {
      const toolbarElements = document.querySelectorAll("[data-21st-toolbar]");
      console.log("- Toolbar elements found:", toolbarElements.length);

      if (toolbarElements.length === 0) {
        console.log("❌ No toolbar elements found");
      } else {
        console.log("✅ Toolbar elements found:", toolbarElements);
      }
    }, 2000);
  }, []);

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded">
      <h2 className="text-lg font-bold mb-2">21st.dev Toolbar Test</h2>
      <p>Check browser console for debug information</p>
      <p>Current environment: {process.env.NODE_ENV}</p>
    </div>
  );
}
