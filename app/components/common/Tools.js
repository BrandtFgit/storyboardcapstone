"use client";
import EventEmitter from 'events';


class Tools extends EventEmitter {
    constructor() {
        super();
        if (Tools.instance) {
            return Tools.instance;
        }

        this.tools = [];
        Tools.instance = this;
    }

    setTools(newTools){
        this.tools = newTools
        this.emit('update', this.tools); // Emit an update event
    }

    clearTools(){
        this.tools = [];
        this.emit('update', this.tools); // Emit an update event
    }

    getTools(){
        return this.tools;
    }

    addTool(newTool){
        this.tools.push(newTool)
        this.emit('update', this.tools); // Emit an update event
    }
}


const instance = new Tools();

export default instance;
