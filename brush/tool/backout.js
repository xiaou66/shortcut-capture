import tool from "./index.js";
const config = {
    group: 1,
    position: 11,
    icon: '&#xea12;',
    name: 'backout',
    useKeyword: 'ctrl+z',
    hint: '撤回',
}
// 工具初始化
function init(priorToolName, toolName) {
    if (!this.history.length) {
        this.showTips('没有更多历史记录了');
        this.setCurrentTool(priorToolName);
        return;
    }
    const {type, data} = this.history.pop();
    if (type === 'draw') {
        this.drawContext.putImageData(data, 0, 0);
    } else {
        const rollBack = tool(type, 'rollBack');
        if (rollBack) {
            rollBack.bind(this)(data);
        }
    }
    this.setCurrentTool(priorToolName);
}
export default {
    init,
    config,
}
