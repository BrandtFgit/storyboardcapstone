// components/Shot.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Shot = ({ shot, index }) => {
  return (
    <Draggable draggableId={shot.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="shot"
        >
          <img src={shot.imageDataUrl} alt={shot.description} />
          <p>{shot.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Shot;
