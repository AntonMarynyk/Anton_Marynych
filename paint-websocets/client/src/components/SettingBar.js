import React from 'react';
import toolState from "../store/toolState";

const SettingBar = () => {
    return (
        <div className='setting-bar'>
            <label htmlFor="line-width" style={{marginLeft:10}}>Stroke(Line) width</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id='line-width'
                type="number"
                defaultValue={1}
                min={1}
                max={100}/>

            <label htmlFor='fill-color'>Fill color</label>
            <input
                onChange={e => toolState.setFillColor(e.target.value)}
                id='fill-color'
                type='color'
                style={{marginLeft:10}}/>

            <label htmlFor='stroke-color' style={{marginLeft:10}}>Stroke(Line) color</label>
            <input
                onChange={e => toolState.setStokeColor(e.target.value)}
                id='stroke-color'
                type='color'
                style={{marginLeft:10}}
            />
        </div>
    );
};

export default SettingBar;
