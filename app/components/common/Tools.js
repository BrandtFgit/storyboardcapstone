"use client";

class Tools {
    constructor() {
        if (Tools.instance) {
            return Tools.instance;
        }

        this.tools = [];
    }

    setTools(newTools){
        this.tools = newTools
    }

    clearTools(){
        this.tools = [];
    }

    getTools(){
        return this.tools;
    }

    addTool(newTool){
        this.tools.push(newTool)
    }
}

const instance = new Tools();

export default instance;
