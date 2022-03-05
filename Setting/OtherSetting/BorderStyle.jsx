const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class BorderStyle extends Component{
    saveKey = 'borderStyle/setting';
    constructor(props) {
        super(props);
        const { borderStatus = false, borderStyle = '2px solid #000' } = UToolsUtils.read(this.saveKey) || {};
        this.data = { borderStatus, borderStyle };
        setTimeout(() => {
            if (borderStatus) {
                document.getElementById('borderStatus').setAttribute('checked', borderStatus);
            }
        })
    }
    saveData() {
        UToolsUtils.save(this.saveKey, this.data);
    }
    modifyData(e, key, value) {
        if (key === 'borderStatus') {
            this.data.borderStatus = !this.data.borderStatus
            console.log(this.data)
        }else {
            this.data[key] = value;
        }
        this.saveData();
    }
    render() {
        return jsx`
          <div class="modal">
               <div class="form-item">
                  <div class="tips">边框</div>
                  <div class="switchBox">
                    <input type="checkbox" id="borderStatus" />
                    <label class="switch-label" for="borderStatus" onclick=${(e) => this.modifyData(e, 'borderStatus', null)}>Toggle</label>
                  </div>
               </div>
               <div class="form-item inputBox">
                  <div class="tips">边框样式</div>
                  <div class="input">
                      <input value="${this.data.borderStyle}"  type="text" required
                      onChange=${({target: {value}}) => this.modifyData(e, 'borderStyle', value)}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>宽度 样式 颜色</label>
                  </div>
                </div>
           </div>
        `;
    }
}
module.exports = BorderStyle;
