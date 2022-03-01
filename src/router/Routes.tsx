import React from "react";
import {Switch, Route} from "react-router-dom"
import MainPage from "../pages/MainPage/MainPage";

const Routes =()=> {
    return <Switch>
        <Route exact path={"/"} component={MainPage}/>
    </Switch>
}

export default Routes