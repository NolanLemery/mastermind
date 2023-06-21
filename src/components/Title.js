import React from "react"
import hackerman from "../images/hackerman-emote.gif"

export default function Title() {
    return (
        <div className="title">
            <h1 className="title--name">Mastermind</h1>
            <img src={hackerman} alt="hackerman" className="title--hackerman"/>
        </div>
    )
}