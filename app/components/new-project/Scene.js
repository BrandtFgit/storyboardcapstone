// components/Scene.js
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Shot from './Shot';

const Scene = ({ scene, index, setScenes }) => {
  return (
    <Draggable draggableId={scene.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="scene"
        >
          <h3>{scene.title}</h3>
          <Droppable droppableId={scene.id} type="shot">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {scene.shots.map((shot, index) => (
                  <Shot key={shot.id} shot={shot} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Scene;
