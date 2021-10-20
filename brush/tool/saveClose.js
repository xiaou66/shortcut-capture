const config = {
    group: 3,
    position: 3,
    icon: '&#xeaf1;',
    name: 'saveClose',
    useKeyword: ['ctrl+shift+c', 'enter']
}
const data = window.UToolsUtils.read('globalKey');
if (data) {
    const keyword = data[config.name]
    if (keyword) {
        config.useKeyword = keyword.split('|');
    }
}
// 工具初始化
function init(priorToolName, toolName) {
    this.canvasToBase64().then(base64 => {
        utools.copyImage(base64);
        window.ipcRendererUtils.winClose();
    })
}
export default {
    init,
    config,
}
