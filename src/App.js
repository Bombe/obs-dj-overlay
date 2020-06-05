import React from 'react';
import './App.css';
import TrackInfo from './TrackInfo';
import Overlay from "./Overlay";

function App() {
    return (
    <Overlay>
        <TrackInfo/>
    </Overlay>
  );
}

export default App;
