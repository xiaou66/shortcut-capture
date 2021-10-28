const config = {
    group: 2,
    position: 1,
    icon: '&#xe7f1;',
    useKeyword: 'q',
    name: 'suspension',
    hint: '去悬浮插件',
}
// 工具初始化
function init(priorToolName, toolName) {
    this.canvasToBase64().then(imageBase64 => {
        window.ipcRendererUtils.sendMainMessage('goto:suspension', {base64: imageBase64});
        window.ipcRendererUtils.winClose();
    });
}
export default {
    init,
    config,
}
