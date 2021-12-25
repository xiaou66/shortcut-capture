const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class SaveFileName extends Component{
    saveKey = 'SaveFileName/setting';
    constructor(props) {
        super(props);
        const {filenameFormat = ''} = UToolsUtils.read(this.saveKey) || {};
        this.data = { filenameFormat };
    }
    saveData() {
        UToolsUtils.save(this.saveKey, this.data);
    }
    valueChange(e, name) {
        this.data[name] = e.target.value;
        this.saveData();
    }
    render(_update) {
        return jsx`
            <div class="modal">
                <div class="title">保存设置</div>
                <div class="form-item inputBox">
                  <div class="tips">保存文件名格式</div>
                  <div class="input">
                      <input value="${this.data.filenameFormat}"  type="text" required
                      onChange=${(e) => this.valueChange(e, 'filenameFormat')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>设置保存的文件名称{Y}-{M}-{D}</label>
                  </div>
                </div>
                <div style="display: flex;justify-content: center;text-align: center">
                    <div>Y-年 M-月 D-日 H-时 m-分 s-秒 rand-10位 随机字符串</div>
                    <div>since_millisecond-毫秒时间戳 since_second-秒时间戳</div>
                </div>
            </div>
        `;
    }
}
module.exports = SaveFileName
