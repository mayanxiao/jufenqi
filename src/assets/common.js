var Rxports = {
  /**
   * 获得当前页面的文件名
   */
  GetThisPage: () => {
    let urlArr = window.location.href.split('/')
    let fileName = urlArr[urlArr.length - 1]
    return fileName.split('.html')[0]
  },
  /**
   * 获取当前页面所带的参数
   */
  GetRequest: () => {
    let url = window.location.search
    let theRequest = {}
    if (url.indexOf('?') !== -1) {
      let strs = url.substr(1).split('&')
      for (let str of strs) {
        theRequest[str.split('=')[0]] = decodeURIComponent(str.split('=')[1])
      }
    }
    return theRequest
  },
  /**
   * 设置localStorage中的数据
   * @param {String}   item
   * @param {String}   key
   * @param {String|Object|Array}   data
   * @param {Function} cb
   */
  SetLocalData: (item, key, data, cb) => {
    let tempdata
    if (window.localStorage.getItem(item) === undefined) {
      window.localStorage.setItem(item, '{}')
      tempdata = JSON.parse(window.localStorage.getItem(item))
    } else {
      tempdata = JSON.parse(window.localStorage.getItem(item))
    }
    tempdata[key] = data
    window.localStorage.setItem(item, JSON.stringify(tempdata))
    cb()
  },
  /**
   * 鉴权
   * @param {Module}   axios 将jwt鉴权相关注入axios common header中
   */
  auth: (axios) => {
    try {
      let now = Number(new Date().getTime())
      if (Number(JSON.parse(localStorage.user).expiredAt) < now
        // ||!JSON.parse(localStorage.user).profile.mobile
      ) {
        localStorage.removeItem('user')
        location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
      }
      axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem('user')).tokenType + ' ' + JSON.parse(localStorage.getItem('user')).token
    } catch (e) {
      localStorage.clear()
      location.href = './wxAuth.html?url=' + encodeURIComponent(location.href)
    }
  }
}

module.exports = Rxports
