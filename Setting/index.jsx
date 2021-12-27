const { Fragment, jsx, Component } = require('nano-jsx');
const { CustomCss } = require('./css.js');
const ToolSetting = require('./ToolSetting/index.jsx');
const GlobalKeyWord = require('./GlobalKeyWord/index.jsx');
const ToolShowSwitch = require('./ToolShowSwitch/index.jsx');
const OtherSetting = require('./OtherSetting/index.jsx');
const { enable:  enableDarkMode, disable:  disableDarkMode} = require('darkreader');
class SettingUI extends Component{
    settingMenu = {
        currentMenu: '工具设置',
        menus: [
            {id: 1, name: '工具设置', component: ToolSetting},
            {id: 2, name: '全局快捷键', component: GlobalKeyWord},
            {id: 3, name: '工具显示切换', component: ToolShowSwitch},
            {id: 4, name: '其他设置', component: OtherSetting},
        ]
    }
    constructor(props) {
        super(props);
    }
    swatchMenu({name}) {
        this.settingMenu.currentMenu = name;
        this.update();
    }
    didMount() {
        return super.didMount();
    }
    setTheme() {
        if (utools.isDarkColors()) {
            enableDarkMode({
                darkSchemeBackgroundColor: '#303133'
            });
        } else {
            disableDarkMode();
        }
    }
    render() {
        this.setTheme();
        window.setSettingTheme = this.setTheme;
        return jsx`
         <div id="setting">
            <div>
             ${this.settingMenu.menus.map((item) => (
               jsx` <div class="${this.settingMenu.currentMenu === item.name ? 'menu active' : 'menu'}" 
                           onClick=${() => this.swatchMenu(item)}>
                        ${item.name}
                    </div>`))}
            </div>
            <div class="content router" style="position:relative;">
                <${this.settingMenu.menus.find(item => item.name === this.settingMenu.currentMenu).component}/>
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
