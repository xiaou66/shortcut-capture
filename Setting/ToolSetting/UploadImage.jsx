const { jsx, Component} = require('nano-jsx');
const UToolsUtils = require('../../utils/UToolsUtils.js');
class UploadImage extends Component{
    saveKey = 'uploadImage/setting';
    constructor(props) {
        super(props);
        const {port = 4126, bed = "", uploadLaterClose = true} = UToolsUtils.read(this.saveKey) || {};
        this.data = { port, bed, uploadLaterClose };
        setTimeout(() => {
            if (uploadLaterClose) {
                document.getElementById('uploadLaterClose').setAttribute('checked', true)
            }
        })
    }
    limitNumber(e) {
        e.target.value=e.target.value.replace(/\D/g,'');
    }
    portValueChange(e) {
        e.target.value=e.target.value.replace(/\D/g,'');
        this.data.port = e.target.value;
        console.log(this.data.port);
        this.saveData();
    }
    bedValueChange(e) {
        this.data.bed = e.target.value;
        this.saveData();
    }
    saveData() {
        UToolsUtils.save(this.saveKey, this.data);
    }
    uploadLaterCloseHandler(e) {
        this.data.uploadLaterClose = !this.data.uploadLaterClose;
        // this.update();
        this.saveData();
    }
    render() {
        return jsx`
            <div class="modal">
                <div class="title">图床功能</div>
                <div class="form-item inputBox">
                  <div class="tips">服务端口</div>
                  <div class="input">
                      <input value="${this.data.port}"  type="text" required 
                      onKeyUp=${(e) => this.limitNumber(e)} 
                      onChange=${(e) => this.portValueChange(e)}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>需要和图床插件设置端口一致</label>
                  </div>
                </div>
                <div class="form-item inputBox">
                  <div class="tips">图床设置</div>
                  <div class="input">
                      <input value=${this.data.bed}  type="text" required 
                      onChange=${(e) => this.bedValueChange(e)}/>
                      <span class="highlight"></span>
                      <span class="bar"></span>
                      <label>图床插件中图床值忽略大小写</label>
                  </div>
                </div>
                <div class="form-item">
                  <div class="tips">上传后关闭</div>
                  <div class="switchBox">
                    <input type="checkbox" id="uploadLaterClose" />
                    <label class="switch-label" for="uploadLaterClose" onclick=${(e) => this.uploadLaterCloseHandler(e)}>Toggle</label>
                  </div>
                </div>
            </div>
        `;
    }
}
module.exports = UploadImage;
