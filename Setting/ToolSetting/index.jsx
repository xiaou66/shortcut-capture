const { jsx, Component} = require('nano-jsx');
const UploadImage = require('./UploadImage.jsx');
const OCR = require('./OCR.jsx');
const SaveFileName = require('./SaveFileName.jsx');
class ToolSetting extends Component{
    render() {
        return jsx`
           <${UploadImage} />
           <${OCR} />
           <${SaveFileName} />
        `;
    }
}
module.exports = ToolSetting;
