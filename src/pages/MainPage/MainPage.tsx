import React, {useEffect, useState} from "react"
import styles from "./MainPage.module.scss"

//components
import KeyboardComponent from "../../components/KeyboardComponent/KeyboardComponent";
import ScoreTiles from "../../components/ScoreTiles/ScoreTiles";
import {wordList} from "../../globals/wordLists/wordList";
import ResultPopUp from "../../components/ResultPopUp/ResultPopUp";

const MainPage = () => {
    let wordArray = wordList[2].match(/\b(\w+\W+)/g)

    //result pop up control
    const [showResult, setShowResult] = useState<boolean>(false)

    //states
    const [wordStack, setWordStack] = useState<string[]>([])

    const [wordIndex, setWordIndex] = useState<number>(0)

    const [timeLoss, setTimeLoss] = useState<number>(1000)

    const [solvedWords, setSolvedWords] = useState<number>(0)

    const [levelClearWords, setLevelClearWords] = useState<number>(10)

    const [level, setLevel] = useState<number>(0)

    const [scoreBoard, setScoreBoard] = useState<number>(0)

    const [increaseDescre, setIncreDecre] = useState<string | null>(null)

    const [multiplier, setMultiplier] = useState<number>(0)

    const [wordCorrectState, setWordCorrectState] = useState<boolean | null>(null)

    useEffect(() => {
        document.getElementById("inputref")!.focus()


        let wordIndexProxy = wordIndex
        const intervalFunc = setInterval(() => {
            setWordStack(state => [...state, wordArray![wordIndexProxy]]);
            setWordIndex(state => state + 1)
            wordIndexProxy += 1
        }, timeLoss)

        if (wordStack.length > 14) {
            clearInterval(intervalFunc)
            setShowResult(true)
        }

        return () => clearInterval(intervalFunc)
    }, [timeLoss, wordIndex])

    useEffect(() => {
        if (solvedWords) {
            setWordStack(state => state.filter((_, i) => i !== 0))
            if (solvedWords === levelClearWords) {
                setLevelClearWords(state => state + 5 + solvedWords);
                setTimeLoss(state => state - 100)
                setLevel(state => state + 1)
            }
        }
    }, [solvedWords])
    //useState

    //functions
    const onMisMatch = (e: any) => {
        e.target.value = "";
        setScoreBoard(state => state - 10)
        setIncreDecre("-" + 10)
        setMultiplier(state => 0)
        setWordCorrectState(false)
        e.target.style.border = "2px solid red"
        document.getElementById("alertBar")!.style.color = "red"
    }


    return <div className={styles.mainPage}>

        {showResult ? <ResultPopUp
            scoreBoard={scoreBoard}
            solvedWords={solvedWords}
            level={level}
        /> : null}

        <ScoreTiles
            scoreBoard={scoreBoard}
            increaseDescre={increaseDescre}
            level={level}
            multiplier={multiplier}
            solvedWords={solvedWords}
        />

        <div className={styles.stackDiv}>
            <div className={styles.stackCount}>
                <p>{levelClearWords} total words required for next level</p>
                &nbsp;
                &nbsp;
                &nbsp;
                <p className={styles.stackTitle}>STACK SIZE: </p>
                &nbsp;
                <p className={styles.stackValue}>{wordStack.length} / 15</p>
            </div>
            <div className={styles.stackDisplay}>
                {
                    wordStack.map((item, index) => {
                        return <p key={item + index} className={index === 0 ? styles.firstWord : styles.normalWord}>
                            {item}
                        </p>
                    })
                }
            </div>
        </div>


        {/*    input bar*/}
        <div className={styles.inputBarDiv}>
            <p className={styles.inputState}
               id={"alertBar"}
            >{wordCorrectState !== null ? (wordCorrectState ? "Correct input!!" : "Wrong input!!!") : ""}</p>
            <input
                placeholder={"Start typing here"}
                className={styles.inputBar}
                defaultValue={""}
                id={"inputref"}
                onChange={(e) => {
                    for (let i = 0; i < e.target.value.length; i++) {
                        if (e.target.value[i] !== wordStack[0][i]) {
                            onMisMatch(e)
                        } else if (e.target.value === wordStack[0]) {
                            setScoreBoard(state => state + (Math.round((1 / wordStack.length) * 100) + multiplier * 10))
                            setIncreDecre("+" + (Math.round((1 / wordStack.length) * 100) + multiplier * 10))
                            setSolvedWords(state => state + 1)
                            setMultiplier(state => state + 1)
                            e.target.value = "";
                            setWordCorrectState(true)
                            e.target.style.border = "2px solid darkgreen"
                            document.getElementById("alertBar")!.style.color = "darkgreen"
                        }
                    }
                }}
            />
        </div>

        {/*    key section*/}
        <KeyboardComponent/>


    </div>
}

export default MainPage