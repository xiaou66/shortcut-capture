function Utils () {}
/**
 * 动态解析路径
 * @param formatPath 待解析路径
 * @param fileName 文件名
 * @param timestamp 时间戳
 * @return {string|*} 处理后的文件名
 */
Utils.getSavePath = (formatPath, fileName, { timestamp = false } = {}) => {
    if (!/{.*?}/.test(formatPath)) {
        // 在没有配置动态路径时
        if (timestamp) {
            return window.path.join(formatPath, Date.now().toString() + fileName)
        }
        return window.path.join(formatPath, fileName)
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

export default Utils;
