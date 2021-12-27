const { jsx, Component} = require('nano-jsx');
const ScreenshotsPosition = require('./ScreenshotsPosition.jsx');
class OtherSetting extends Component{
    render() {
        return jsx`
          <${ScreenshotsPosition} />
        `;
    }
}
module.exports = OtherSetting;
