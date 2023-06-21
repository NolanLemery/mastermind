import State from "./State"
import Peg from "../components/Peg"

export default class Series {
    first; // color || empty
    second; // color || empty
    third; // color || empty
    fourth; // color || empty
    interactable; // bool

    constructor(interactable=false, first=State.Empty, 
        second=State.Empty, third=State.Empty, fourth=State.Empty) {
        this.interactable = interactable;
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
    }

    isInteractable() {
        return this.interactable
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

    /*
    changePeg(slotNum, color) {
        switch (slotNum) {
            case 1:
                this.first = color
                break;
            case 2:
                this.second = color
                break;
            case 3:
                this.third = color
                break;
            default:
                this.fourth = color
        }
    }

    doNothing(slotNum, color) {
        
    }
    

    makePeg(slot, slotNum) {
        return <Peg color={slot}
        selected={false}
        clickPeg={() => console.log("clicked peg")}
        empty={slot === State.Empty}
        slotNum={slotNum}/>
    }

    createPegs() {
        let pegArr = []
        pegArr.push(this.makePeg(this.first, 1))
        pegArr.push(this.makePeg(this.second, 2))
        pegArr.push(this.makePeg(this.third, 3))
        pegArr.push(this.makePeg(this.fourth, 4))
        return pegArr
    }
    */
}