const config = {
    group: 1,
    position: 5,
    icon: '&#xe67b;',
    name: 'erasure',
    useKeyword: '6',
    history: true,
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
    window.Mousetrap.bind('=', () => {
        num++;
        this.setCursorSize(num);
    });
    window.Mousetrap.bind('-', () => {
        num--;
        this.setCursorSize(num)
    });
}
function destroy() {
    window.Mousetrap.unbind('=');
    window.Mousetrap.unbind('-');
}
export default  {
    init,
    destroy,
    config,
    mouseMove,
}
