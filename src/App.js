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
                <div className="Center">
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
