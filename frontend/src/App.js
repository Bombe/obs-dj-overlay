import React from "react"

import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Viewer from "./components/Viewer"
import Admin from "./components/Admin"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route path="/preview">
                    <Viewer/>
                </Route>
                <Route path="/">
                    <a href={"/admin"}>
                        <Viewer/>
                    </a>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
