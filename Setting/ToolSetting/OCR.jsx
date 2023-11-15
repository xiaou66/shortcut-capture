const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class OCR extends Component{
    saveKey = 'ocr/setting';
    constructor(props) {
        super(props);
        const {ocrName = 'OCR 识别'} = UToolsUtils.read(this.saveKey) || {};
        this.data = { ocrName };
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
                <div class="title">OCR功能</div>
                <div class="form-item inputBox">
                  <div class="tips">OCR 关键字</div>
                  <div class="input">
                      <input value="${this.data.ocrName}"  type="text" required
                      onChange=${(e) => this.valueChange(e, 'ocrName')}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>设置要使用的「OCR」插件关键字</label>
                  </div>
                </div>
            </div>
        `;
    }
}
module.exports = OCR
