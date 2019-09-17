<config>
{
  pages: [
    'pages/index',
    'pages/components/count-down',
    'pages/components/ellipsis-text',
    'pages/components/hover-button',
    'pages/components/sideslipping',
    'pages/components/toggle-text',
    'pages/components/wxlogin-wrap',
    'pages/components/drag-card',
    'pages/components/move-card',
    'pages/components/image-previewer',
    'pages/components/image-selector',
    'pages/components/range-slider',
    'pages/components/image-cropper',
    'pages/components/native-components',
    'pages/components/video-recorder',
    'pages/components/video-player',
    'pages/components/fixed-inputer',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: "#fff",
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
}
</config>

<script>
import $http from './plugins/http.js';
import $login from './utils/login.js';
import $cookie from './plugins/cookie.js';
import $util from './utils/index.js';
import $config from './config.js';
App({

  globalData: {
    isIos: true,
    isIphoneX: false,
  },

  // 获取用户ID
  getUserId () {
    return $cookie.get('accountId');
  },

  // 展示成功弹窗（toast）
  showSuccess (title, hideLoading) {
    if (hideLoading) wx.hideLoading();
    wx.showToast({ title, mask: true, duration: 500, icon: 'success' });
  },

  // 展示失败弹窗（modal）
  showError (title, content, hideLoading) {
    if (hideLoading) wx.hideLoading();
    wx.showModal({ title, content, showCancel: false });
  },

  // 展示弹窗（toast）
  showToast (title, hideLoading) {
    if (hideLoading) wx.hideLoading();
    wx.showToast({ title, mask: true, duration: 500, icon: 'none' });
  },

  // 判断机型
  checkPlatform() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.isIos = /iPhone/.test(res.model);
        if (res.model.search('iPhone X') != -1 || res.model.search('iPhone11') != -1) {
          this.globalData.isIphoneX = true
        }
      },
    });
  },

  // 增强Page能力，小程序不支持prototype的形式拓展能力
  enhancePage() {
    const oPage = Page;
    Page = config => oPage(Object.assign(config, {
      $http,
      $util,
      $login,
      $cookie,
      $config,
      $getUserId: this.getUserId,
      $showSuccess: this.showSuccess,
      $showError: this.showError,
      $showToast: this.showToast,
      $showLoading: (title) => wx.showLoading({ mask: true, title: title }),
      $hideLoading: () => wx.hideLoading(),
    }));
  },
  onLaunch() {
    this.enhancePage();
    this.checkPlatform();
  },
});
</script>
<style lang="scss">
@import './assets/fonts/SourceHanSerifCNMedium';
</style>
