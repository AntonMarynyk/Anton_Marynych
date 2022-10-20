import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Canvas from "../components/Canvas";
import SettingBar from "../components/SettingBar";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Canvas">
                <Canvas/>
            </ComponentPreview>
            <ComponentPreview path="/SettingBar">
                <SettingBar/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;