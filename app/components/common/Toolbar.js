"use client";
import React, { useState, useEffect} from "react";
import ToolButton from "./ToolButton";
import Tools from "../common/Tools";

export default function Toolbar() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchedTools = Tools.getTools();
    setTools(fetchedTools);
  }, []);
  
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
