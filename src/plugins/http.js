import config from '../config';
import cookieUtil from './cookie';

const getResponse = function (url, data = {}, opt = {}) {
  opt.url = (/^http/i).test(url) ? url : `${config.api || ''}${url}`;
  opt.data = data;
  // 手动设置cookie
  opt.header = Object.assign(opt.header || {}, {
    Cookie: cookieUtil.getAllString(),
  });

  const reqPromise = new Promise((resolve, reject) => {
    const requestTask = wx.request(Object.assign(opt, {  // eslint-disable-line
      success(res) {
        // 手动模拟set-cookie
        const setCookieStr = res.header['Set-Cookie'] || res.header['set-cookie'];
        setCookieStr && cookieUtil.parseSetCookie(setCookieStr);
        // 处理返回结果
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error('网络错误，请稍后再试'));
        }
      },
      fail() {
        reject(new Error('网络错误，请稍后再试'));
      },
    }));
    // 10秒超时
    setTimeout(() => {
      requestTask.abort();
      reject(new Error('网络超时，请稍后再试'));
    }, 10000);
  });

  return reqPromise;
};

const get = function (url, data = {}, opt = {}) {
  return getResponse(url, data, opt).then((result) => {
    if (result.code === 0) {
      return result.data;
    }
    throw new Error(result.msg || result.message);
  });
};

const post = function (url, data = {}, opt = {}) {
  opt.method = 'POST';
  opt.header = opt.header || {};
  opt.header['Content-Type'] = opt.header['Content-Type'] || opt.header['content-type'] || 'application/json';
  return get(url, data, opt);
};

export default {
  get,
  post,
  getResponse,
};
