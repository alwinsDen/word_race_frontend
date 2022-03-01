import React, {useState} from "react"
import styles from "./ResultPopUp.module.scss"
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//compoents
import ScoreBoard from "../ScoreBoard/ScoreBoard";

interface IProps {
    scoreBoard: number,
    level: number,
    solvedWords: number
}

const ResultPopUp = (props: IProps) => {
    const {scoreBoard, level, solvedWords} = props

    //useState
    const [toggleScoreBoard, setToggleScoreboard] = useState<boolean>(false)

    const onSave = async () => {
        let userId = localStorage.getItem("wordraceID");
        if (userId) {
            axios.post("/user/update", {
                id: userId,
                score: scoreBoard,
                level: level,
                solvedWords: solvedWords
            }).then(res => {
                toast.success("The score has been updated")
            })
        } else {
            let playerName = await window.prompt("Enter a username")
            axios.post("/user/save", {
                score: scoreBoard,
                level: level,
                solvedWords: solvedWords,
                playerName: playerName
            }).then(res => {
                toast.success("The new player record has been saved")
                localStorage.setItem("wordraceID", res.data._id)
            })
        }
    }

    return <div className={styles.resultPopUp}>
        {toggleScoreBoard ? <ScoreBoard setToggleScoreboard={setToggleScoreboard}/> : null}
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
                <button className={styles.retry} onClick={onSave}>
                    SAVE
                </button>
                <button className={styles.scoreboard}
                onClick={()=> setToggleScoreboard(true)}
                >
                    SCOREBOARD
                </button>
            </div>
        </div>
    </div>
}

export default ResultPopUp;