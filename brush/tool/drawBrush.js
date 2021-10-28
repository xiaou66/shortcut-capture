const config = {
    group: 1,
    position: 5,
    icon: '&#xe620;',
    name: 'brush',
    settingBox: 'color&size',
    useKeyword: '6',
    canvas: false,
    history: true,
    cursor: true,
    hint: '画笔',
}
const $lineWidth = document.getElementById('lineWidth')
function mouseDown(e) {
    const {startX, startY} = this.startPosition;
    this.drawContext.moveTo(startX,startY);
    this.setCanvasStyle(this.drawContext);
    this.drawContext.beginPath();
}
function mouseMove(e) {
    // this.drawContext.beginPath();
    // this.drawContext.lineCap="round";
    this.drawContext.lineTo(e.offsetX, e.offsetY);
    this.drawContext.stroke();
}
function mouseUp(e) {
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
