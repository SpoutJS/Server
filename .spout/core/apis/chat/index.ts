import { allcodes, colors, formats } from "./chatdata";

const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

interface Component {
    modifiers: string[];
    state: 'base' | 'modifying' | 'modified';
    text: string;
}

export default class ChatAPI {
    constructor() {}
    translateBare(message: string) {
        let components: Component[] = [];
        const defaults: Component = {
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
                    if (current.state === 'modifying') {
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
    convertComponents(components: Component[]) {
        let finalOutput = [];
        for (const component of components) {
            let modifiers = [];
            let color = null;
            for (const modifier of component.modifiers) {
                if (formats[modifier]) modifiers.push(formats[modifier]);
                if (colors[modifier]) color = colors[modifier];
            }
            const props: { [ prop: string ]: boolean } = {};
            const names = [ 'italic', 'strikethrough', 'underlined', 'obsufucated', "bold" ];
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
    translate(message: string) {
        return this.convertComponents(this.translateBare(message));
    }
}
