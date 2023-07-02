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

    function createButton() {
        return <button className="feedback--submit" onClick={props.submitGuess}>
            Submit
            </button>
    }

    const renderButton = props.hint.getSeries().isInteractable() 
    && props.hint.getSeries().getFirst() !== State.Empty
    && props.hint.getSeries().getSecond() !== State.Empty
    && props.hint.getSeries().getThird() !== State.Empty
    && props.hint.getSeries().getFourth() !== State.Empty;

    return (
        <div className="feedback">
            {renderButton ? createButton() : createPins()}
        </div>
    )
}