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

    getTools(){
        return this.tools;
    }
}

const instance = new Tools();

export default instance;
