const { ipcRenderer } = require('electron');
class IpcRendererUtils {
    mainId;

    /**
     * 构造方法
     * @param initCallback 初始化回调函数
     * @param themeCallback 设置主题回调函数
     * @param windowCloseBefore 窗口关闭前不提供不绑定
     */
    constructor({initCallback = undefined, themeCallback = undefined, windowCloseBefore = undefined} = {}) {
        ipcRenderer.on('init', (event, data) => {
            data = JSON.parse(data || "{}");
            this.mainId = event.senderId;
            if (initCallback) {
                initCallback(data)
            }
        });

        if (windowCloseBefore) {
            window.onunload = (e) => {
                windowCloseBefore();
            }
        }

    }
    setIgnoreMouseEvents(value) {
        this.sendMainMessage('control::setIgnoreMouseEvents', { value });
    }
    /**
     * 发送信息到主窗口
     * @param messageId
     * @param data
     */
    sendMainMessage(messageId, data = {}) {
        console.log(JSON.stringify(data))
        ipcRenderer.sendTo(this.mainId, messageId, JSON.stringify(data));
    }
    /**
     * 设置窗口大小
     * @param width 宽度
     * @param height 高度
     */
     setSize(width, height) {
        console.log(width, height)
        this.sendMainMessage('control::resize', {width, height});
    }

    /**
     * 设置窗口位置
     * @param x
     * @param y
     */
     setPosition(x, y) {
        this.sendMainMessage('control::setPosition', {x, y});
    }

    /**
     * 关闭窗口
     */
     winClose() {
        this.sendMainMessage('control::close');
    }
}
module.exports = IpcRendererUtils;
