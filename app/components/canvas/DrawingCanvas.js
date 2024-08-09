"use client";
import React, { useEffect, useRef, useState } from "react";
import "./DrawingCanvas.css";
import KeyboardShortcuts from "../common/KeyboardShortcuts";
import Tools from "../common/Tools";

const DrawingCanvas = ({ onSaveDrawing }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isSprayMode, setIsSprayMode] = useState(false);
  const [strokeSize, setStrokeSize] = useState(6);
  const [strokeColor, setStrokeColor] = useState("#000000"); // Default color is black
  const [interactionDescription, setInteractionDescription] = useState("");
  const [spraySize, setSpraySize] = useState(10); // Adjust the default value as needed
  const [sprayDensity, setSprayDensity] = useState(5); // Number of particles per spray

  const colorPixel = (pos, targetColor, data) => {
    data[pos] = targetColor.r; // Red
    data[pos + 1] = targetColor.g; // Green
    data[pos + 2] = targetColor.b; // Blue
    data[pos + 3] = targetColor.a; // Alpha (transparency)
  };

  const matchStartColor = (pos, startColor, data) => {
    const r = data[pos];
    const g = data[pos + 1];
    const b = data[pos + 2];
    const a = data[pos + 3];

    const tolerance = 10; // Adjust this value as needed

    return (
      Math.abs(r - startColor.r) <= tolerance &&
      Math.abs(g - startColor.g) <= tolerance &&
      Math.abs(b - startColor.b) <= tolerance &&
      Math.abs(a - startColor.a) <= tolerance
    );
  };

  const startSpray = (event) => {
    saveState();
    const offsetX =
      event.offsetX !== undefined ? event.offsetX : event.nativeEvent.offsetX;
    const offsetY =
      event.offsetY !== undefined ? event.offsetY : event.nativeEvent.offsetY;
    sprayPaint(offsetX, offsetY);
    setIsDrawing(true); // Set drawing state to true for continuous spray
  };

  const setToFill = () => {
    const handleFill = (event) => {
      saveState(); // Save state before filling

      const offsetX =
        event.offsetX !== undefined ? event.offsetX : event.nativeEvent.offsetX;
      const offsetY =
        event.offsetY !== undefined ? event.offsetY : event.nativeEvent.offsetY;

      floodFill(offsetX, offsetY, strokeColor);

      // Reset to drawing mode after fill
      canvasRef.current.removeEventListener("mousedown", handleFill);
      setToDraw(); // This ensures the drawing mode is re-enabled
    };

    canvasRef.current.removeEventListener("mousedown", startDraw);
    canvasRef.current.addEventListener("mousedown", handleFill);
  };

  const sprayPaint = (x, y) => {
    if (!isSprayMode) return;
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const width = canvas.width;
    const height = canvas.height;

    for (let i = 0; i < sprayDensity; i++) {
      // Randomize position within the spray size radius
      const offsetX = Math.random() * spraySize - spraySize / 2;
      const offsetY = Math.random() * spraySize - spraySize / 2;

      // Ensure the spray is within the canvas bounds
      const newX = Math.min(Math.max(x + offsetX, 0), width - 1);
      const newY = Math.min(Math.max(y + offsetY, 0), height - 1);

      // Draw a small dot
      context.beginPath();
      context.arc(newX, newY, 1, 0, Math.PI * 2);
      context.fillStyle = strokeColor;
      context.fill();
    }
  };

  const setToSpray = () => {
    setIsSprayMode(true);
    contextRef.current.globalCompositeOperation = "source-over";
    canvasRef.current.removeEventListener("mousedown", startDraw);
    canvasRef.current.addEventListener("mousedown", startSpray);
    canvasRef.current.removeEventListener("mouseup", stopDraw);
    canvasRef.current.addEventListener("mouseup", stopDraw);
    canvasRef.current.removeEventListener("mouseleave", stopDraw);
    canvasRef.current.addEventListener("mouseleave", stopDraw);
  };

  // SET TOOLS FOR DRAWING CANVAS.
  Tools.setTools([
    {
      src: "/tool_icons/penciltool.png",
      alt: "brush",
      onClick: () => {
        setToDraw();
        console.log("Brush clicked");
      },
    },
    {
      src: "/tool_icons/eraser.png",
      alt: "eraser",
      onClick: () => {
        setToErase();
        console.log("Eraser clicked");
      },
    },
    {
      src: "/tool_icons/fillbucket.png", // Add icon for the paint bucket
      alt: "paintbucket",
      onClick: () => {
        setToFill();
        console.log("Paint Bucket clicked");
      },
    },
    {
      src: "/tool_icons/spraypaint.png", // Add icon for spray paint
      alt: "spraypaint",
      onClick: () => {
        setToSpray();
        console.log("Spray Paint clicked");
      },
    },
    {
      src: "/tool_icons/undo.png",
      alt: "undo",
      onClick: () => {
        undo();
      },
    },
    {
      src: "/tool_icons/redo.png",
      alt: "redo",
      onClick: () => {
        redo();
      },
    },
    {
      src: "/tool_icons/save.png",
      alt: "save",
      onClick: () => {
        saveImageToLocal();
        console.log("Save clicked");
      },
    },
    // { // Add back button to return to scenes
    //   src: "/tool_icons/back.ico",
    //   alt: "back",
    //   onClick: () => setMode("SCENES"),
    // },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;

    // Set initial background color to white
    context.fillStyle = "#FFFFFF"; // White color
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.lineCap = "round";
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeSize;
    contextRef.current = context;

    // Keyboard Shortcuts
    KeyboardShortcuts.addShortcut(["Ctrl", "z"], undo);
    KeyboardShortcuts.addShortcut(["Ctrl", "y"], redo);

    // Cleanup Shortcuts
    return () => {
      KeyboardShortcuts.removeShortcut(["Ctrl", "z"], undo);
      KeyboardShortcuts.removeShortcut(["Ctrl", "y"], redo);
    };
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = strokeSize;
      contextRef.current.strokeStyle = strokeColor;
    }
  }, [strokeSize, strokeColor]);

  const saveState = () => {
    const canvas = canvasRef.current;
    const currentDataUrl = canvas.toDataURL();

    // Check if the new state is different from the last state
    if (
      undoStack.current.length === 0 ||
      undoStack.current[undoStack.current.length - 1] !== currentDataUrl
    ) {
      undoStack.current.push(currentDataUrl);
    }

    // Clear the redo stack after saving a new state
    redoStack.current = [];
  };

  const restoreState = (stack, oppositeStack) => {
    if (stack.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Save current state to the opposite stack
    oppositeStack.push(canvas.toDataURL());

    // Load and apply the previous state from the stack
    const image = new Image();
    image.src = stack.pop();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };
  };

  const startDraw = (event) => {
    saveState();
    const offsetX =
      event.offsetX !== undefined ? event.offsetX : event.nativeEvent.offsetX;
    const offsetY =
      event.offsetY !== undefined ? event.offsetY : event.nativeEvent.offsetY;

    if (isSprayMode) {
      sprayPaint(offsetX, offsetY);
      setIsDrawing(true);
    } else {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
    }

    event.preventDefault();
  };

  const draw = (event) => {
    const offsetX =
      event.offsetX !== undefined ? event.offsetX : event.nativeEvent.offsetX;
    const offsetY =
      event.offsetY !== undefined ? event.offsetY : event.nativeEvent.offsetY;

    if (isSprayMode && isDrawing) {
      sprayPaint(offsetX, offsetY);
    } else if (isDrawing) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
    event.preventDefault();
  };

  const stopDraw = (event) => {
    if (!isSprayMode) {
      contextRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const stopSpray = (event) => {
    setIsSprayMode(false);
    canvasRef.current.removeEventListener("mousedown", startSpray);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
    setStrokeColor("#000000");
    stopSpray();
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "source-over";
    setStrokeColor("#FFFFFF");
    setIsSprayMode(false);
  };

  const handleStrokeSizeChange = (event) => {
    setStrokeSize(parseInt(event.target.value));
  };

  const handleColorChange = (event) => {
    setStrokeColor(event.target.value);
  };

  const handleInteractionDescriptionChange = (event) => {
    setInteractionDescription(event.target.value);
  };

  const clearCanvas = () => {
    saveState();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF"; // White color
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveImageToLocal = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    onSaveDrawing(image, interactionDescription);
  };

  const undo = () => {
    if (undoStack.current.length === 0) return;

    restoreState(undoStack.current, redoStack.current);
  };

  const redo = () => {
    if (redoStack.current.length === 0) return;

    restoreState(redoStack.current, undoStack.current);
  };

  const floodFill = (x, y, fillColor) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const width = canvas.width;
    const height = canvas.height;

    const imageData = context.getImageData(0, 0, width, height);
    const data = imageData.data;

    const startPos = (y * width + x) * 4;
    const startColor = {
      r: data[startPos],
      g: data[startPos + 1],
      b: data[startPos + 2],
      a: data[startPos + 3],
    };

    const targetColor = {
      r: parseInt(fillColor.substring(1, 3), 16),
      g: parseInt(fillColor.substring(3, 5), 16),
      b: parseInt(fillColor.substring(5, 7), 16),
      a: 255,
    };

    if (
      startColor.r === targetColor.r &&
      startColor.g === targetColor.g &&
      startColor.b === targetColor.b &&
      startColor.a === targetColor.a
    ) {
      return;
    }

    let pixelStack = [[x, y]];

    while (pixelStack.length) {
      let [newX, newY] = pixelStack.pop();
      let pos = (newY * width + newX) * 4;

      while (newY >= 0 && matchStartColor(pos, startColor, data)) {
        newY--;
        pos -= width * 4;
      }

      pos += width * 4;
      newY++;

      let reachLeft = false;
      let reachRight = false;

      while (newY < height && matchStartColor(pos, startColor, data)) {
        colorPixel(pos, targetColor, data);

        if (newX > 0) {
          if (matchStartColor(pos - 4, startColor, data)) {
            if (!reachLeft) {
              pixelStack.push([newX - 1, newY]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (newX < width - 1) {
          if (matchStartColor(pos + 4, startColor, data)) {
            if (!reachRight) {
              pixelStack.push([newX + 1, newY]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        newY++;
        pos += width * 4;
      }
    }

    context.putImageData(imageData, 0, 0);
  };

  return (
    <div className="shot-container">
      <div className="content-container">
        <canvas
          className="canvas-container"
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        ></canvas>
        <textarea
          className="interaction-textarea"
          value={interactionDescription}
          onChange={handleInteractionDescriptionChange}
          placeholder="Write what's happening in your scene..."
        />
      </div>
      <div className="content-container">
        <div className="controls">
          <div>
            <input
              type="range"
              min="1"
              max="20"
              value={strokeSize}
              onChange={handleStrokeSizeChange}
            />
            <span>Stroke Size: {strokeSize}</span>
          </div>
          <div>
            <input
              type="color"
              value={strokeColor}
              onChange={handleColorChange}
            />
            <span>Selected Color: {strokeColor}</span>
          </div>
          <div>
            <label>Spray Size:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={spraySize}
              onChange={(e) => setSpraySize(parseInt(e.target.value))}
            />
            <span>{spraySize}</span>
          </div>
          <div>
            <label>Spray Density:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={sprayDensity}
              onChange={(e) => setSprayDensity(parseInt(e.target.value))}
            />
            <span>{sprayDensity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
