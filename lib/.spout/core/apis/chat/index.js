"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatdata_1 = require("./chatdata");
const clone = (obj) => JSON.parse(JSON.stringify(obj));
class ChatAPI {
    constructor() { }
    translateBare(message, exclude = ['l']) {
        let components = [];
        const defaults = {
            modifiers: [],
            state: 'modified',
            text: ''
        };
        let nextModifier = false;
        let current = clone(defaults);
        for (const char of message) {
            if (nextModifier) {
                if (char === '&') {
                    components[components.length - 1].text += '&';
                    continue;
                }
                if (char === 'l') {
                    components.push(current);
                    current = clone(components[components.length - 2]);
                    current.text = '';
                }
                nextModifier = false;
                current.modifiers.push(char);
                continue;
            }
            switch (char) {
                case '&':
                    if (current.state === 'modified') {
                        components.push(current);
                        current = {
                            ...clone(defaults),
                            state: 'modifying'
                        };
                    }
                    nextModifier = true;
                    break;
                default:
                    if (current.state === 'modifying' && !(exclude.includes(char))) {
                        current.state = 'modified';
                    }
                    current.text += char;
            }
        }
        if (current.text) {
            components.push(current);
        }
        return components;
    }
    convertComponents(components) {
        let finalOutput = [];
        for (const component of components) {
            let modifiers = [];
            let color = null;
            for (const modifier of component.modifiers) {
                if (chatdata_1.formats[modifier])
                    modifiers.push(chatdata_1.formats[modifier]);
                if (chatdata_1.colors[modifier])
                    color = chatdata_1.colors[modifier];
            }
            const props = {};
            const names = ['italic', 'strikethrough', 'underlined', 'obsufucated', "bold"];
            for (const name of names) {
                props[name] = modifiers.includes(name);
            }
            finalOutput.push({
                text: component.text,
                color: color,
                ...props
            });
        }
        return finalOutput;
    }
    translateComponents(message) {
        return this.convertComponents(this.translateBare(message))
            .map(i => {
            if (i.color == null) {
                i.color = 'r';
            }
            return i;
        });
    }
    translate(message) {
        let text = '';
        let extra = this.translateComponents(message);
        return {
            translate: text,
            extra
        };
    }
}
exports.default = ChatAPI;
