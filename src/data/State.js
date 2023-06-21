// State enum
export default class State {
    static Empty = new State("empty")

    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}