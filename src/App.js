import React from 'react';
import './App.css';
import TrackInfo from './TrackInfo';
import Overlay from "./Overlay";
import NextShow from "./NextShow";

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
