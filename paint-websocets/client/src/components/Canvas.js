import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";
import axios from 'axios'
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

const Canvas = observer (() => {
    const canvasRef = useRef();
    const usernameRef = useRef()
    const [modal, setModal] = useState(false)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        let ctx = canvasRef.current.getContext('2d')
        axios.get(`http://localhost:5001/image?id=${params.id}`)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5001/`)
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log("подключение установлено")
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                // eslint-disable-next-line
                switch (msg.method) {
                    case 'connection':
                        console.log(`Пользователь ${msg.username} присоединился`)
                        break
                    case 'draw':
                        drawHandler(msg)
                        break
                }
            }
        }
        // eslint-disable-next-line
    }, [canvasState.username])


    const UndoRedoHandler = () => {
        // console.log(canvasState.undoList)
        // canvasState.undo()
        // console.log(canvasState.undoList)
        // axios.post(`http://localhost:5001/image?id=${canvasState.sessionId}`, {img: canvasState.canvas.toDataURL()})
        //     .then(res => console.log(res.data))
    }


    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        // eslint-disable-next-line
        switch (figure.type) {
            case "brush":
                Brush.staticDraw(ctx, figure.x, figure.y, figure.lineWidth, figure.strokeColor)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillColor, figure.strokeColor, figure.lineWidth)
                break
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.fillColor, figure.strokeColor, figure.lineWidth)
                break
            case "eraser":
                Eraser.staticDraw(ctx, figure.x, figure.y, figure.lineWidth)
                break
            case "line":
                Line.staticDraw(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.color, figure.lineWidth)
                break
            case 'finish':
                ctx.beginPath()
                break
            case 'undo':
                UndoRedoHandler()
                break
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        axios.post(`http://localhost:5001/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(res => console.log(res.data))
    }

    const mouseUpHandler = () => {
        axios.post(`http://localhost:5001/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(res => console.log(res.data))
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Enter UserName</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={connectionHandler}
                        >
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
                ref={canvasRef}
                width={800}
                height={600}/>
        </div>
    );
});

export default Canvas;
