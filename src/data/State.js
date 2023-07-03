// State enum
export default class State {
    static Empty = new State("empty")
    static Win = new State("win")
    static Lose = new State("lose")

    constructor(name) {
        this.name = name
    }

    getName() {
        return this.name
    }
}