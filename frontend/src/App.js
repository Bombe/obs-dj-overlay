import React from "react"

import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"

import Viewer from "./components/Viewer"
import Admin from "./components/Admin"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin">
                    <Admin/>
                </Route>
                <Route path="/">
                    <Link to="/admin">
                        <Viewer/>
                    </Link>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
