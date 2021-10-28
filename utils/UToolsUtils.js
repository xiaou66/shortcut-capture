class UToolsUtils {
  /**
   * 读取数据
   * @param key
   * @param onlyData
   * @return {boolean|*}
   */
  static read (key, onlyData = true) {
    if (!window.utools) {
      return {};
    }
    // @ts-ignore
    const data = window.utools.db.get(key)
    if (!data) {
      return false
    }
    const dataJ = data
    dataJ.data = JSON.parse(data.data)
    console.log('读取', dataJ)
    if (onlyData) {
      return dataJ.data
    } else {
      return dataJ
    }
  }

  /**
   * 获取全部文档
   * @param filter 过滤器
   * @param processor 处理
   */
  static readAll (filter = '', processor = true) {
    // @ts-ignore
    const data = filter ? window.utools.db.allDocs(filter) : window.utools.db.allDocs()
    debugger
    return processor
      ? data.map(item => {
        item.data = JSON.parse(item.data)
        item._id = item._id.replace(filter, '')
        return item
      })
      : data
  }

  /**
   * 保存数据
   * @param key
   * @param data
   */
  static update (key, data) {
    data = JSON.stringify(data)
    console.log('保存', data)
    const readData = UToolsUtils.read(key, false)
    let res
    if (!readData) {
      // @ts-ignore
      res = window.utools.db.put({
        _id: key,
        data: data,
        _rev: readData._rev
      })
    } else {
      // @ts-ignore
      res = window.utools.db.put({
        _id: key,
        data: data,
        _rev: readData._rev
      })
    }
    console.log('update', res)
  }

  /**
   * 保存
   * @param key key
   * @param data 数据
   */
  static save (key, data) {
    UToolsUtils.update(key, data)
  }

  static delete (key) {
    // @ts-ignore
    window.utools.db.remove(key)
  }
}
try {
  module.exports = UToolsUtils
}catch (e) {
  window.UToolsUtils = UToolsUtils;
}
