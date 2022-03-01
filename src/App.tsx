import React, {useEffect} from "react"
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Routes from "./router/Routes"
import axios from "axios";

axios.defaults.baseURL = "https://backend-word.herokuapp.com/"
const App = () => {

    useEffect(() => {
        let sleepLogger = setInterval(async () => {
            let data = await fetch("https://word-race-test.herokuapp.com")
            let serverFetch = await fetch("https://backend-word.herokuapp.com/")
        }, 30000)
        return () => clearInterval(sleepLogger)
    }, [])

    return <BrowserRouter>
        <Routes/>
        <ToastContainer/>
    </BrowserRouter>
}

export default App;