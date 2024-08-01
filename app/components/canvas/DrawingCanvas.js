// components/canvas/DrawingCanvas.js
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
  const [strokeSize, setStrokeSize] = useState(6);
  const [strokeColor, setStrokeColor] = useState("#000000"); // Default color is black
  const [interactionDescription, setInteractionDescription] = useState("");


  // SET TOOLS FOR DRAWING CANVAS.
  Tools.setTools(
    [
      {
        // BRUSH
        src: "/tool_icons/penciltool.png",
        alt: "brush",
        onClick: () => {
          setToDraw();
          console.log("Brush clicked")
        
        }
      },
      {
        // ERASER
        src: "/tool_icons/eraser.png",
        alt: "eraser",
        onClick: () =>{
          setToErase();
          console.log("Eraser clicked")
        },
      },
      {
        // UNDO
        src: "/tool_icons/undo.png",
        alt: "undo",
        onClick: () =>{ 
          undo();
        },
      },
      {
        // REDO
        src: "/tool_icons/redo.png",
        alt: "redo",
        onClick: () => {
          redo();
        },
      },
      {
        // SAVE
        src: "/tool_icons/save.png",
        alt: "save",
        onClick: () => {
          saveImageToLocal();
          console.log("Save clicked")
        },
      }
    ]
  );

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
    undoStack.current.push(canvas.toDataURL());
    if (redoStack.current.length > 0) {
      redoStack.current = [];
    }
  };

  const restoreState = (stack, oppositeStack) => {
    if (stack.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    oppositeStack.push(canvas.toDataURL());
    const image = new Image();
    image.src = stack.pop();
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };
  };

  const startDraw = ({ nativeEvent }) => {
    saveState();
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDraw = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "source-over";
    setStrokeColor("#FFFFFF");
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
    restoreState(undoStack.current, redoStack.current);
  };

  const redo = () => {
    restoreState(redoStack.current, undoStack.current);
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
            <button onClick={setToDraw}>Draw</button>
            <button onClick={setToErase}>Erase</button>
            <a onClick={saveImageToLocal}>Save Image</a>
            <button onClick={clearCanvas}>Clear Canvas</button>
            <button onClick={undo}>Undo</button>
            <button onClick={redo}>Redo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
