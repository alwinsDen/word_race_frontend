import React from "react"
import styles from "./ScoreTiles.module.scss"

interface IProps {
    multiplier: number,
    scoreBoard:number,
    level:number,
    solvedWords:number,
    increaseDescre:null | string
}



const ScoreTiles=(props:IProps)=> {
    const {increaseDescre,level,multiplier,scoreBoard,solvedWords} = props;
    return <div className={styles.scoretiles}>

        {/*SCORE TILE IS HERE*/}
        <div className={styles.tile}>
            <p className={styles.tileHeader}>SCORE</p>
            <div className={styles.incrementMeter}>
                <p className={styles.mainIncr}>{scoreBoard}</p>
                <p className={styles.increment}>
                    {increaseDescre ? increaseDescre : ""}
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
                <p className={styles.mainIncr}>{level}</p>
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
                <p className={styles.mainIncr}>{multiplier}X</p>
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
                <p className={styles.mainIncr}>{solvedWords}</p>
            </div>
        </div>
    </div>
}

export default ScoreTiles