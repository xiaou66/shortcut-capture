const config = {
    group: 1,
    position: 4,
    icon: '&#xe66d;',
    name: 'straightLine',
    settingBox: 'color&size',
    useKeyword: '5',
    canvas: false,
    history: true,
    cursor: true,
    hint: '画直线',
}
const $lineWidth = document.getElementById('lineWidth')
function mouseDown(e) {
    const {startX, startY} = this.startPosition;
    this.setCanvasStyle(this.frontContext);
}
function mouseMove(e) {
    const {startX, startY} = this.startPosition;
    const X2 = e.offsetX;
    const Y2 = e.offsetY;
    this.clearFrontContext();
    this.frontContext.beginPath();
    this.frontContext.moveTo(startX,startY);
    this.frontContext.lineTo(X2,Y2);
    this.frontContext.lineTo(X2,Y2);
    this.frontContext.stroke();
}
function mouseUp(e) {
    this.clearFrontContext();
    this.setCanvasStyle(this.drawContext);
    const {startX, startY} = this.startPosition;
    const X2 = e.offsetX;
    const Y2 = e.offsetY;
    this.drawContext.beginPath();
    this.drawContext.moveTo(startX,startY);
    this.drawContext.lineTo(X2,Y2);
    this.drawContext.lineTo(X2,Y2);
    this.drawContext.stroke()
}
// 工具初始化
function init(priorToolName, toolName) {
    this.setCursorSize($lineWidth.value, false);
    document.body.onmousewheel = function(event) {
        const value = parseInt($lineWidth.value) + (event.deltaY < 0 ? 2 : -2);
        $lineWidth.value = value <= 0 ? 2 : value;
        this.setCursorSize($lineWidth.value, false);
    }.bind(this)
    window.Mousetrap.bind('=', () => {
        $lineWidth.value = parseInt($lineWidth.value) + 2;
        this.setCursorSize($lineWidth.value, false);
    })
    window.Mousetrap.bind('-', () => {
        $lineWidth.value =  parseInt($lineWidth.value) - 2;
        if ($lineWidth.value < 1) {
            $lineWidth.value = 1;
        }
        this.setCursorSize($lineWidth.value, false);
    })
}
function destroy() {
    document.body.onmousewheel = null;
    window.Mousetrap.unbind('=');
    window.Mousetrap.unbind('-');
}
export default {
    mouseUp,
    mouseDown,
    mouseMove,
    config,
    init,
    destroy
}
