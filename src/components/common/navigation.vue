<!-- 自定义导航栏，Created by XiaJiahao on 2019/05.  -->
<!--
  @parameter title {String} 页面标题内容
  @parameter titleColor {String} 页面标题颜色
  @parameter backgroundColor {String} 导航栏背景色
  @parameter placeholder {Boolean} 是否需要占位，false不占用任何空间
-->
<config> { "component": true } </config>

<template>
  <!-- 导航栏占位符，高度与导航栏高度一致 -->
  <view class="placeholder" style="height: {{navigationBarHeight}}px;" wx:if="{{placeholder}}"></view>

  <!-- 导航栏 -->
  <view class="navigation-wrap" bindtap="onClick"
        style="color: {{titleColor}};height: {{navigationBarHeight}}px;line-height:{{navigationBarLineHeight}}px;background: {{backgroundColor}};">

    <!-- 返回按钮 -->
    <view class="back-wrap" catchtap="back">
      <image src="../../assets/images/navigation/navigation-back-{{titleColor == 'white' ? 'white' : 'black'}}.svg" wx:if="{{showBack}}"></image>
      <image class="icon-home" src="../../assets/images/navigation/navigation-home-{{titleColor == 'white' ? 'white' : 'black'}}.svg" wx:if="{{!showBack && showHome}}"></image>
    </view>

    <!-- 导航栏标题 -->
    <view class="title">{{title}}</view>

    <!-- 导航栏右边返回按钮占位符，宽度与返回按钮宽度一致 -->
    <view class="back-wrap back-slot"></view>
  </view>
</template>

<script>
Component({
  properties: {
    title: { type: String, value: '' },
    titleColor: { type: String, value: 'black' },
    needBack: { type: Boolean, value: false },
    back: { type: Boolean, value: false },
    showHome: { type: Boolean, value: false },
    backgroundColor: { type: String, value: '#ffffff' },
    placeholder: { type: Boolean, value: true },
  },
  data: {
    showBack: false,                      // 是否显示返回按钮
    statusBarHeight: 0,                   // 顶部系统状态条高度
    navigationBarHeight: 0,               // 导航栏高度
    navigationBarLineHeight: 0,           // 导航栏行高
    navigationBarBackgroundHeight: 0,     // 导航栏背景高度
    screenHeight: 0,                      // 屏幕总高度（减去导航栏高度）

    clickNum: 0,
    clickTimer: null,
  },
  methods: {
    onClick(e) {
      if (this.data.clickNum === 0) {
        this.setData({
          clickNum: 1,
          clickTimer: setTimeout(() => {
            this.resetClick()
          }, 300)
        });
      } else {
        this.triggerEvent('doubleClick');
        this.resetClick();
      }
    },

    resetClick() {
      clearTimeout(this.data.clickTimer)
      this.setData({
        clickNum: 0,
        clickTimer: null
      });
    },

    // 点击返回按钮，返回上一页
    back() {
      if (getCurrentPages().length > 0 && !this.data.needBack) {
        // getCurrentPages().length === 1 && wx.reLaunch({ url: '/pages/entry/index' }) || wx.navigateBack();
        getCurrentPages().length > 1 && wx.navigateBack();
      } else {
        this.triggerEvent('back')
      }
    },

    // 根据不同机型动态计算导航栏理想高度
    computeHeight() {
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            statusBarHeight: res.statusBarHeight,
            navigationBarHeight: 50 + res.statusBarHeight,
            navigationBarLineHeight: 44 + res.statusBarHeight * 2,
            screenHeight: res.screenHeight - 50 - res.statusBarHeight,
          });
          this.triggerEvent('updateNavigationHeight', this.data.navigationBarHeight);
          this.triggerEvent('updateStatusBarHeight', this.data.statusBarHeight);
        },
      });
    }
  },
  ready() {
    this.computeHeight();
    if(this.data.back) {
      this.setData({ showBack: true });
    } else {
      this.setData({ showBack: getCurrentPages().length > 1 });
    }
  },
});
</script>

<style lang="scss">
@import '../../assets/css/common';
.placeholder {
  @include size(100%, 128rpx);
}
.navigation-wrap {
  background: white;
  text-align: center;
  font-size: 36rpx;
  overflow: hidden;
  box-sizing: border-box;
  @include size(100%, auto);
  @include fixed(0, 0, auto, auto, 1000);
  @include flex(row, flex-start, flex-start);

  .back-wrap {
    text-align: left;
    padding-left: 32rpx;
    box-sizing: border-box;
    @include size(80rpx, 100%);

    image {
      @include size(16rpx, 28rpx);
    }
    .icon-home {
      @include size(40rpx, 36rpx);
    }
  }

  .title {
    flex: 1;
    height: 100%;
    padding:0 60px;
    overflow:hidden;
    display:-webkit-box;
    word-break:break-all;
    -webkit-line-clamp: 1;
    text-overflow:ellipsis;
    -webkit-box-orient: vertical;
  }
}
</style>
