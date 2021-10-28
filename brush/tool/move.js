const $containerMove = document.getElementById('container_move');
const config = {
    group: 0,
    position: 1,
    icon: '&#xe616;',
    name: 'move',
    useKeyword: '1',
    hint: '拖拽',
}
function init(priorToolName, toolName) {
    $containerMove.style.display = 'block'
}
function destroy() {
    $containerMove.style.display = 'none'
}
export default  {
    init,
    destroy,
    config
}
