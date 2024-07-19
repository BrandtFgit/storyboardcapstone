// components/SceneContainer.js
import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Scene from "./Scene";
import { DndContext } from "@/app/context/DndContext";

const SceneContainer = ({ scenes, setScenes }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(scenes))]; //shallow copy concept
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setScenes([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(scenes))]; //shallow copy concept
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setScenes([...newData]);
    }
  };
  // const onDragEnd = (result) => {
  //   const { source, destination, type } = result;
  //   if (!destination) return;

  //   if (type === 'scene') {
  //     // Reorder scenes
  //     const reorderedScenes = Array.from(scenes);
  //     const [movedScene] = reorderedScenes.splice(source.index, 1);
  //     reorderedScenes.splice(destination.index, 0, movedScene);
  //     setScenes(reorderedScenes);
  //   } else if (type === 'shot') {
  //     if (source.droppableId === destination.droppableId) {
  //       // Reorder shots within the same scene
  //       const sceneIndex = scenes.findIndex(scene => scene.id === source.droppableId);
  //       const scene = scenes[sceneIndex];
  //       const reorderedShots = Array.from(scene.shots);
  //       const [movedShot] = reorderedShots.splice(source.index, 1);
  //       reorderedShots.splice(destination.index, 0, movedShot);
  //       const newScenes = [...scenes];
  //       newScenes[sceneIndex] = { ...scene, shots: reorderedShots };
  //       setScenes(newScenes);
  //     } else {
  //       // Move shots between scenes
  //       const sourceSceneIndex = scenes.findIndex(scene => scene.id === source.droppableId);
  //       const destinationSceneIndex = scenes.findIndex(scene => scene.id === destination.droppableId);
  //       const sourceScene = scenes[sourceSceneIndex];
  //       const destinationScene = scenes[destinationSceneIndex];
  //       const sourceShots = Array.from(sourceScene.shots);
  //       const destinationShots = Array.from(destinationScene.shots);
  //       const [movedShot] = sourceShots.splice(source.index, 1);
  //       destinationShots.splice(destination.index, 0, movedShot);
  //       const newScenes = [...scenes];
  //       newScenes[sourceSceneIndex] = { ...sourceScene, shots: sourceShots };
  //       newScenes[destinationSceneIndex] = { ...destinationScene, shots: destinationShots };
  //       setScenes(newScenes);
  //     }
  //   }

  return (
    <DndContext onDragEnd={onDragEnd}>
      {scenes.map((scene, index) => {
        // <Droppable key={index} droppableId={`droppable${index}`}>
        //   {(provided) => (
        //     <div
        //       className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
        //       {...provided.droppableProps}
        //       ref={provided.innerRef}
        //     >
        //       <h2 className="text-center font-bold mb-6 text-black">
        //         {scene.title}
        //       </h2>
        //       {scene.components?.map((component, index) => (
        //         <Draggable
        //           key={component.id}
        //           draggableId={component.id.toString()}
        //           index={index}
        //         >
        //           {(provided) => (
        //             <div
        //               className="bg-gray-200 mx-1 px-4 py-3 my-3"
        //               {...provided.dragHandleProps}
        //               {...provided.draggableProps}
        //               ref={provided.innerRef}
        //             >
        //               {component.name}
        //             </div>
        //           )}
        //         </Draggable>
        //       ))}
        //       {provided.placeholder}
        //     </div>
        //   )}
        // </Droppable>;
      })}
      <Droppable
        droppableId="sceneContainer"
        direction="horizontal"
        type="scene"
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="scene-container"
          >
            {scenes.map((scene, index) => (
              <Scene
                key={scene.id}
                scene={scene}
                index={index}
                setScenes={setScenes}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DndContext>
  );
};
export default SceneContainer;
