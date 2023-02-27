// 这个工具类只放这个插件处理的工具方法
const path = require('path');
const UToolsUtils = require('./UToolsUtils');
const mineMap = {
  "image/bmp" : "bmp",
  "image/gif" : "gif",
  "image/heic" : "heic",
  "image/jpeg" : "jpg",
  "image/png" : "png",
  "image/svg+xml" : "svg",
  "image/webp" : "webp",
  "image/x-icon" : "ico"
}
const getFormatSavePath = (formatPath, fileName, { timestamp = false } = {}) => {
  if (!/{.*?}/.test(formatPath)) {
    // 在没有配置动态路径时
    if (timestamp) {
      return path.join(formatPath, Date.now().toString() + fileName)
    }
    return path.join(formatPath, fileName)
  }
  /**
   * 允许格式化的关键词
   * @type {string[]} Y-年 M-月 D-日 H-时 m-分 s-秒 rand-10位 随机字符串 since_millisecond 毫秒时间戳 since_second 秒时间戳
   */
  const enableKeywords = ['Y', 'M', 'D', 'H', 'm', 's', 'rand', 'ms', 'since_millisecond', 'since_second']
  const date = new Date()
  const option = {
    Y: date.getFullYear().toString(),
    M: (date.getMonth() + 1).toString(),
    D: date.getDate().toString(),
    H: date.getHours().toString().padStart(2, '0'),
    m: date.getMinutes().toString().padStart(2, '0'),
    s: date.getSeconds().toString().padStart(2, '0'),
    ms: date.getMilliseconds().toString(),
    rand: Math.random().toString(36).slice(-10),
    since_millisecond: Date.now(),
    since_second: Math.round(Date.now() / 1000),
  }
  const noFilename = formatPath.includes('{no_filename}')
  const rewrite = formatPath.includes('filename') || noFilename
  if (noFilename) {
    formatPath = formatPath.replace('{no_filename}', '')
  }
  for (const key of enableKeywords) {
    if (option[key]) {
      formatPath = formatPath.replace(new RegExp('\\{' + key + '\\}', 'g'), option[key])
    }
  }
  if (rewrite) {
    return formatPath
  }
  return formatPath
}


/**
 * 获取保存路径
 * @param imageBase64 图片 base64
 */
const getSavePath = (imageBase64) => {
  let [src, type, base64] = imageBase64.match(/^data:(image\/.+);base64,(.*)/)
  let suffix = mineMap[type]
  let defaultPath = utools.getPath('downloads');
  const data = UToolsUtils.read('SaveFileName/setting');
  console.log('getSavePath:66:SaveFileName/setting', data)
  if (data && data.filenameFormat) {
    defaultPath = path.join(defaultPath, getFormatSavePath(data.filenameFormat, ''));
  } else {
    defaultPath = path.join(defaultPath, Date.now().toString())
  }
  defaultPath += '.' + suffix;
  return defaultPath;
}
module.exports = {
  getSavePath,
}

