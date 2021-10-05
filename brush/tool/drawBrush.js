const config = {
    group: 1,
    position: 4,
    icon: '&#xe620;',
    name: 'brush',
    settingBox: 'color&size',
    useKeyword: '5',
    canvas: false,
    history: true,
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
    window.Mousetrap.bind('=', () => {
        $lineWidth.value = parseInt($lineWidth.value) + 2;
        this.setCursorSize($lineWidth.value);
    })
    window.Mousetrap.bind('-', () => {
        $lineWidth.value =  parseInt($lineWidth.value) - 2;
        if ($lineWidth.value < 1) {
            $lineWidth.value = 1;
        }
        this.setCursorSize($lineWidth.value);
    })
}
function destroy() {
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
