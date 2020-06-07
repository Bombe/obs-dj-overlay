import React from 'react';
import './App.css';
import TrackInfo from './components/TrackInfo';
import {Overlay} from "./components/Overlay";
import NextShow from "./components/NextShow";
import TwitchInfo from "./components/TwitchInfo";
import {Clock} from "./components/Clock/Clock";
import TitleInfo from "./components/TitleInfo";
import Message from "./components/Message";

function App() {
    return (
        <div className="Background">
            <div className="App">
                <Overlay>
                    <Message/>
                    <div className="Center">
                        <div className="Left">
                            <TitleInfo/>
                        </div>
                        <div className="Expand">
                        </div>
                        <div className="Right">
                            <Clock/>
                            <TwitchInfo/>
                        </div>
                    </div>
                    <div className="Bottom">
                        <TrackInfo/>
                        <NextShow/>
                    </div>
                </Overlay>
            </div>
        </div>
    );
}

export default App;
