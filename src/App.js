import React from 'react';
import './App.css';
import TrackInfo from './TrackInfo';
import Overlay from "./Overlay";

function App() {
    return (
        <div className="App">
            <Overlay>
                <TrackInfo/>
            </Overlay>
        </div>
    );
}

export default App;
