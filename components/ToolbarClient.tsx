"use client";
import { TwentyFirstToolbar } from "@21st-extension/toolbar-next";
import { ReactPlugin } from "@21st-extension/react";

export default function ToolbarClient() {
  return <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />;
} 