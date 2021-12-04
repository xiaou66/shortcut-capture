import rectangle from "./drawRectangle.js";
import circle from "./drawCircle.js";
import brush from "./drawBrush.js";
import drawArrow from "./drawArrow.js";
import move from "./move.js";
import textBox from "./createTextBox.js";
import drawErasure from "./drawErasure.js";
import saveImage from "./saveImage.js";
import suspension from "./suspension.js";
import uploadImage from "./uploadImage.js";
import close from "./close.js";
import drawMosaic from "./drawMosaic.js";
import ocr from "./ocr.js";
import backout from "./backout.js";
import saveClose from "./saveClose.js";
import drawStraightLine from "./drawStraightLine.js";
import serialNumberBox from "./createSerialNumberBox.js";
const tool = {
    rectangle,
    saveClose,
    circle,
    brush,
    move,
    textBox,
    arrow: drawArrow,
    erasure: drawErasure,
    saveImage,
    suspension,
    uploadImage,
    ocr,
    close,
    mosaic: drawMosaic,
    backout,
    straightLine: drawStraightLine,
    serialNumberBox,
}
/**
 * 工具类
 * @param toolName 工具名称
 * @param event 事件
 * @return 对应方法
 */
export default (toolName, event) => {
    console.log(toolName)
    return tool[toolName] ? tool[toolName][event] : undefined;
}
function GroupBy(array, fn) {
    debugger;
    const groups = {};
    array.forEach(function (item) {
        const group = JSON.stringify(fn(item));
        //这里利用对象的key值唯一性的，创建数组
        groups[group] = groups[group] || [];
        groups[group].push(item);
    });
    //最后再利用map循环处理分组出来
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
}
export const getToolConfig = (toolName) => {
    return tool[toolName].config;
}
export const getToolEvent = (toolName, event) => {
    return tool[toolName][event];
}
// 工具箱初始化方法
export function toolBoxInit() {
    const data = UToolsUtils.read('toolShowSwitchData') || [];
    const hideToolNames = data.filter(item => !item.enable).map(item => item.name);
    console.log(hideToolNames);
    const configs = Object.keys(tool).map(key => {
        const config = tool[key].config;
        if (config) {
            // 绑定按键事件
            if (config.useKeyword) {
                const keyData = UToolsUtils.read('globalKey') || {};
                if (keyData[config.name]) {
                    config.useKeyword = keyData[config.name].split('|');
                }
                window.Mousetrap.bind(config.useKeyword,
                    () => this.setCurrentTool(config.name));
            }
            // 配置默认值
            if (!config.group) {
                tool[key].config.group = 0;
            }
            if (!config.position) {
                tool[key].config.position = Date.now();
            }
            return tool[key].config;
        }
        console.log(`${key}未配置`);
        return '';
    }).filter(item => item !== '')
      .filter(item => !hideToolNames.includes(item.name));
    if (configs.length === 0) {
        document.getElementById('toolbar')?.remove();
        return;
    }
    // 进行分组
    const results = GroupBy(configs,  (item) => [item.group])
        .sort((a, b) => a[0].group - b[0].group)
        .map(configs => configs.sort((a, b) => a.position - b.position));
    const $toolbar = document.getElementById('toolbar');
    // 清空元素
    while($toolbar.lastChild) {
        $toolbar.removeChild($toolbar.lastChild);
    }

    // 生成到页面
    results.map(configs => {
        // 生成分隔符
        const $separator = document.createElement('div');
        $separator.className = 'separator';
        $toolbar.append($separator);
        configs.map(config => {
            // 生成工具
            const $tool = document.createElement('div');
            $tool.id = `tool-${config.name}`;
            $tool.className = 'iconfont tool';
            $tool.innerHTML = config.icon;
            $tool.setAttribute('name', config.name);
            $toolbar.append($tool);
            if (config.hint) {
                tippy(`#tool-${config.name}`, {
                    content: config.hint,
                });
            }
        });
    })
    // 删除第一个分隔符
    document.querySelector('#toolbar>.separator:first-child')?.remove();
}
function limitNumber() {
    this.value=this.value.replace(/\D/g,'');
}

// 设置为数字输入框增加条件
document.querySelectorAll('input[name="number"]').forEach($inputNumber => {
    $inputNumber.onkeyup = limitNumber;
});
