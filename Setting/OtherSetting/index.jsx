const { jsx, Component} = require('nano-jsx');
const ScreenshotsPosition = require('./ScreenshotsPosition.jsx');
// const BorderStyle = require('./BorderStyle.jsx');
class OtherSetting extends Component{
    render() {
        return jsx`
          <${ScreenshotsPosition} />
        `;
    }
}
module.exports = OtherSetting;
