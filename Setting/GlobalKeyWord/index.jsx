const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
const Mousetrap = require('../../brush/lib/mousetrap-record.js')(require('../../brush/lib/mousetrap.min.js'));
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
        randomColor: 'ctrl+r'
    }

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
    render() {
        return jsx`
            <div id="showTips"></div>
            <div style="margin-top: 30px;display:flex;flex-direction:column;align-items: center;max-height: 90vh;overflow-y: auto;width: 100%;">
                <div class="form-item inputBox">
                    <div class="tips">复制</div>
                    <div class="input">
                      <input value="${this.keywordData.copy}"  type="text" required 
                      onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'copy')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                    <div class="tips">复制并关闭</div>
                    <div class="input">
                      <input value="${this.keywordData['saveClose']}"  type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'saveClose')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                       <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                    <div class="tips">上传图床</div>
                    <div class="input">
                      <input value="${this.keywordData.uploadImage}"  type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'uploadImage')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                       <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                    <div class="tips">OCR</div>
                    <div class="input">
                      <input value="${this.keywordData.ocr}"  type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'ocr')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                    <div class="tips">显示/隐藏工具条</div>
                    <div class="input">
                      <input value="${this.keywordData.tab}" type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'tab')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                 <div class="form-item inputBox">
                    <div class="tips">墨迹清屏</div>
                    <div class="input">
                      <input value="${this.keywordData.clear}" type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'clear')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                 <div class="form-item inputBox">
                    <div class="tips">全部清屏</div>
                    <div class="input">
                      <input value="${this.keywordData.clearAll}" type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'clearAll')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                    <div class="tips">随机颜色</div>
                    <div class="input">
                      <input value="${this.keywordData.randomColor}" type="text" required onKeyUp=${(e) => this.recordKeyWord(e)}
                      onChange=${(e) => this.valueChange(e, 'randomColor')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>快捷键按「|」分割,按「alt + r」开始录制</label>
                  </div>
                </div>
            </div>
        `;
    }
}
module.exports = ToolSetting;
