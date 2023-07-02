import React from "react"
import Pin from "./Pin"
import State from "../data/State"

export default function Feedback(props) {

    function makePin(slot) {
        return <Pin color={slot} empty={slot === State.Empty} />
    }

    function createPins() {
        let pinArr = []
        pinArr.push(makePin(props.hint.getFirst()))
        pinArr.push(makePin(props.hint.getSecond()))
        pinArr.push(makePin(props.hint.getThird()))
        pinArr.push(makePin(props.hint.getFourth()))
        return pinArr
    }

    return (
        <div className="feedback">
            {createPins()}
        </div>
    )
}