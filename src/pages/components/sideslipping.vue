<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'sideslipping': '/components/common/sideslipping',
  }
}
</config>
<template>
  <view class="page-slipping" bindtap="onPageClick">
    <navigation title="侧滑组件"></navigation>

    <sideslipping maxSlip="160" index="{{index}}" currentSlippingIndex="{{currentSlippingIndex}}"
                  binditemTouch="onSideslippignTouch" wx:for="1234" wx:key="item">
      <view slot="content" class="sideslipping-content">可滑动区域</view>
      <view slot="slip" class="sideslipping-slip">
        <image src="../../assets/images/common/ellipsis.svg"></image>
      </view>
      <view slot="buttons" class="sideslipping-buttons">
        <view class="btn btn1" bindtap="onBtn1Click">按钮1</view>
        <view class="btn btn2" bindtap="onBtn2Click">按钮2</view>
      </view>
    </sideslipping>

  </view>
</template>

<script>
Page({
  data: {
    currentSlippingIndex: 0,
  },
  onSideslippignTouch(evt) {
    this.setData({ currentSlippingIndex: evt.detail });
  },
  onPageClick() {
    this.setData({ currentSlippingIndex: -1 });
  },
  onBtn1Click() {
    this.$showToast('点击按钮1');
  },
  onBtn2Click() {
    this.$showToast('点击按钮2');
  },
})
</script>

<style lang="scss">
.page-slipping {
  min-height: 100vh;
}
.sideslipping-content {
  box-sizing: border-box;
  border-bottom: 1rpx solid rgba(0,0,0,0.1);
  height: 100%;
  width: 100%;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
}
.sideslipping-slip {
  width: 72rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16rpx;

  image {
    width: 36rpx;
    height: 36rpx;
  }
}

.sideslipping-buttons {
  width: 160px;
  height: 100%;
  display: flex;

  .btn {
    flex: 1;
    height: 100%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
  }

  .btn1 { background: blue; }
  .btn2 { background: red; }
}
</style>
