import Hint from "./Hint"

export default class Pair {
    series; // series
    hint; // hint

    constructor(series, hint=new Hint(series)) {
        this.series = series;
        this.hint = hint;
    }

    getSeries() {
        return this.series
    }

    getHint() {
        return this.hint
    }
}