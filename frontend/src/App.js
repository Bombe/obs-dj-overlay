import React from "react"

import Viewer from "./components/Viewer"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Viewer/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App
