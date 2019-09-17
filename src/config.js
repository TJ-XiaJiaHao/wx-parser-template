/*
* 配置项，用于调试使用
*/
const prefix = '';        // 环境，['','dev','oa','pre']
const hosts = {
  'dev': 'https://test.com/api',
  'oa': 'https://test.com/api',
  'pre': 'https://test.com/api',
  'pro': 'https://test.com/api'
}

const config = {
  prefix,

  // api 接口域名
  api: hosts[prefix || 'pro'],

  // 微信登录地址
  wxloginUrl: `/wxLogin`,
};

module.exports = config;
