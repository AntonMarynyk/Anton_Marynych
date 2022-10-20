import React from 'react';
import ToolBar from "./components/ToolBar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";
import './styles/app.scss'

const Paint = () => {
    return (
        <div className="app">
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
        </div>
    );
};

export default Paint;
