const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
const Mousetrap = require('mousetrap-record')(require('../../brush/lib/mousetrap.min.js'));

class ToolSetting extends Component{
    saveKey = 'globalKey'
    keywordDefaultData = {
        copy: 'ctrl+c',
        "saveClose": 'ctrl+shift+c|enter',
        uploadImage: 'ctrl+f',
        ocr: 'ctrl+r',
        tab: 'tab',
        clear: 'ctrl+p',
        clearAll: 'ctrl+shift+p',
        randomColor: 'ctrl+r',
        textBox: 'ctrl+t',
        serialNumberBox: 'ctrl+y',
        move: '1',
        close: 'esc',
        suspension: 'q',
    }
    generateHtmlData = [
        { label: '复制', dataKey: 'copy' },
        { label: '复制并关闭', dataKey: 'saveClose' },
        { label: '上传图床', dataKey: 'uploadImage' },
        { label: '文本工具', dataKey: 'textBox'},
        { label: '序号工具', dataKey: 'serialNumberBox' },
        { label: 'OCR', dataKey: 'ocr' },
        { label: '显示/隐藏工具条', dataKey: 'tab' },
        { label: '墨迹清屏', dataKey: 'clear' },
        { label: '全部清屏', dataKey: 'clearAll' },
        { label: '随机颜色', dataKey: 'randomColor' },
        { label: '去悬浮工具', dataKey: 'suspension' },
        { label: '拖拽工具', dataKey: 'move' },
        { label: '关闭', dataKey: 'close'},
    ];
    constructor(props) {
        super(props);
        this.keywordData = {...this.keywordDefaultData, ...UToolsUtils.read(this.saveKey)}
    }
    showTips(msg) {
        const $div = document.getElementById('showTips');
        $div.innerText = msg;
        $div.style.display = 'block'
        setTimeout(() => {
            $div.style.display = 'none'
        }, 1000);
    }
    recordKeyWord(e) {
        if (e.altKey && e.key === 'r') {
            this.showTips('开始录制请按下按键');
            e.target.setAttribute('readonly', true);
            Mousetrap.record((sequence) => {
                this.showTips('录制结束');
                if (!sequence.length) {
                    return;
                }
                e.target.value = e.target.value ?
                    e.target.value + "|" + sequence[0] :
                    sequence[0];
                e.target.removeAttribute('readonly')
            }, 2000);
        }
    }
    valueChange(e, name) {
        this.keywordData[name] = e.target.value;
        this.saveData();
    }
    saveData() {
        UToolsUtils.save(this.saveKey, this.keywordData);
    }
    generateHtml() {
        const html = this.generateHtmlData.map(({label, dataKey}) => (jsx`
            <div class="form-item inputBox">
                <div class="tips">${label}</div>
                <div class="input">
                  <input id="${dataKey}" value="${this.keywordData[dataKey]}"  type="text" required
                  onKeyUp=${(e) => this.recordKeyWord(e)}
                  onChange=${(e) => this.valueChange(e, dataKey)}/>
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label for="${dataKey}">快捷键按「|」分割,按「alt + r」开始录制</label>
                 </div>
            </div>
        `))
        return html;
    }
    render() {
        return jsx`
            <div id="showTips"></div>
            <div style="display:flex;flex-direction:column;align-items: center;width: 100%;">
                ${this.generateHtml()}
            </div>
        `;
    }
}
module.exports = ToolSetting;
