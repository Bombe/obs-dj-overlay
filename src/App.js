import React from 'react';
import './App.css';
import TrackInfo from './components/TrackInfo';
import { Overlay } from "./components/Overlay";
import NextShow from "./components/NextShow";
import TwitchInfo from "./components/TwitchInfo";

function App() {
    return (
        <div className="App">
            <Overlay>
                <div style={{display: "grid-item"}}>
                    <TwitchInfo/>
                </div>
                <div style={{display: "grid-item"}}>
                    <TrackInfo/>
                    <NextShow/>
                </div>
            </Overlay>
        </div>
    );
}

export default App;
