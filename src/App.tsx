import React, {useEffect, useState} from 'react';
import './App.less';
import {wordList} from "./globals/wordLists/wordList";
// import MouseTrap from "mousetrap"
// import * as Mousetrap from "mousetrap";

function App() {
    const [wordStack, setWordStack] = useState<string[]>([])
    const [currentWord, setCurrentWord] = useState<string>("")
    const [solvedWords, setSolvedWords] = useState<number>(0)
    const [level, setLevel] = useState<number>(0)

    // Mousetrap.bind("space",()=> {console.log("I pressed space")})

    useEffect(() => {
        let wordArray = wordList[0].match(/\b(\w+\W+)/g)
        let timeLoss = 0;
        let wordIndex = 0;
        if (level === 0) {
            timeLoss = 1000;
            const intervalVar = setInterval(() => {
                setWordStack(state => [...state, wordArray![wordIndex]]);
                wordIndex += 1;
            }, timeLoss)
            return () => clearInterval(intervalVar)
        }
    }, [])

    useEffect(() => {
        if (solvedWords) {
            setWordStack(state => state.filter((_, i) => i !== 0))
        }
    }, [solvedWords])


    return (
        <div className="App">
            <div className={"parameters"}
                 style={{
                     display: "flex"
                 }}
            >
                <div className={"level"}>LEVEL 0</div>
                &nbsp; &nbsp;
                <div className={"score"}>420 Score</div>
                &nbsp; &nbsp;
                <div className={"multiplier"}>1X</div>
                &nbsp; &nbsp;
                <div className={"wordsLeft"}>15 words</div>
            </div>

            <div className={"displayDiv"} style={{
                display: "flex",
                gap: ".5rem",
                flexWrap: "wrap"
            }
            }>
                {
                    wordStack.map((item, index) => {
                        return <div key={item + index}
                                    style={
                                        index === 0 ? {
                                            background: "#72a04643"
                                        } : {}
                                    }
                        >
                            <p>{item}</p>
                        </div>
                    })
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
                            } else if (e.target.value === wordStack[0]) {
                                setSolvedWords(state => state + 1)
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
