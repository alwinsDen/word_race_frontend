import React, {useEffect, useState} from 'react';
import './App.scss';
import {wordList} from "./globals/wordLists/wordList";
// import MouseTrap from "mousetrap"
// import * as Mousetrap from "mousetrap";

function App() {
    const [wordStack, setWordStack] = useState<string[]>([])
    const [currentWord, setCurrentWord] = useState<string>("")
    const [solvedWords, setSolvedWords] = useState<number>(0)
    const [multiplier, setMultiplier] = useState<number>(0)
    const [level, setLevel] = useState<number>(0)
    const [levelClearWords, setLevelClearWords] = useState<number>(10)
    const [timeLoss, setTimeLoss] = useState<number>(1000)
    const [scoreBoard, setScoreBoard] = useState<number>(0)
    const [increaseDescre, setIncreDecre] = useState<string | null>(null)
    const [gameOver, setGameOver] = useState<boolean>(false)
    // Mousetrap.bind("space",()=> {console.log("I pressed space")})
    const [wordIndex, setWordIndex] = useState<number>(0)

    let wordArray = wordList[0].match(/\b(\w+\W+)/g)
    useEffect(() => {
        let wordIndexProxy = wordIndex
        // console.log(wordIndex)
        const intervalVar = setInterval(() => {
            setWordStack(state => [...state, wordArray![wordIndexProxy]]);
            setWordIndex(state=>state+1)
            wordIndexProxy += 1
        }, timeLoss)
        return () => clearInterval(intervalVar)
    }, [timeLoss, wordIndex, gameOver])

    useEffect(() => {
        console.log(levelClearWords)
        if (solvedWords) {
            setWordStack(state => state.filter((_, i) => i !== 0))
            if (solvedWords === levelClearWords) {
                setLevelClearWords(state => state + 5 + solvedWords);
                setTimeLoss(state => state - 100)
                setLevel(state => state + 1)
            }
        }
    }, [solvedWords])


    return (
        <div className="App">
        <div className={"parameters"}
    style={{
        display: "flex"
    }}
>
    <div className={"level"}>LEVEL {level}</div>
    &nbsp; &nbsp;
    <div className={"score"}>{scoreBoard} Score &nbsp; &nbsp; {increaseDescre ? increaseDescre : null}</div>
    &nbsp; &nbsp;
    <div className={"multiplier"}>{multiplier}X</div>
    &nbsp; &nbsp;
    <div className={"wordsLeft"}>stack size: {wordStack.length} / 15</div>
    &nbsp; &nbsp;
    <div className={"wordssolved"}>{solvedWords} Solved</div>
    </div>

    <div className={"displayDiv"} style={{
        display: "flex",
            gap: ".5rem",
            flexWrap: "wrap"
    }
}>
    {
        wordStack.length < 15 ? wordStack.map((item, index) => {
            return <div key={item + index}
            style={
                index === 0 ? {
                background: "#72a04643"
            } : {}
        }
        >
            <p>{item}</p>
            </div>
        }) : <h2 style={{
        color: "red",
    }}>GAME OVER THE STACK IS FULL</h2>
    }
    </div>

    <div
    className={"inputDiv"}
    >
    <input
        type={"text"}
    name={"inputfield"}
    placeholder={"Type here"}
    onChange={(e) => {

        for (let i = 0; i < e.target.value.length; i++) {
            if (e.target.value[i] !== wordStack[0][i]) {
                e.target.value = "";
                setScoreBoard(state => state - 10)
                setIncreDecre("-" + 10)
                setMultiplier(state => 0)
            } else if (e.target.value === wordStack[0]) {

                setScoreBoard(state => state + (Math.round((1 / wordStack.length) * 100) + multiplier * 10))
                setIncreDecre("+" + (Math.round((1 / wordStack.length) * 100) + multiplier * 10))
                setSolvedWords(state => state + 1)
                setMultiplier(state => state + 1)
                e.target.value = "";
            }
        }

        // if (e.target.value === wordStack[0]) {
        // }
    }}
    />
    </div>
    </div>
);
}

export default App;
