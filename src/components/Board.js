import React from "react"
import Color from "../data/Color"
import Peg from "./Peg"
import Row from "./Row"
import Code from "./Code"
import Series from "../data/Series"
import Pair from "../data/Pair"
import Hint from "../data/Hint"

export default function Board() {

    const colorSet = [Color.Red, Color.Yellow, Color.Green, 
        Color.Blue, Color.Pink, Color.White]
    const [selectedColor, setSelectedColor] = React.useState(Color.Red);

    const [activeRowNum, setActiveRowNum] = React.useState(0)

    // change this to a for loop:
    const defaultCodes = [
        new Series(true),
        new Series(),
        new Series(),
        new Series(),
        new Series(),
        new Series(),
        new Series(),
        new Series(),
    ]
    const defaultRows = [
        new Pair(defaultCodes[0], new Hint(defaultCodes[0])),
        new Pair(defaultCodes[1], new Hint(defaultCodes[1])),
        new Pair(defaultCodes[2], new Hint(defaultCodes[2])),
        new Pair(defaultCodes[3], new Hint(defaultCodes[3])),
        new Pair(defaultCodes[4], new Hint(defaultCodes[4])),
        new Pair(defaultCodes[5], new Hint(defaultCodes[5])),
        new Pair(defaultCodes[6], new Hint(defaultCodes[6])),
        new Pair(defaultCodes[7], new Hint(defaultCodes[7])),
    ]
    const [rows, setRows] = React.useState(defaultRows)

    function makePeg(color) {
        return <Peg color={color} 
        selected={color === selectedColor}
        clickPeg={() => switchSelectedColor(color)}
        empty={false}/>
    }
    const pegSet = colorSet.map(makePeg)

    function switchSelectedColor(color) {
        setSelectedColor(color)
    }

    function makeRow(row) {
        return <Row series={row.getSeries()}
        hint={row.getHint()}
        updateRowsFirst={row.getSeries().isInteractable() ? (() => updateRows(1)) : (void(0))}
        updateRowsSecond={row.getSeries().isInteractable() ? (() => updateRows(2)) : (void(0))}
        updateRowsThird={row.getSeries().isInteractable() ? (() => updateRows(3)) : (void(0))}
        updateRowsFourth={row.getSeries().isInteractable() ? (() => updateRows(4)) : (void(0))}/>
    }
    const displayRows = rows.map(makeRow)

    function updateRows(slotNum) {
        const activeRow = rows[activeRowNum]
        const newSeries = new Series(true)
        for (let i = 1; i < 5; i++) {
            if (i === slotNum) {
                newSeries.setSlot(i, selectedColor)
            }
            else {
                newSeries.setSlot(i, activeRow.getSeries().getSlot(i))
            }
        }
        setRows(prevRows => prevRows.map((row) => {
            if (row.getSeries().isInteractable()) {
                return new Pair(newSeries, new Hint(newSeries))
            }
            else {
                return row
            }
        }))
    }

    

    return (
        <div className="board">
            <div className="board--directions">
                <h2>Directions here</h2>
            </div>
            <div className="board--mat">
                <Code series={new Series()}/>
                {displayRows}
            </div>
            <div className="board--colors">
                {pegSet}
            </div>
        </div>
    )
}