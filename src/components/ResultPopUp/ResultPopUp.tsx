import React from "react"
import styles from "./ResultPopUp.module.scss"

interface IProps {
    scoreBoard: number
}

const ResultPopUp = (props : IProps) => {
    const {scoreBoard} = props
    return <div className={styles.resultPopUp}>
        <div className={styles.popUpBox}>
            <div className={styles.alertText}>
                <p className={styles.titleAlert}>Game Over!</p>
                <p className={styles.wordStackFull}>Word stack is full</p>
            </div>
            <div className={styles.gameScore}>
                <h1>{scoreBoard}</h1>
                <p>SCORE</p>
            </div>

            <div className={styles.clickableButtons}>
                <button className={styles.retry}>
                    SAVE
                </button>
                <button className={styles.scoreboard}>
                    SCOREBOARD
                </button>
            </div>
        </div>
    </div>
}

export default ResultPopUp;