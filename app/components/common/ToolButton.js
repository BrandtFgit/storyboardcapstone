"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ToolButton({
  src,
  alt,
  onClick,
  width = 50,
  height = 30,
  hoverSrc = null,
  isHoverable = false,
  onDropItem, // Function to handle dropped items
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    isHoverable && setIsHovered(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    isHoverable && setIsHovered(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    if (onDropItem) {
      onDropItem(e);
    }
  };

  return (
    <button
      onClick={onClick}
      className="tool-button"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Image
        src={isHovered && hoverSrc ? hoverSrc : src}
        alt={alt}
        width={width}
        height={height}
      />
    </button>
  );
}
