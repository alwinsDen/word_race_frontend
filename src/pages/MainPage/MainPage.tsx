import React,{useEffect, useCallback, useState} from "react"
import styles from "./MainPage.module.scss"

const testData = ['here', "is", "the", "tex", "for", "test"]
const alphabetsList = {
    firstLevel: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    secondLevel: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    thirdLevel: ["z", "x", "c", "v", "b", "n", "m"]
}





const MainPage = () => {
    const keyFunction=useCallback((event)=> {
        setCurrentKey(event.key.toLowerCase())
    },[])

    const keyFunctionUp=useCallback((event)=> {
        setCurrentKey(null)
    },[])

    useEffect(()=>{
        document.addEventListener("keydown", keyFunction, false);
        document.addEventListener("keyup", keyFunctionUp, false);

        return () => {
            document.removeEventListener("keydown", keyFunction, false);
            document.addEventListener("keyup", keyFunctionUp, false);
        };
    },[])

    //useState
    const [currentKey, setCurrentKey] = useState<string | null>(null)

    return <div className={styles.mainPage}>
        <div className={styles.scoretiles}>

            {/*TODO: Here are the tiles*/}
            {/*SCORE TILE IS HERE*/}
            <div className={styles.tile}>
                <p className={styles.tileHeader}>SCORE</p>
                <div className={styles.incrementMeter}>
                    <p className={styles.mainIncr}>324</p>
                    <p className={styles.increment}>
                        +50
                    </p>
                </div>
            </div>

            {/*    Here is the level */}
            <div className={styles.tile}
                 style={{
                     background: "#C8A777"
                 }}
            >
                <p className={styles.tileHeader}>LEVEL</p>
                <div className={styles.incrementMeter}>
                    <p className={styles.mainIncr}>324</p>
                </div>
            </div>

            {/*Multiplier*/}
            <div className={styles.tile}
                 style={{
                     background: "#77C8B9"
                 }}
            >
                <p className={styles.tileHeader}>MULTIPLIER</p>
                <div className={styles.incrementMeter}>
                    <p className={styles.mainIncr}>324X</p>
                </div>
            </div>

            {/*Total words*/}
            <div className={styles.tile}
                 style={{
                     background: "#D075A1"
                 }}
            >
                <p className={styles.tileHeader}>TOTAL WORDS</p>
                <div className={styles.incrementMeter}>
                    <p className={styles.mainIncr}>324</p>
                </div>
            </div>
        </div>

        {/*    TODO:Here is the text display*/}

        <div className={styles.stackDiv}>
            <div className={styles.stackCount}>
                <p className={styles.stackTitle}>STACK SIZE: </p>
                &nbsp;
                <p className={styles.stackValue}>15 / 15</p>
            </div>
            <div className={styles.stackDisplay}>
                {
                    testData.map((item, index) => {
                        return <p className={index === 0 ? styles.firstWord : styles.normalWord}>
                            {item}
                        </p>
                    })
                }
            </div>
        </div>


        {/*    input bar*/}
        <div className={styles.inputBarDiv}>
            <p className={styles.inputState}>WRONG INPUT</p>
            <input
                placeholder={"Start typing here"}
                className={styles.inputBar}
                defaultValue={"Random"}
            />
        </div>

        {/*    key section*/}
        <div className={styles.visualKeyboard}>
            {/*    button section goes here*/}
            {
                alphabetsList.firstLevel.map((item, index)=> {
                    return <div className={currentKey===item ? styles.keyboadkey : styles.keyboadkeyUnselected} >
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.visualKeyboard}>
            {
                alphabetsList.secondLevel.map((item, index)=> {
                    return <div className={currentKey===item ? styles.keyboadkey : styles.keyboadkeyUnselected}>
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.visualKeyboard}>
            {
                alphabetsList.thirdLevel.map((item, index) => {
                    return <div className={currentKey===item ? styles.keyboadkey : styles.keyboadkeyUnselected}>
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>


    </div>
}

export default MainPage