const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class ScreenshotsPosition extends Component{
    saveKey = 'screenshotsPosition/setting';
    constructor(props) {
        super(props);
        const { autoCenter = false } = UToolsUtils.read(this.saveKey) || {};
        this.data = { autoCenter };
        setTimeout(() => {
            if (autoCenter) {
                document.getElementById('autoCenter').setAttribute('checked', true);
            }
        })
    }
    saveData() {
        UToolsUtils.save(this.saveKey, this.data);
    }
    updateAutoCenter () {
        this.data.autoCenter = !this.data.autoCenter;
        this.saveData();
    }
    render() {
        return jsx`
          <div class="modal">
                <div class="title">上传后截图位置</div>
                <div class="form-item">
                  <div class="tips">关闭随鼠标位置开启</div>
                  <div class="switchBox">
                    <input type="checkbox" id="autoCenter" />
                    <label class="switch-label" for="autoCenter" onclick=${(e) => this.updateAutoCenter(e)}>Toggle</label>
                  </div>
                </div>
            </div>
        `;
    }
}
module.exports = ScreenshotsPosition;
