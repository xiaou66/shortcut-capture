const { jsx, Component} = require('nano-jsx');
const UploadImage = require('./UploadImage.jsx');
const OCR = require('./OCR.jsx');
class ToolSetting extends Component{
    render() {
        return jsx`
           <${UploadImage} />
           <${OCR} />
        `;
    }
}
module.exports = ToolSetting;
