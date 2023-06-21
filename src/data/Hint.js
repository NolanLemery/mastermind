import State from "./State"

export default class Hint {
    series; // Series
    triggered; // bool
    first;
    second;
    third;
    fourth;

    constructor(series, triggered=false, first=State.Empty, 
        second=State.Empty, third=State.Empty, fourth=State.Empty) {
            this.series = series;
            this.triggered = triggered;
            this.first = first;
            this.second = second;
            this.third = third;
            this.fourth = fourth;
        }
}