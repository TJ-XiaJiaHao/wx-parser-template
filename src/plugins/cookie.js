/**
 * 利用 storage 模拟 cookie 操作
 * 请求等情况下数据要求较高，所以需要同步操作
 * cookie 存储格式：{ key: { value: 'value', expires: 1526452752000 } }
 */

const storageKey = 'reqCookie';

const Fn = {
  // 获取 cookie 字符串
  getAllString() {
    const cookie = this._getAll();
    const deleteArr = [];
    const result = [];
    Object.keys(cookie).forEach(key => {
      if (typeof cookie[key] !== 'object' || this._checkExpires(cookie[key]) || !cookie[key].value) {
        deleteArr.push(key);
      } else {
        result.push(`${key}=${cookie[key].value}`);
      }
    });
    this.batchDelete(deleteArr);
    return result.join('; ');
  },

  // 获取 cookie 中一个字段
  get(key) {
    if (!key) return;

    const cookie = this._getAll();
    if (this._checkExpires(cookie[key]) || typeof cookie[key] !== 'object') {
      this.delete(key);
    }
    return cookie[key] && cookie[key].value;
  },

  // 设置 cookie 中一个字段
  set(key, value) {
    if (!key) return false;

    try {
      const cookie = this._getAll();
      cookie[key] = typeof value === 'object' ? value : { value };
      wx.setStorageSync(storageKey, JSON.stringify(cookie));
      return true;
    } catch (e) {
      console.error(e);  // eslint-disable-line
      return false;
    }
  },

  // 设置 cookie 多个字段
  batchSet(obj) {
    if (!obj || typeof obj !== 'object') return false;

    try {
      const cookie = this._getAll();
      Object.keys(obj).forEach(key => {
        obj[key] = typeof obj[key] === 'object' ? obj[key] : { value: obj[key] };
      });
      Object.assign(cookie, obj);
      wx.setStorageSync(storageKey, JSON.stringify(cookie));
      return true;
    } catch (e) {
      console.error(e);  // eslint-disable-line
      return false;
    }
  },

  // 删除 cookie 中一个字段
  delete(key) {
    if (!key) return false;

    try {
      const cookie = this._getAll();
      cookie[key] && (delete cookie[key]);  // eslint-disable-line
      wx.setStorageSync(storageKey, JSON.stringify(cookie));
      return true;
    } catch (e) {
      console.error(e);  // eslint-disable-line
      return false;
    }
  },

  // 删除 cookie 多个字段
  batchDelete(keyArr) {
    if (!keyArr || !keyArr.length) return false;

    try {
      const cookie = this._getAll();
      keyArr.forEach(key => {
        cookie[key] && (delete cookie[key]);  // eslint-disable-line
      });
      wx.setStorageSync(storageKey, JSON.stringify(cookie));
      return true;
    } catch (e) {
      console.error(e);  // eslint-disable-line
      return false;
    }
  },

  // 清除 cookie
  clear() {
    try {
      wx.setStorageSync(storageKey, '{}');
      return true;
    } catch (e) {
      console.error(e);  // eslint-disable-line
      return false;
    }
  },

  // 解析 set-cookie
  parseSetCookie(str) {
    if (!str) return;

    const expiresReg = /expires=([^;]+);/gi;
    const setCookieStr = str.replace(expiresReg, (match, time) => `expires=${new Date(time).getTime()};`).replace(/\s+/gi, '');
    const cookieObj = {};
    setCookieStr.split(',').forEach(cookieStr => {
      let key;
      cookieStr.split(';').forEach((part, index) => {
        try {
          const cArr = part.split('=');
          if (index === 0) {
            key = cArr[0];
            cookieObj[key] = { value: cArr[1] };
          } else if (cArr[0] === 'expires') {
            cookieObj[key].expires = cArr[1];
          }
        } catch (e) {
          console.error(e);  // eslint-disable-line
        }
      });
    });
    this.batchSet(cookieObj);
  },

  // 检查 cookie 是否过期
  _checkExpires(valueObj) {
    return valueObj && valueObj.expires && Date.now() > valueObj.expires;
  },

  // 获取 cookie 对象
  _getAll() {
    let cookie = {};
    try {
      const storage = wx.getStorageSync(storageKey);
      cookie = storage ? JSON.parse(storage) : {};
    } catch (e) {
      console.error(e);  // eslint-disable-line
    }
    return cookie;
  },
};

export default Fn;
