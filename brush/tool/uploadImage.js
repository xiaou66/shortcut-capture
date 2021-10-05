const config = {
    group: 2,
    position: 2,
    icon: '&#xe62b;',
    name: 'uploadImage',
    useKeyword: 'ctrl+f'
}
// 工具初始化
function init(priorToolName, toolName) {
    this.canvasToBase64().then(async (imageBase64) => {
       try {
           const url = await fetch('http://localhost:4126', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/x-www-form-urlencoded'
               },
               body: `base64=${imageBase64}&autoCopy=true`
           }).then(res => res.text());
           if (url) {
               this.showTips('上传成功');
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
