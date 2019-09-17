import config from '../config';
import $http from '../plugins/http';
import qiniuUploader from '../plugins/qiniuUploader.js';

const ONE_SECOND = 1000;
const ONE_MINUTES = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTES;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;

// 获取七牛token
function getQiNiuToken() {
  return new Promise((resolve, reject) => {
    $http.get('/api/storagetoken').then(res => resolve(res.token)).catch(err => reject(err))
  });
}

// 上传文件
function uploadFiles(files) {
  return new Promise((resolve, reject) => {
    getQiNiuToken().then(token => {
      const len = files.length;
      if (len === 0) return resolve([]);

      let finished = 0;
      let remoteUrl = new Array(len);
      files.forEach((file, idx) => {
        qiniuUploader.upload(file, res => {
          // remoteUrl.push(`${config.qiniuDomain}${res.imageURL}`);
          remoteUrl[idx] = `${config.qiniuDomain}${res.imageURL}`
          if (++finished >= len) {
            resolve(remoteUrl);
          }
        }, err => {
          reject(err);
        }, {
          region: 'ECN',
          domain: '',
          uptoken: token
        });
      });
    })
  });
}

// 获取图片信息，并且判别是横版还是竖版图片
function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: res => {
        resolve({
          ...res,
          direction: Math.floor(res.width / res.height) ? 1 : 0,
          description: Math.floor(res.width / res.height) ? '横版图片' : '竖版图片',
        });
      },
      fail: () => reject()
    });
  });
}

// 替换字符串str中匹配到的正则子串
// 比如: 'hekeywordllo' -> 'he<span class="search-red">keyword</span>llo'
function addMark(str, regex) {
  return str.replace(regex, '<span class="search-red">$1</span>');
}

// 数字不满两位自动补零，比如: '8' -> '08'; '10' -> '10'
function fnZero(number) {
  if (number > 0) return number <= 9 ? `0${number}` : `${number}`;
  return '00';
}

// 时间戳转换为数组, 比如: 100000 -> ["1天", "03", "46", "40"] ; 10000 -> ["02", "46", "40"]
function dataFomart(time) {
  return Math.floor(time / 86400) > 0 ?
    [
      `${Math.floor(time / 86400)}天`,
      fnZero(Math.floor((time % 86400) / 3600)),         // 小时
      fnZero(Math.floor((time % 3600) / 60)),  // 分钟
      fnZero(Math.floor((time % 60))),         //秒
    ] :
    [
      fnZero(Math.floor(time / 3600)),         // 小时
      fnZero(Math.floor((time % 3600) / 60)),  // 分钟
      fnZero(Math.floor((time % 60))),         //秒
    ];
}

// 转义特殊字符
function unescapeHTML(a, options){
    a = "" + a;
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&nbsp;/g, options && options.keepSpace ? '&nbsp;' : ' ').replace(/&lsquo;/g, "'").replace(/&rsquo;/g, "'");
}

// 出生年份转年龄 - 周岁
function birth2Age(birth) {
  const currentYear = (new Date()).getFullYear();
  return currentYear - parseInt(birth);
}

// 距离现在的时间
function time2Now(time) {
  const diff = new Date() - time;
  if (diff < ONE_SECOND) return '刚刚';
  if (diff < ONE_MINUTES) return `${Math.floor(diff / ONE_SECOND)}秒前`;
  if (diff < ONE_HOUR) return `${Math.floor(diff / ONE_MINUTES)}分钟前`;
  if (diff < ONE_DAY) return `${Math.floor(diff / ONE_HOUR)}小时前`;
  if (diff < ONE_MONTH) return `${Math.floor(diff / ONE_DAY)}天前`;
  if (diff < ONE_YEAR) return `${Math.floor(diff / ONE_MONTH)}月前`;
  return `${Math.floor(diff / ONE_YEAR)}年前`;
}
function getBoundingClientRect(selector, scope) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().in(scope).select(selector).boundingClientRect(rect => {
      resolve(rect);
    }).exec();
  })
}

module.exports = {
  addMark,
  dataFomart,
  unescapeHTML,
  getImageInfo,
  getQiNiuToken,
  uploadFiles,
  birth2Age,
  time2Now,
  getBoundingClientRect
};
