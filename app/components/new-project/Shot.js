// components/Shot.js
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Shot = ({ shot, index }) => {
  return (
    <Draggable draggableId={shot.id} index={index}>
      {(provided) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="shot"
          >
            <img src={shot.imageDataUrl} alt={shot.description} />
            <p>{shot.description}</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Shot;
