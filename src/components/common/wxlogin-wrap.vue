<!-- 微信登录组件，Created by XiaJiahao on 2019/05. -->
<config> { "component": true } </config>
<template>
  <view class="login-wrap" style="{{wrapStyle}}">
    <slot></slot>
    <button open-type="getUserInfo" bindgetuserinfo="getUserInfo" class="wx-btn" size="min">
    </button>
  </view>
</template>

<script>
import config from '../../config.js';
import loginUtil from '../../utils/login.js';
import $http from '../../plugins/http.js';
Component({
  properties: {
    wrapStyle: { type: String, value: '' }
  },
  data: {
    isAuthorization: false,     // 是否已经验证过
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headUrl: '',  // 用户头像
    nickName: '', // 用户昵称
    gender: '',   // 用户性别
    iv: '',
    encryptedData: '',
  },

  // 检查曾经是否已经授权
  ready() {
    this.checkSetting();
  },

  methods: {
    getUserInfo(e) {
      if (!this.data.canIUse){
        this.showError('请升级微信到最新版本');
        return;
      }
      if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
        this.showError('您还没有授权微信登录');
      } else{
        this.setData({
          isAuthorization: true,
        });
        this.weixinLogin();
      }
    },

    // 微信设置授权的用户进行授权操作
    weixinLogin (e) {
      if (!this.data.isAuthorization) return;
      wx.showLoading({ title: 'loading', mask: true });
      wx.login({
        success: (loginRes) => {
          // 调用login会导致加密方式改变，所以要重新获取一遍加密信息
          wx.getUserInfo({
            success: userRes => {
              this.setData({
                headUrl: userRes.userInfo.avatarUrl,
                nickName: userRes.userInfo.nickName,
                gender: userRes.userInfo.gender,
                iv: userRes.iv,
                encryptedData: userRes.encryptedData
              });
              if (loginRes.code) {
                this.postCode(loginRes.code);
              } else {
                this.showError('登录失败！' + res.errMsg || res.msg || '网络超时，请稍后访问');
              }
            },
            fail: () => {
              this.showError('登录失败！获取用户信息失败！');
            }
          })
        },
        fail: () => {
          this.showError('登录失败！微信登录失败！');
        }
      });
    },

    // 发送用户信息
    postCode(code) {
      $http.post(config.wxloginUrl, {
        code,
        avatarUrl: this.data.headUrl,
        nickname: this.data.nickName,
        gender: this.data.gender,
        iv: this.data.iv,
        encryptedData: this.data.encryptedData,
      })
      .then(res => this.loginCallback(res))
      .catch(err => this.showError('登录失败！' + err.message || '网络超时，请稍后访问', true));
    },

    // 登录回调
    loginCallback (ret) {
      wx.hideLoading();
      if (ret) {
        loginUtil.login(ret.userId, ret.wxOpenid || '');
      }
      this.triggerEvent('wxLoginSuc');
    },

    // 获取微信设置
    checkSetting() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({ isAuthorization : true});
          }
        },
      });
    },

    // 展示错误信息
    showError (msg) {
      wx.hideLoading();
      wx.showToast({title: msg, icon: 'none', duration : 2000});
    },
  },
})
</script>

<style lang="scss">
.login-wrap {
  position: relative;
}
.wx-btn {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0rpx;
  top: 0rpx;
  z-index: 100;
  border-radius:0rpx;
  background:none;
  margin:0rpx;
  padding:0rpx;
}

.wx-btn:after {
  border: none;
}
</style>
