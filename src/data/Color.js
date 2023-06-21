// Color enum
export default class Color {
    static Red = new Color("red")
    static Yellow = new Color("yellow")
    static Green = new Color("green")
    static Blue = new Color("blue")
    static Pink = new Color("pink")
    static White = new Color("white")

    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name
    }
}