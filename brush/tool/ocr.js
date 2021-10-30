const config = {
    group: 2,
    position: 3,
    icon: '&#xe605;',
    name: 'ocr',
    useKeyword: 'ctrl+q',
    hint: '识别',
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
    this.canvasToBase64().then(imageBase64 => {
        const {ocrName = 'ocr'} = window.UToolsUtils.read('ocr/setting') || {};
        utools.showMainWindow();
        utools.redirect(ocrName, {
            'type': 'img',
            'data': imageBase64
        });
       setTimeout(() => {
           window.ipcRendererUtils.winClose();
       }, 100)
    });
}
export default {
    init,
    config,
}
