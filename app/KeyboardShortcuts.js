class KeyboardShortcuts {
    constructor() {
        if (KeyboardShortcuts.instance) {
            return KeyboardShortcuts.instance;
        }

        this.shortcuts = {};
        this.handleKeyDown = this.handleKeyDown.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);

        KeyboardShortcuts.instance = this;
    }

    handleKeyDown(event) {
        const keyCombination = this.getKeyCombination(event);
        if (this.shortcuts[keyCombination]) {
            event.preventDefault();
            this.shortcuts[keyCombination].forEach(callback => callback());
        }
    }

    getKeyCombination(event) {
        let keys = [];
        if (event.ctrlKey) keys.push('Ctrl');
        if (event.altKey) keys.push('Alt');
        if (event.shiftKey) keys.push('Shift');
        keys.push(event.key);
        return keys.join('+');
    }

    addShortcut(keys, callback) {
        const keyCombination = keys.join('+');
        if (!this.shortcuts[keyCombination]) {
            this.shortcuts[keyCombination] = [];
        }
        this.shortcuts[keyCombination].push(callback);
    }

    removeShortcut(keys, callback) {
        const keyCombination = keys.join('+');
        if (this.shortcuts[keyCombination]) {
            this.shortcuts[keyCombination] = this.shortcuts[keyCombination].filter(cb => cb !== callback);
            if (this.shortcuts[keyCombination].length === 0) {
                delete this.shortcuts[keyCombination];
            }
        }
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
        this.shortcuts = {};
    }
}

const instance = new KeyboardShortcuts();
Object.freeze(instance);

export default instance;