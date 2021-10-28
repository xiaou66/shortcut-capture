const config = {
    group: 1,
    position: 9,
    icon: '&#xe67b;',
    name: 'erasure',
    useKeyword: '8',
    history: true,
    cursor: true,
    hint: '橡皮擦',
}
let num = 50;
function mouseMove(e) {
    let moveX = e.clientX;
    let moveY = e.clientY;
    const radius = num / 2;
    for(let i = 0; i <= radius; i++){
        const calcWidth = radius - i;
        const calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
        const posX = moveX - calcWidth;
        const posY = moveY - calcHeight;
        const widthX = 2 * calcWidth;
        const heightY = 2 * calcHeight;
        this.drawContext.clearRect(posX, posY, widthX, heightY);
    }
}

function init() {
    this.setCursorSize(num, false);
    document.body.onmousewheel = function(event) {
        const value = num + (event.deltaY < 0 ? 2 : -2);
        num = value <= 0 ? 2 : value;
        this.setCursorSize(num, false);
    }.bind(this)
    window.Mousetrap.bind('=', () => {
        num++;
        this.setCursorSize(num, false);
    });
    window.Mousetrap.bind('-', () => {
        num--;
        this.setCursorSize(num, false)
    });
}
function destroy() {
    document.body.onmousewheel = null;
    window.Mousetrap.unbind('=');
    window.Mousetrap.unbind('-');
}
export default  {
    init,
    destroy,
    config,
    mouseMove,
}
