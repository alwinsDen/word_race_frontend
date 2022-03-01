import React from "react"
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routes from "./router/Routes"
const App=()=> {
    return <BrowserRouter>
        <Routes/>
        <ToastContainer/>
        <p>Here is the test</p>
    </BrowserRouter>
}

export default App;