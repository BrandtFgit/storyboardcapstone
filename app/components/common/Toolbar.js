"use client";
import React from "react";
import ToolButton from "./ToolButton";
import Tools from "../common/Tools";

export default function Toolbar() {
  var tools = Tools.getTools();
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
