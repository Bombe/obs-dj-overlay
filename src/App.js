import React from 'react';
import './App.css';
import TrackInfo from './components/TrackInfo';
import { Overlay } from "./components/Overlay";
import NextShow from "./components/NextShow";

function App() {
    return (
        <div className="App">
            <div style={{display: "grid-item"}}></div>
            <div style={{display: "grid-item"}}>
                <Overlay>
                    <TrackInfo/>
                    <NextShow/>
                </Overlay>
            </div>
        </div>
    );
}

export default App;
