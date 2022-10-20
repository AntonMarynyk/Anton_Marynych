import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    lineWidth: this.ctx.lineWidth,
                    strokeColor: this.ctx.strokeStyle
                }
            }))
        }
    }

    draw (x, y, lineWidth) {
        this.ctx.lineWidth = lineWidth
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    static staticDraw(ctx, x, y, lineWidth, strokeColor) {
        let tempLineWidth = ctx.lineWidth
        let tempStrokeStyle = ctx.strokeStyle

        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth

        ctx.lineTo(x, y)
        ctx.stroke()

        ctx.strokeStyle = tempStrokeStyle
        ctx.lineWidth = tempLineWidth
    }
}