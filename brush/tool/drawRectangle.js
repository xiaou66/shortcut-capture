const config = {
    group: 1,
    position: 1,
    icon: '&#xe61c;',
    name: 'rectangle',
    settingBox: 'color&size',
    useKeyword: '2',
    canvas: true,
    history: true,
    cursor: true,
    hint: '画矩形',
}
const $lineWidth = document.getElementById('lineWidth')
function mouseMove(e) {
    const { startX, startY } = this.startPosition;
    this.clearFrontContext();
    this.frontContext.beginPath();
    this.frontContext.moveTo(startX,startY);
    // 长
    this.frontContext.lineTo(e.offsetX,startY);
    // 右边
    this.frontContext.lineTo(e.offsetX,e.offsetY);
    // 左边
    this.frontContext.lineTo(startX,e.offsetY);
    this.frontContext.closePath();
    this.frontContext.stroke();
}
function mouseUp(e) {
    this.clearFrontContext();
    const {startY, startX} = this.startPosition;
    this.drawContext.strokeRect(startX, startY, e.offsetX - startX, e.offsetY - startY);
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
    init,
    config,
    destroy,
}
