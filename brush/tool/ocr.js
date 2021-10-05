const config = {
    group: 2,
    position: 3,
    icon: '&#xe605;',
    name: 'ocr',
    useKeyword: 'ctrl+q'
}
// 工具初始化
function init(priorToolName, toolName) {
    this.canvasToBase64().then(imageBase64 => {
        console.log(imageBase64)
        utools.redirect('ocr', {
            'type': 'img',
            'data': imageBase64
        });
        utools.showMainWindow();
        window.ipcRendererUtils.winClose();
    });
}
export default {
    init,
    config,
}
