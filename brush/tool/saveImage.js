const config = {
    group: 3,
    position: 1,
    icon: '&#xe625;',
    name: 'saveImage',
    hint: '保存',
}
// 工具初始化
function init(priorToolName, toolName) {
    this.saveImageToFile().then(() => {
        console.log(priorToolName)
        this.setCurrentTool(priorToolName);
    });
}
export default  {
    config,
    init,
}
