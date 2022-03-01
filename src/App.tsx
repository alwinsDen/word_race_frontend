import React from "react"
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./router/Routes"
import axios from "axios";

axios.defaults.baseURL = "https://backend-word.herokuapp.com/"
const App=()=> {
    return <BrowserRouter>
        <Routes/>
        <ToastContainer/>
    </BrowserRouter>
}

export default App;