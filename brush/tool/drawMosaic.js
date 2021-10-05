const config = {
    group: 1,
    position: 6,
    icon: '&#xe611;',
    name: 'mosaic',
    history: true,
    useKeyword: '7'
}
let size = 8;
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
    this.drawContext.beginPath()
    this.drawContext.save()
    this.drawContext.fillStyle = color
    this.drawContext.fillRect(e.offsetX, e.offsetY, size, size)
    this.drawContext.restore()
}
function init() {
    window.Mousetrap.bind('=', () => {
        size++;
        this.setCursorSize(size);
    });
    window.Mousetrap.bind('-', () => {
        size--;
        this.setCursorSize(size)
    });
}
function destroy() {
    window.Mousetrap.unbind('=');
    window.Mousetrap.unbind('-');
}
export default  {
    mouseMove,
    config,
    init,
    destroy
}
