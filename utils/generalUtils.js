// 这个文件中放一些通用的工具方法

const fs = require('fs');
const { encode } = require("fast-png");

/**
 * 保存文件
 * @param base64 base64
 * @param savePath 保存目录
 */
const saveBase64 = (base64, savePath) => {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = new Buffer(base64Data, 'base64');
  fs.writeFileSync(savePath, dataBuffer);
}
const imageDataToBase64 = (imageData) => {
  return new Buffer(encode(imageData)).toString('base64');
}
module.exports = {
  saveBase64,
  imageDataToBase64,
}
