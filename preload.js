const { ipcRenderer } = require('electron')
window.runList = [];
const buildImage = async (base64) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = base64;
        image.onload = () => {
            resolve(image);
        }
    })
}
function getBase64Image(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return canvas.toDataURL("image/png");
}
const createWindow = async (imgBase64, callback = undefined) => {
    const point = utools.getCursorScreenPoint();
    const display = utools.getDisplayNearestPoint(point)
    console.log(imgBase64)
    const image = await buildImage(imgBase64);
    console.log(point);
    const win = utools.createBrowserWindow('./brush/index.html',{
        title: 'img',
        useContentSize: true,
        // 不能最大最小化
        minimizable: false,
        // 背景透明，防止放大缩小时出现白框
        transparent: true,
        backgroundColor: '#00000000',
        frame: false,
        alwaysOnTop: true,
        // resizable: false,
        webPreferences: {
            preload: './brush/preload.js',
            devTools: true
        }}, () => {
        const data = {
            dataURL: imgBase64
        }
        win.webContents.openDevTools({ mode: 'detach' });
        win.focus();
        const {width, height} = image;
        const x = point.x - width;
        const y = point.y - height;
        win.setPosition(x < 0 ? 0 : x >= display.size.width ? display.size.width : x,
            y < 0 ? 0 : y >= display.size.height ? display.size.height : y);
        // win.setResizable(false)
        ipcRenderer.sendTo(win.webContents.id, 'init', JSON.stringify(data));
        if (callback && typeof callback == 'function') {
            callback(win);
        }
        runList.push({ winId: win.webContents.id, win })
    })
}
window.exports = {
    "shortcutCapture": {
        mode: "none",
        args: {
            enter: async (action) => {
                const displays = utools.getAllDisplays()
                console.log(displays)
                utools.screenCapture(async (imgBase64) => {
                    await createWindow(imgBase64);
                    utools.outPlugin();
                });
                utools.hideMainWindow();
            }
        }
    },
    "pictureBase64": {
        mode: "none",
        args: {
            enter: async ({payload}) => {
                debugger;
                const payloads = payload.split("#");
                if (payloads.length === 1) {
                    await createWindow(payload);
                }else {
                    const [base64, params] = payloads;
                    await createWindow(base64, (win) => {
                        const {x, y} = parseData(params);
                        win.setPosition(parseInt(x), parseInt(y));
                    })
                }
                utools.outPlugin();
            }
        }
    },
    "shortcutCapture&copy":  {
        mode: "none",
            args: {
            enter: async ({payload}) => {
                utools.screenCapture(async (imgBase64) => {
                    utools.copyImage(imgBase64)
                    utools.hideMainWindow();
                    utools.outPlugin();
                });
                utools.hideMainWindow();
            }
        }
    }
}
// 窗口控制
/**
 * 通过「发送者ID」在运行窗口列表中找到对应的配置项
 * @param id 发送者ID
 * @return {*}
 */
function getRunItemById(id) {
    const index = runList.findIndex(item => item.winId === id);
    return { res: runList[index], index };
}
/**
 * 窗口关闭
 */
ipcRenderer.on('control::close', (event) => {
    const { res, index } = getRunItemById(event.senderId);
    console.log('close');
    try {
        if (res.win) {
            res.win.destroy();
        }
        if (index !== -1) {
            runList.splice(index, 1);
        }
    }catch (e) {
        if (index !== -1) {
            runList.splice(index, 1);
        }
    }
});
/**
 * 重新设置窗口大小
 */
ipcRenderer.on('control::resize', (event, data) => {
    const {res, index} = getRunItemById(event.senderId);
    data = JSON.parse(data);
    const size = res.win.getSize();
    const {width = size[0], height = size[1]} = data;
    res.win.setSize(Math.floor(width), Math.floor(height));
})
ipcRenderer.on('goto:suspension', (event, data) => {
    debugger;
    const {res, index} = getRunItemById(event.senderId);
    data = JSON.parse(data);
    const { base64 = '' } = data;
    if (!base64) {
        console.log('必选');
        return;
    }
    const [x, y] = res.win.getPosition();
    const display = utools.getDisplayNearestPoint({x, y });
    utools.redirect('悬浮base64图片', `${base64}#x=${x}&y=${y}&displayId=${display.id}`);
});

/**
 * 将 a=1&b=2 转换为对象{a: '1', b: '2'}
 * @param queryStr
 * @return {{}}
 */
function parseData(queryStr) {
    let queryData = {}
    let queryList = queryStr.split('&')
    for (let [index, queryItem] of queryList.entries()) {
        let itemList = queryItem.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}
