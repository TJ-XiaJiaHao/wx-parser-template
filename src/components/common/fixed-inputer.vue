<<config>
{
  'component': true
}
</config>

<template>
  <view class="footer-wrap">
    <view class="input-wrap" style="bottom: {{keyBoardHeight}}px;padding-bottom: {{isIphoneX && !keyBoardHeight ? 64 : 20}}rpx;">
      <input
        class="input"
        focus="{{focus}}"
        bindinput="onInput"
        value="{{inputValue}}"
        bindblur="onInputBlur"
        bindfocus="onInputFocus"
        adjust-position="{{false}}"
        placeholder="{{placeholder}}"
        bindkeyboardheightchange="onkeyboardheightchange"
        confirm-type="send"
        bindconfirm="onConfirm"/>
      <view class="confirm-btn" bindtap="onConfirm">发送</view>
    </view>
  </view>
</template>

<script>
Component({
  properties: {
    placeholder: { type: String, value: '说点什么吧' },
    isFocus: { type: Boolean, value: false, observer: 'onFocusChange' },
  },
  data: {
    focus: false, // 输入框是否聚焦
    inputValue: '', // 输入框文本内容
    keyBoardHeight: 0,  // 当前键盘高度
  },
  ready() {
    this.setData({
      isIphoneX: getApp().globalData.isIphoneX,
    });
  },
  methods: {
    onFocusChange(val) {
      if (val) this.onInputFocus();
    },

    /*
     * 输入文本内容
     */
    onInput(e) {
      this.setData({ inputValue: e.detail.value });
    },

    /*
     * 输入框失去焦点
     */
    onInputBlur() {
      this.setData({
        focus: false,
        keyBoardHeight: 0,
      });
      this.triggerEvent('blur', this.data.inputValue);
    },

    /*
     * 输入框获得焦点
     */
    onInputFocus(e) {
      if (e && e.detail && e.detail.height) this.onkeyboardheightchange(e);
      this.setData({ focus: true });
    },

    /*
     * 键盘高度变化
     */
    onkeyboardheightchange(e) {
      // 安卓机会触发两次，第二次为一个介于50到100的错误数据，过滤掉
      // 安卓机键盘收起没有触发该事件，所以通过onBlur间接实现
      if (e.detail.height === 0) return;
      if (e.detail.height < this.data.keyBoardHeight) return;
      setTimeout(() => {
        this.triggerEvent('onkeyboardheightchange', e.detail.height)
        this.setData({ keyBoardHeight: e.detail.height });
      }, 200);
    },

    /*
     * 发送
     */
    onConfirm() {
      if (!this.data.inputValue) return;
      this.triggerEvent('confirm', this.data.inputValue);
      this.setData({ inputValue: '' });
    },
  }
})
</script>

<style>
.input-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 14rpx 2rpx 14rpx 30rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: 200;
  z-index: 4000;
  border-top: 2rpx solid #EBEBEB;
}
.input {
  width: 600rpx;
  height: 70rpx;
  border-radius: 8rpx;
  background: #F5F5F5;
  font-size: 24rpx;
  padding: 0 40rpx;
}
.confirm-btn {
  font-size: 28rpx;
  color: #5581C8;
  padding: 0 28rpx;
  line-height: 70rpx;
  font-weight: bold;
  word-break: keep-all;
}
</style>
