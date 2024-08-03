import { useRef, useEffect, useState} from 'react';
import Scene from "./Scene";
import "./SceneContainer.css";
import '../../globals.css';
import Tools from "../common/Tools";

const SceneContainer = ({ scenes, setScenes, setIsDrawingMode }) => {
  
  // FREE SCROLL CANVAS
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });
  const scrollPosition = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseDown = (e) => {
      if (e.button === 2) { // Right-click
        e.preventDefault(); // Prevent the context menu from appearing
        isDragging.current = true;
        startPosition.current = { x: e.clientX, y: e.clientY };
        scrollPosition.current = { x: translate.x, y: translate.y };
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPosition.current.x;
        const dy = e.clientY - startPosition.current.y;
        setTranslate({ x: scrollPosition.current.x + dx, y: scrollPosition.current.y + dy });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      setScale((prevScale) => {
        const newScale = prevScale - e.deltaY * 0.001; // Adjust the zoom sensitivity here
        const clampedScale = Math.min(Math.max(newScale, 0.1), 4); // Adjust limits as needed

        // Calculate the translate adjustment to zoom in on the mouse position
        const rect = container.getBoundingClientRect();
        const offsetX = (mouseX - rect.left - translate.x) / prevScale;
        const offsetY = (mouseY - rect.top - translate.y) / prevScale;
        const newTranslateX = mouseX - rect.left - offsetX * clampedScale;
        const newTranslateY = mouseY - rect.top - offsetY * clampedScale;

        setTranslate({ x: newTranslateX, y: newTranslateY });

        return clampedScale;
      });
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('wheel', handleWheel);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [translate]);



  // Scene stuff
  const [draggedSceneIndex, setDraggedSceneIndex] = useState(null);
  const [draggedShot, setDraggedShot] = useState(null);

  const onDragStartScene = (e, index) => {
    if (!draggedShot) {
      setDraggedSceneIndex(index);
      console.log("Dragging scene:", index);
    }
  };

  const onDropScene = (e, index) => {
    if (draggedSceneIndex !== null && !draggedShot) {
      const updatedScenes = [...scenes];
      const [draggedScene] = updatedScenes.splice(draggedSceneIndex, 1);
      updatedScenes.splice(index, 0, draggedScene);
      setScenes(updatedScenes);
      setDraggedSceneIndex(null);
      console.log("Dropped scene:", index);
    }
  };

  const onDragOverScene = (e) => {
    e.preventDefault();
  };

  const onDragStartShot = (e, shotIndex, sceneIndex) => {
    setDraggedShot({ shotIndex, sceneIndex });
    console.log("Dragging shot:", shotIndex, "from scene:", sceneIndex);
  };

  const onDropShot = (e, shotIndex, sceneIndex) => {
    if (!draggedShot) return;

    const updatedScenes = [...scenes];
    const { shotIndex: fromShotIndex, sceneIndex: fromSceneIndex } = draggedShot;

    if (fromSceneIndex === sceneIndex) {
      const shots = updatedScenes[sceneIndex].shots;
      const [draggedShotItem] = shots.splice(fromShotIndex, 1);
      shots.splice(shotIndex, 0, draggedShotItem);
    } else {
      const fromShots = updatedScenes[fromSceneIndex].shots;
      const toShots = updatedScenes[sceneIndex].shots;
      const [draggedShotItem] = fromShots.splice(fromShotIndex, 1);
      toShots.splice(shotIndex, 0, draggedShotItem);
    }

    setScenes(updatedScenes);
    setDraggedShot(null);
    console.log("Dropped shot:", shotIndex, "to scene:", sceneIndex);
  };

  const onShotDropToDifferentScene = (e, toSceneIndex) => {
    if (!draggedShot) return;

    const updatedScenes = [...scenes];
    const { shotIndex, sceneIndex: fromSceneIndex } = draggedShot;
    const fromShots = updatedScenes[fromSceneIndex].shots;
    const toShots = updatedScenes[toSceneIndex].shots;
    const [draggedShotItem] = fromShots.splice(shotIndex, 1);
    toShots.push(draggedShotItem);

    setScenes(updatedScenes);
    setDraggedShot(null);
    console.log("Moved shot:", shotIndex, "to different scene:", toSceneIndex);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '90vh',
        overflow: 'hidden',
        cursor: isDragging.current ? 'grabbing' : 'default',
        top: '7%', // Adjust this value based on your toolbar height
        left: '4%',
        position: 'relative',
      }}
      onContextMenu={(e) => e.preventDefault()} // Prevent default context menu
    >
      <div
       ref={contentRef}
       className="grid-background" // Apply the grid background
       style={{
         transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
         transformOrigin: '0 0',
         width: '1000px', // Initial large width
         height: '1000px', // Initial large height
         position: 'relative',
       }}
      >
        <div className="scene-container">
          {scenes.map((scene, index) => (
            <Scene
              key={scene.id}
              scene={scene}
              scenes={scenes}
              setScenes={setScenes}
              index={index}
              onDragStartScene={onDragStartScene}
              onDragOverScene={onDragOverScene}
              onDropScene={onDropScene}
              onDragStartShot={onDragStartShot}
              onDragOverShot={(e) => e.preventDefault()}
              onDropShot={onDropShot}
              onShotDropToDifferentScene={onShotDropToDifferentScene}
              isDraggingShot={!!draggedShot}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SceneContainer;
