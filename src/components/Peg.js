import React from "react"

export default function Peg(props) {

    const pegColor = props.color.getName()
    const defaultStyles = {
        backgroundColor: pegColor,
        marginTop: 16,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    }
    const selectedStyles = {
        backgroundColor: pegColor,
        marginTop: 16,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 5
    }
    const emptyStyles = {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        marginLeft: 16,
        marginTop: 3
    }
    const filledStyles = {
        backgroundColor: pegColor,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
        marginLeft: 16,
        marginTop: 3
    }

    return (
        <div className="peg" onClick={props.clickPeg}>
            <span class="peg--dot" 
            style={props.empty ? emptyStyles : 
            (props.selected ? selectedStyles : 
            (props.slotNum !== undefined ? filledStyles : defaultStyles))}>
            </span>
        </div>
    )
}