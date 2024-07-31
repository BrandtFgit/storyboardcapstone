"use client";
import React, { useState, useEffect} from "react";
import ToolButton from "./ToolButton";
import Tools from "../common/Tools";

export default function Toolbar() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    // Initial fetch of tools
    setTools(Tools.getTools());

    const handleUpdate = (updatedTools) => {
      setTools(updatedTools);
    };
     // Subscribe to the Tools instance updates
     Tools.on('update', handleUpdate);

     // Cleanup function to unsubscribe from the Tools instance updates
     return () => {
       Tools.off('update', handleUpdate);
     };
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
