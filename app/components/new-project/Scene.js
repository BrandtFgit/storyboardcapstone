// components/Scene.js
import React from 'react';
import './Scene.css'; // Add your styles here

const Scene = ({ scene, index, onDragStart, onDragOver, onDrop }) => {
    return (
        <div
            className="scene"
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, index)}
        >
            <h3>{scene.title}</h3>
        </div>
    );
};

export default Scene;
