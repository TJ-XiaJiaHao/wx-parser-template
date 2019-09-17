import cookieUtil from '../plugins/cookie.js';
const settings = {
  loginCb: null,
  logoutCb: null,
};

// 设置 openid
function setOpenid(openid) {
  try {
    wx.setStorageSync('openid', openid);
  } catch (e) {
    console.error(e);  // eslint-disable-line
  }
}

// 设置登录 cookie
function login(accountId, openid) {
  // 设置 openid，用于登录
  if (openid) {
    setOpenid(openid);
  }
  return cookieUtil.batchSet({ accountId });
}

// 判断是否设置登录 cookie
function hasCookie() {
  return cookieUtil.get('accountId');
}

// 清除登录 cookie
function clearCookie() {
  return cookieUtil.batchDelete(['accountId']);
}

// 清除登录 cookie & 登出
function logout() {
  clearCookie();
  execLogoutCb();
}

// 设置登录成功回调
function setLoginCb(cb) {
  cb && typeof cb === 'function' && (settings.loginCb = cb);
}

// 执行登录回调
function execLoginCb() {
  settings.loginCb && typeof settings.loginCb === 'function' && settings.loginCb();
  settings.loginCb = null;
}

// 设置登出成功回调
function setLogoutCb(cb) {
  cb && typeof cb === 'function' && (settings.logoutCb = cb);
}

// 执行登出回调
function execLogoutCb() {
  settings.logoutCb && typeof settings.logoutCb === 'function' && settings.logoutCb();
  settings.logoutCb = null;
}

module.exports = {
  login,
  hasCookie,
  clearCookie,
  logout,
  setOpenid,

  setLoginCb,
  execLoginCb,

  setLogoutCb,
  execLogoutCb,
};
