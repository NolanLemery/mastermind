import React from "react"
import Color from "../data/Color"
import Peg from "./Peg"
import Row from "./Row"
import Code from "./Code"
import Series from "../data/Series"
import Pair from "../data/Pair"
import Hint from "../data/Hint"
import State from "../data/State"
import { act } from "react-dom/test-utils"

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

    const defaultCode = randomSeries()
    const [code, setCode] = React.useState(defaultCode)

    const [gameState, setGameState] = React.useState(State.Empty)

    React.useEffect(() => {
        if (activeRowNum > 0
        && rows[activeRowNum - 1].getHint().getFirst() === Color.Red
        && rows[activeRowNum - 1].getHint().getSecond() === Color.Red
        && rows[activeRowNum - 1].getHint().getThird() === Color.Red
        && rows[activeRowNum - 1].getHint().getFourth() === Color.Red) {
            setGameState(State.Win)
        }
        else if (activeRowNum > 7) {
            setGameState(State.Lose)
        }
    }, [activeRowNum])

    const ref = React.useRef(null)

    React.useEffect(() => {
        ref.current.focus()
    }, [])

    function makePeg(color) {
        return <Peg color={color} 
        selected={color === selectedColor}
        clickPeg={gameState === State.Empty ? 
            (() => switchSelectedColor(color)) : (void(0))}
        empty={false}/>
    }
    const pegSet = colorSet.map(makePeg)

    function switchSelectedColor(color) {
        setSelectedColor(color)
    }

    function makeRow(row) {
        return <Row series={row.getSeries()}
        hint={row.getHint()}
        updateRowsFirst={(row.getSeries().isInteractable() && gameState === State.Empty) ? 
            (() => updateRows(1)) : (void(0))}
        updateRowsSecond={(row.getSeries().isInteractable() && gameState === State.Empty) ? 
            (() => updateRows(2)) : (void(0))}
        updateRowsThird={(row.getSeries().isInteractable() && gameState === State.Empty) ? 
            (() => updateRows(3)) : (void(0))}
        updateRowsFourth={(row.getSeries().isInteractable() && gameState === State.Empty) ? 
            (() => updateRows(4)) : (void(0))}
        submitGuess={submitGuess}/>
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

    function randomSeries() {
        const codeColors = []
        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * colorSet.length)
            codeColors.push(colorSet[index])
        }
        return new Series(false, codeColors[0], codeColors[1], 
            codeColors[2], codeColors[3])
    }

    function createCode() {
        setCode(randomSeries())
    }

    function submitGuess() {
        let origGuess = rows[activeRowNum].getSeries()
        let guess = new Series(false, origGuess.getFirst(), 
        origGuess.getSecond(), origGuess.getThird(), origGuess.getFourth())
        let hitNum = 0
        let nearHits = []
        let remainingCode = []
        for (let i = 1; i < 5; i++) {
            if (guess.getSlot(i) === code.getSlot(i)) {
                hitNum += 1
            }
            else {
                nearHits.push(guess.getSlot(i))
                remainingCode.push(code.getSlot(i))
            }
        }
        let nearHitNum = 0
        for (let i = 0; i < nearHits.length; i++) {
            for (let j = 0; j < remainingCode.length; j++) {
                if (nearHits[i] === remainingCode[j]) {
                    nearHitNum += 1
                    remainingCode.splice(j, 1)
                    // j -= 1
                    nearHits.splice(i, 1)
                    i -= 1
                    break;
                }
            }
        }
        let hint = new Hint(guess)
        for (let i = 1; i < 5; i++) {
            if (hitNum > 0) {
                hint.setSlot(i, Color.Red)
                hitNum -= 1
            }
            else if (nearHitNum > 0) {
                hint.setSlot(i, Color.White)
                nearHitNum -= 1
            }
        }
        setRows(prevRows => {{
            let newRows = []
            for (let i = 0; i < prevRows.length; i++) {
                if (i === activeRowNum) {
                    newRows.push(new Pair(guess, hint))
                }
                else if (i === activeRowNum + 1) {
                    let newActiveSeries = new Series(true)
                    newRows.push(new Pair(newActiveSeries))
                }
                else {
                    newRows.push(prevRows[i])
                }
            }
            return newRows
        }})
        setActiveRowNum(prevActiveRowNum => (prevActiveRowNum + 1))
        ref.current.focus()
    }

    function renderGameEnd() {
        let renderArr = []
        renderArr.push(
        <h1>
            {gameState === State.Win ? "You Win" : "You Lose"}
        </h1>)
        renderArr.push(
        <button className="board--directions--restart" onClick={restartGame}>
            New Game
        </button>)
        return renderArr
    }

    function restartGame() {
        setRows(defaultRows)
        setActiveRowNum(0)
        createCode()
        setGameState(State.Empty)
        ref.current.focus()
    }

    function handleKeyDown(event) {
        let up;
        if (event.key === 'w' || event.key === "ArrowUp") {
            up = true
        }
        else if (event.key === 's' || event.key === "ArrowDown") {
            up = false
        }
        else {
            return;
        }
        let colorIndex = colorSet.findIndex((color) => (color === selectedColor))
        if (up && colorIndex > 0) {
            setSelectedColor(colorSet[colorIndex - 1])
        }
        else if (!up && colorIndex < colorSet.length - 1) {
            setSelectedColor(colorSet[colorIndex + 1])
        }
    }

    return (
        <div className="board" ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
            <div className="board--directions">
                <h2>
                    Guess the four-color code (hidden at the bottom of the board). 
                    Use UP/DOWN (or W/S) to navigate the selectable colors. Click 
                    the spot you want to insert the selected color. Guesses start 
                    at the top and move down. A Red feedback pin signifies a Color 
                    in the correct spot. A White feedback pin signfies a Color exists 
                    in the hidden code, but it is in the wrong spot.
                </h2>
                {gameState !== State.Empty && renderGameEnd()}
            </div>
            <div className="board--mat">
                {displayRows}
                <Code series={code} 
                updateRowsFirst={void(0)}
                updateRowsSecond={void(0)}
                updateRowsThird={void(0)}
                updateRowsFourth={void(0)}
                solution={true}
                hidden={gameState === State.Empty}/>
            </div>
            <div className="board--colors">
                {pegSet}
            </div>
        </div>
    )
}