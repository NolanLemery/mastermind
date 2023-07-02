import React from "react"

export default function Pin(props) {

    const coloredStyles = {
        backgroundColor: props.color.getName()
    }

    return (
        <div className="pin" style={props.empty ? {} : coloredStyles} />
    )
}