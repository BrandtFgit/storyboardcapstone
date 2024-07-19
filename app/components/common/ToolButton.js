"use client";
import React from "react";
import Image from "next/image";

export default function ToolButton({ src, alt, onClick, width = 50, height = 30 }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>
      <Image src={src} alt={alt} width={width} height={height} />
    </button>
  );
}
