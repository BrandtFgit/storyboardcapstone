class KeyboardShortcuts {
    constructor() {
        if (KeyboardShortcuts.instance) {
            return KeyboardShortcuts.instance;
        }

        this.shortcuts = {};
        this.handleKeyDown = this.handleKeyDown.bind(this);

        if (typeof window !== "undefined") {
            window.addEventListener('keydown', this.handleKeyDown);
        }

        KeyboardShortcuts.instance = this;
    }

    handleKeyDown(event) {
        // Check if the event is occurring in a text input field or textarea
        const target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            return; // Ignore shortcuts if focus is on text input fields
        }

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

    // Remove listeners for keybinds
    destroy() {
        if (typeof window !== "undefined") {
            window.removeEventListener('keydown', this.handleKeyDown);
        }
        this.shortcuts = {};
    }
}

// Create a singleton of this instance and return it.
const instance = new KeyboardShortcuts();
Object.freeze(instance);

export default instance;
