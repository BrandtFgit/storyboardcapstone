// components/SceneContainer.js
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Scene from './Scene';

const SceneContainer = ({ scenes, setScenes }) => {
  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'scene') {
      // Reorder scenes
      const reorderedScenes = Array.from(scenes);
      const [movedScene] = reorderedScenes.splice(source.index, 1);
      reorderedScenes.splice(destination.index, 0, movedScene);
      setScenes(reorderedScenes);
    } else if (type === 'shot') {
      if (source.droppableId === destination.droppableId) {
        // Reorder shots within the same scene
        const sceneIndex = scenes.findIndex(scene => scene.id === source.droppableId);
        const scene = scenes[sceneIndex];
        const reorderedShots = Array.from(scene.shots);
        const [movedShot] = reorderedShots.splice(source.index, 1);
        reorderedShots.splice(destination.index, 0, movedShot);
        const newScenes = [...scenes];
        newScenes[sceneIndex] = { ...scene, shots: reorderedShots };
        setScenes(newScenes);
      } else {
        // Move shots between scenes
        const sourceSceneIndex = scenes.findIndex(scene => scene.id === source.droppableId);
        const destinationSceneIndex = scenes.findIndex(scene => scene.id === destination.droppableId);
        const sourceScene = scenes[sourceSceneIndex];
        const destinationScene = scenes[destinationSceneIndex];
        const sourceShots = Array.from(sourceScene.shots);
        const destinationShots = Array.from(destinationScene.shots);
        const [movedShot] = sourceShots.splice(source.index, 1);
        destinationShots.splice(destination.index, 0, movedShot);
        const newScenes = [...scenes];
        newScenes[sourceSceneIndex] = { ...sourceScene, shots: sourceShots };
        newScenes[destinationSceneIndex] = { ...destinationScene, shots: destinationShots };
        setScenes(newScenes);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sceneContainer" direction="horizontal" type="scene">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="scene-container">
            {scenes.map((scene, index) => (
              <Scene key={scene.id} scene={scene} index={index} setScenes={setScenes} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SceneContainer;
