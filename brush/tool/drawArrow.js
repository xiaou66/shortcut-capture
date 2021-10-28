const config = {
    group: 1,
    position: 3,
    icon: '&#xe69a;',
    name: 'arrow',
    settingBox: 'color&size',
    useKeyword: '4',
    canvas: true,
    history: true,
    cursor: true,
    hint: '箭头',
}
const $lineWidth = document.getElementById('lineWidth')
function arrowCoordinate(x1,y1,x2,y2){
    const  l1 = 20,l2=12,angle=Math.PI/12
    //计算移动点与点击点之间的角度
    const rotate = Math.atan2(y2-y1,x2-x1)
    //计算箭头三个点的坐标，第四个点为鼠标移动点
    const a1 = x2 - l1*Math.sin(Math.PI/2-rotate-angle)
    const b1 = y2 - l1*Math.cos(Math.PI/2-rotate-angle)

    const a2 = x2 - l2*Math.cos(rotate)
    const b2 = y2 - l2*Math.sin(rotate)

    const a3 = x2 - l1*Math.cos(rotate-angle)
    const b3 = y2 - l1*Math.sin(rotate-angle)

    return [a1,b1,a2,b2,a3,b3]
}

function mouseMove(e) {
    const {startX, startY} = this.startPosition;
    const X2 = e.offsetX;
    const Y2 = e.offsetY;
    const [a1,b1,a2,b2,a3,b3] = arrowCoordinate(startX,startY,X2,Y2);
    this.clearFrontContext();
    this.frontContext.beginPath();
    this.frontContext.moveTo(startX,startY);
    this.frontContext.lineTo(X2,Y2);
    this.frontContext.moveTo(a2,b2);
    this.frontContext.lineTo(a1,b1);
    this.frontContext.lineTo(X2,Y2);
    this.frontContext.lineTo(a3,b3);
    this.frontContext.lineTo(a2,b2);
    this.frontContext.stroke();
}
function mouseUp(e) {
    this.clearFrontContext();
    const {startX, startY} = this.startPosition;
    const X2 = e.offsetX;
    const Y2 = e.offsetY;
    const [a1,b1,a2,b2,a3,b3] = arrowCoordinate(startX,startY,X2,Y2);
    this.drawContext.beginPath();
    this.drawContext.moveTo(startX,startY);
    this.drawContext.lineTo(X2,Y2);
    this.drawContext.moveTo(a2,b2);
    this.drawContext.lineTo(a1,b1);
    this.drawContext.lineTo(X2,Y2);
    this.drawContext.lineTo(a3,b3);
    this.drawContext.lineTo(a2,b2);
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
    mouseMove,
    mouseUp,
    config,
    init,
    destroy
}
