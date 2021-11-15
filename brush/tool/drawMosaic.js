const config = {
    group: 1,
    position: 10,
    icon: '&#xe611;',
    name: 'mosaic',
    history: true,
    useKeyword: '9',
    cursor: true,
    hint: '马赛克',
}
let size = 12;
function mouseMove(e) {
    const {startX, startY} = this.startPosition;

    const data = this.mainContext.getImageData(e.offsetX, e.offsetY, size, size).data;
    let r = 0, g = 0, b = 0;
    for (let row = 0; row < size; row ++) {
        for (let col = 0; col < size; col++) {
            r += data[((size * row) + col) * 4]
            g += data[((size * row) + col) * 4 + 1]
            b += data[((size * row) + col) * 4 + 2]
        }
    }
    r = Math.round(r / (size * size));
    g = Math.round(g / (size * size));
    b = Math.round(b / (size * size));
    const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
    this.drawContext.save()
    this.drawContext.fillStyle = color
    this.drawContext.fillRect(e.offsetX, e.offsetY - (size / 2), size, size)
}
function init() {
    this.setCursorSize(size, false);
    document.body.onmousewheel = (event) => {
        const value = size + (event.deltaY < 0 ? 2 : -2);
        size = value <= 0 ? 2 : value;
        this.setCursorSize(size, false);
    }
    window.Mousetrap.bind('=', () => {
        size++;
        this.setCursorSize(size, false);
    });
    window.Mousetrap.bind('-', () => {
        size--;
        this.setCursorSize(size, false);
    });
}
function destroy() {
    document.body.onmousewheel = null;
    window.Mousetrap.unbind('=');
    window.Mousetrap.unbind('-');
}
export default  {
    mouseMove,
    config,
    init,
    destroy
}
