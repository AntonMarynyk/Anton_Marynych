// eslint-disable-next-line
import React, {useEffect} from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";
// eslint-disable-next-line
import axios from "axios";


const ToolBar = () => {
    const download = () => {
        const dataURL = canvasState.canvas.toDataURL()
        console.log(dataURL)
        const a = document.createElement('a')
        a.href = dataURL
        a.download = canvasState.sessionId + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    //
    const HandleUndoClick = () => {
        canvasState.undo()
        axios.post(`http://localhost:5001/image?id=${canvasState.sessionId}`, {img: canvasState.canvas.toDataURL()})
            .then(res => console.log(res.data))

        canvasState.socket.send(JSON.stringify({
            method: 'draw',
            id: canvasState.sessionId,
            figure: {
                type: 'undo'
            }
        }))
    }


    const HandleRedoClick = () => {
        canvasState.redo()
        // axios.post(`http://localhost:5001/image?id=${canvasState.sessionId}`, {img: canvasState.canvas.toDataURL()})
        //     .then(res => console.log(res.data))
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => {toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}}/>
            <button className='toolbar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn line' onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
            <button className='toolbar__btn undo' onClick={() => HandleUndoClick()}/>
            <button className='toolbar__btn redo' onClick={() => HandleRedoClick()}/>
            <button className='toolbar__btn save' onClick={download}/>
        </div>
    );
};

export default ToolBar;
