"use client";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
// This code was made with the guidance of the following repository: https://github.com/imarjunshrma/DragnDropNextApp
export const DndContext = ({ children, onDragEnd }) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
