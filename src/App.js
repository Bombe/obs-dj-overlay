import React from 'react';
import './App.css';
import TrackInfo from './components/TrackInfo';
import { Overlay } from "./components/Overlay";
import NextShow from "./components/NextShow";
import TwitchInfo from "./components/TwitchInfo";
import {Clock} from "./components/Clock/Clock";

function App() {
    return (
        <div className="App">
            <Overlay>
                <div className="Center">
                    <Clock/>
                    <TwitchInfo/>
                </div>
                <div className="Bottom">
                    <TrackInfo/>
                    <NextShow/>
                </div>
            </Overlay>
        </div>
    );
}

export default App;
