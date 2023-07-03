import React from "react"
import State from "../data/State"
import Peg from "./Peg"

export default function Code(props) {

    function makePeg(slot, slotNum, updateFunc) {
        return <Peg color={slot}
        selected={false}
        clickPeg={updateFunc}
        empty={slot === State.Empty}
        slotNum={slotNum}/>
    }
    function createPegs() {
        let pegArr = []
        pegArr.push(makePeg(props.series.getFirst(), 1, props.updateRowsFirst))
        pegArr.push(makePeg(props.series.getSecond(), 2, props.updateRowsSecond))
        pegArr.push(makePeg(props.series.getThird(), 3, props.updateRowsThird))
        pegArr.push(makePeg(props.series.getFourth(), 4, props.updateRowsFourth))
        return pegArr
    }

    const solutionStyles = {
        marginLeft: 90,
        marginTop: 5
    }

    return (
        <div className="code" style={props.solution && solutionStyles}>
            {props.hidden ? <></> : createPegs()}
        </div>
    )
}