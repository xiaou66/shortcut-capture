const {Fragment, jsx, Component} = require('nano-jsx');
const {PureCss, CustomCss} = require('./css.js');
const ToolSetting = require('./ToolSetting/index.jsx');
const GlobalKeyWord = require('./GlobalKeyWord/index.jsx');
const ToolShowSwitch = require('./ToolShowSwitch/index.jsx');
class SettingUI extends Component{
    settingMenu = {
        currentMenu: '工具设置',
        menus: [
            {id: 1, name: '工具设置', component: ToolSetting},
            {id: 2, name: '全局快捷键', component: GlobalKeyWord},
            {id: 3, name: '工具显示切换', component: ToolShowSwitch}
        ]
    }
    swatchMenu({name}) {
        this.settingMenu.currentMenu = name;
        this.update();
    }
    render() {
        return jsx`
         <div id="setting">
            <div class="pure-g">
                <div class="pure-u-1-5">
                 ${this.settingMenu.menus.map((item) => (
                   jsx` <div class="${this.settingMenu.currentMenu === item.name ? 'menu active' : 'menu'}" 
                               onClick=${() => this.swatchMenu(item)}>
                            ${item.name}
                        </div>`))}
                </div>
                <div class="pure-u-4-5 content router" style="position:relative;">
                    <${this.settingMenu.menus.find(item => item.name === this.settingMenu.currentMenu).component}/>
                </div>
            </div>
          </div>`
    }
}
const app = () => {
    return jsx`
<${Fragment}>
<head>
  <title>Setting</title>
  <script src="index.js"/>
  <style>${PureCss}</style>
  <style>${CustomCss}</style>
</head>
<body>
  <div id="root"/>
   <${SettingUI} />
</body>
</${Fragment}>`
}
module.exports = {
    SettingUI: app
}
