import React from "react"
import Code from "./Code"
import Feedback from "./Feedback"

export default function Row(props) {

    return (
        <div className="row">
            <Feedback hint={props.hint}/>
            <Code series={props.series} 
            updateRowsFirst={props.updateRowsFirst}
            updateRowsSecond={props.updateRowsSecond}
            updateRowsThird={props.updateRowsThird}
            updateRowsFourth={props.updateRowsFourth}/>
        </div>
    )
}