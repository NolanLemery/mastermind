import State from "./State"

export default class Hint {
    series; // Series
    first; // Color.Red || Color.White || Empty
    second; // Color.Red || Color.White || Empty
    third; // Color.Red || Color.White || Empty
    fourth; // Color.Red || Color.White || Empty

    constructor(series, first=State.Empty, second=State.Empty, 
        third=State.Empty, fourth=State.Empty) {
            this.series = series;
            this.first = first;
            this.second = second;
            this.third = third;
            this.fourth = fourth;
        }

    getSeries() {
        return this.series
    }

    getFirst() {
        return this.first
    }

    getSecond() {
        return this.second
    }

    getThird() {
        return this.third
    }

    getFourth() {
        return this.fourth
    }

    setFirst(color) {
        this.first = color
    }

    setSecond(color) {
        this.second = color
    }

    setThird(color) {
        this.third = color
    }

    setFourth(color) {
        this.fourth = color
    }

    getSlot(num) {
        switch (num) {
            case 1:
                return this.getFirst()
            case 2:
                return this.getSecond()
            case 3:
                return this.getThird()
            default:
                return this.getFourth()
        }
    }

    setSlot(num, color) {
        switch (num) {
            case 1:
                this.setFirst(color)
                break;
            case 2:
                this.setSecond(color)
                break;
            case 3:
                this.setThird(color)
                break;
            default:
                this.setFourth(color)
        }
    }

}