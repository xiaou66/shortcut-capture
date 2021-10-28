const config = {
    group: 1,
    position: 2,
    icon: '&#xe61d;',
    name: 'circle',
    settingBox: 'color&size',
    useKeyword: '3',
    canvas: true,
    history: true,
    cursor: true,
    hint: '画圆形',
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
export default  {
    mouseMove,
    mouseUp,
    config,
    init,
    destroy
}
