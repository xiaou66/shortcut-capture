const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class ToolShowSwitch extends Component{
    defaultData = [
        { name: 'move', label: '拖拽工具', enable: true },
        { name: 'rectangle', label: '矩形工具', enable: true },
        { name: 'circle', label: '圆形工具', enable: true },
        { name: 'arrow', label: '箭头工具', enable: true },
        { name: 'straightLine', label: '直线工具', enable: true },
        { name: 'brush', label: '画笔工具', enable: true },
        { name: 'textBox', label: '文本工具', enable: true },
        { name: 'serialNumberBox', label: '序号工具', enable: true },
        { name: 'erasure', label: '橡皮擦工具', enable: true },
        { name: 'mosaic', label: '马赛克工具', enable: true },
        { name: 'backout', label: '撤回工具', enable: true },
        { name: 'suspension', label: '去悬浮插件工具', enable: true },
        { name: 'uploadImage', label: '上传图床工具', enable: true },
        { name: 'ocr', label: '识别工具', enable: true },
        { name: 'saveImage', label: '保存工具', enable: true },
        { name: 'close', label: '关闭工具', enable: true },
        { name: 'saveClose', label: '复制并关闭', enable: true },
    ]
    constructor(props) {
        super(props);
        const readData = UToolsUtils.read('toolShowSwitchData');
        if (!readData) {
            this.toolData = this.defaultData;
        }else {
            this.toolData = this.defaultData.map(defaultItem => {
                const item = readData.find(i => i.name === defaultItem.name) || {};
                return {...defaultItem, ...item};
            })
        }
        console.log(this.toolData);
    }
    swatchStatusChange(e, name) {
        const item = this.toolData.find(item => item.name === name);
        item.enable = e.target.checked;
        this.saveData();
    }
    saveData() {
        UToolsUtils.save('toolShowSwitchData', this.toolData);
    }
    render(_update) {
        return jsx `
             <div style="display: grid;justify-items: center;grid-template-columns: 45% 45%;width: 100%;">
                ${this.toolData.map(item => (
                    jsx`
                        <div class="form-item">
                            <div class="tips">${item.label}</div>
                            <div class="switchBox">
                               ${item.enable ? 
                                  jsx`<input type="checkbox" id="${item.name}" checked onchange="${(e) => this.swatchStatusChange(e, item.name)}"/>`:
                                  jsx`<input type="checkbox" id="${item.name}"  onchange="${(e) => this.swatchStatusChange(e, item.name)}"/>`}
                              <label class="switch-label" for="${item.name}">Toggle</label>
                            </div>
                        </div>
                    `))}
            </div>
        `
    }
}
module.exports = ToolShowSwitch;
