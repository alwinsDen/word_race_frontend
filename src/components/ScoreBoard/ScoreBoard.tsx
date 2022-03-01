import React,{useEffect, useState} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactLoading from "react-loading"
import styles from "./ScoreBoard.module.scss"
import axios from "axios";



const ScoreBoard=(props:any)=> {
    const {setToggleScoreboard} = props;
    //usestate
    const [tableData, setTableData] = useState<[] | null>(null)

    useEffect(()=> {
        axios.get("/user/scoreboard")
            .then(res=> {
                setTableData(res.data)
            })
    },[])

    return <div
    className={styles.scoreboard}
    >
        <button onClick={()=>setToggleScoreboard()}>CLOSE THIS</button>
        <div className={styles.tableDiv}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Position</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Average Score</TableCell>
                        <TableCell align="center">Max Level Reached</TableCell>
                        <TableCell align="center">Games played</TableCell>
                        <TableCell align="center">Total words solved</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData ? (tableData.map((item : any, index)=> {
                            return <TableRow
                                key={item+index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index+1}</TableCell>
                                <TableCell align="center">{item.username}</TableCell>
                                <TableCell align="center">{item.averageScore}</TableCell>
                                <TableCell align="center">{item.maxLevel}</TableCell>
                                <TableCell align="center">{item.gamesPlayed}</TableCell>
                                <TableCell align="center">{item.solvedWords}</TableCell>
                            </TableRow>
                        })) : <ReactLoading type={"spin"} color={"#000000"} height={"100px"} width={"100px"}/>
                    }

                </TableBody>
            </Table>
        </TableContainer>
        </div>
    </div>
}

export default ScoreBoard