const config = {
    group: 2,
    position: 2,
    icon: '&#xe62b;',
    name: 'uploadImage',
    useKeyword: 'ctrl+f',
    hint: '上传图床'
}
// 工具初始化
function init(priorToolName, toolName) {
    const {port = 4126, bed = "", uploadLaterClose = false} = window.UToolsUtils.read('uploadImage/setting') || {};
    console.log(bed)
    this.canvasToBase64().then(async (imageBase64) => {
       try {
           const url = await fetch(`http://localhost:${port}`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: bed
                   ? `base64=${imageBase64}&autoCopy=true&bed=${bed}`
                   : `base64=${imageBase64}&autoCopy=true`
           }).then(res => res.text());
           if (url) {
               this.showTips('上传成功');
               if (uploadLaterClose) {
                   window.ipcRendererUtils.winClose();
               }
           }
       }catch (e) {
           this.showTips('上传失败');
       }finally {
           this.setCurrentTool(priorToolName);
       }
    });
}
export default {
    init,
    config,
}
