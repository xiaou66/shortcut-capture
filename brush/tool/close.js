const config = {
    group: 3,
    position: 2,
    icon: '&#xeca0;',
    name: 'close',
    hint: '关闭',
    useKeyword: 'esc'
}
// 工具初始化
function init(priorToolName, toolName) {
    window.ipcRendererUtils.winClose();
}
export default {
    init,
    config,
}
