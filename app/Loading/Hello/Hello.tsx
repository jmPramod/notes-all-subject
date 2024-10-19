import { ChangeWords } from "@/components/ui/change-words";
import React from "react";
export function Hello() {
  const words = [
    "Hello",
    "Bonjour!",
    "नमस्कार",
    "¡Hola!",
    "你好",
    "こんにちは",
    "سلام",
  ];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <ChangeWords words={words} duration={200} /> <br />
    </div>
  );
}
