import React, {useCallback, useEffect, useState} from "react"
import styles from "./KeyboardComponent.module.scss"

const alphabetsList = {
    firstLevel: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    secondLevel: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    thirdLevel: ["z", "x", "c", "v", "b", "n", "m"]
}
const KeyboardComponent = () => {
    const keyFunction = useCallback((event) => {
        setCurrentKey(event.key.toLowerCase())
    }, [])

    const keyFunctionUp = useCallback((event) => {
        setCurrentKey(null)
    }, [])

    const [currentKey, setCurrentKey] = useState<string | null>(null)
    useEffect(() => {

        document.addEventListener("keydown", keyFunction, false);
        document.addEventListener("keyup", keyFunctionUp, false);
        return () => {
            document.removeEventListener("keydown", keyFunction, false);
            document.addEventListener("keyup", keyFunctionUp, false);
        };
    }, [])

    return <>
        <div className={styles.visualKeyboard}>
            {/*    button section goes here*/}
            {
                alphabetsList.firstLevel.map((item, index) => {
                    return <div className={currentKey === item ? styles.keyboadkey : styles.keyboadkeyUnselected}>
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.visualKeyboard}>
            {
                alphabetsList.secondLevel.map((item, index) => {
                    return <div className={currentKey === item ? styles.keyboadkey : styles.keyboadkeyUnselected}>
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>
        <div className={styles.visualKeyboard}>
            {
                alphabetsList.thirdLevel.map((item, index) => {
                    return <div className={currentKey === item ? styles.keyboadkey : styles.keyboadkeyUnselected}>
                        <p>{item.toUpperCase()}</p>
                    </div>
                })
            }
        </div>
    </>
}

export default KeyboardComponent