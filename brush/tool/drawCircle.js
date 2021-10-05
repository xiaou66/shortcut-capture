const config = {
    group: 1,
    position: 2,
    icon: '&#xe61d;',
    name: 'circle',
    settingBox: 'color&size',
    useKeyword: '3',
    canvas: true,
    history: true,
}
const $lineWidth = document.getElementById('lineWidth')
function mouseMove(e) {
    const {startX, startY} = this.startPosition;
    this.clearFrontContext();
    this.frontContext.beginPath()
    const w = e.offsetX -  startX;
    const h = e.offsetY -  startY;
    this.frontContext.ellipse(startX + w / 2,startY + h / 2,Math.abs(w / 2),Math.abs(h / 2),0, 0, 2 * Math.PI)
    this.frontContext.stroke();
}
function mouseUp(e) {
    this.clearFrontContext();
    const {startX, startY} = this.startPosition;
    const w = e.offsetX -  startX;
    const h = e.offsetY -  startY;
    this.drawContext.beginPath();
    this.drawContext.ellipse(startX+w / 2,startY+h / 2,Math.abs(w / 2),Math.abs(h / 2),0, 0, 2 * Math.PI);
    this.drawContext.stroke();
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
export default  {
    mouseMove,
    mouseUp,
    config,
    init,
    destroy
}
