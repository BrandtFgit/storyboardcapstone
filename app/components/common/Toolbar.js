"use client";
import React from "react";
import ToolButton from "./ToolButton";

export default function Toolbar({ tools }) {
  return (
    <div className="sidebar">
      {tools.map((tool, index) => (
        <ToolButton
          key={index}
          src={tool.src}
          alt={tool.alt}
          onClick={tool.onClick}
          width={tool.width}
          height={tool.height}
        />
      ))}
    </div>
  );
}
