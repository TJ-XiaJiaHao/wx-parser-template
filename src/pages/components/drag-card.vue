<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'drag-card': '/components/common/drag-card',
  }
}
</config>
<template>
  <view>
    <navigation title="拖拽卡片"></navigation>

    <view class="card-wrap">
      <div wx:for="{{list}}" wx:key="item.id">
        <drag-card x="125" y="200" bindout="nextCard" customStyle="{{item.style}}" movable="{{item.active}}">
          <view class="card" style="{{item.scale}}">
            <image class="card-image" src="/assets/images/common/cover.png"/>
          </view>
        </drag-card>
      </div>
    </view>
  </view>
</template>

<script>
Page({
  data: {
    list: [{id: 1}, {id: 2}, {id: 3}],
    activeIndex: -1,
  },
  onLoad() {
    this.nextCard();
  },
  nextCard() {
    const list = this.data.list;
    const activeIndex = (this.data.activeIndex + 1) % 3;
    list[activeIndex].active = true;
    list[(activeIndex+1) % 3].active = false;
    list[(activeIndex+2) % 3].active = false;
    list[activeIndex].style = 'z-index: 1000;';
    list[activeIndex].scale = "transform: scale(1);";
    list[(activeIndex+1) % 3].style = 'z-index: 800;';
    list[(activeIndex+1) % 3].scale = 'transform: scale(0.8);';
    list[(activeIndex+2) % 3].style = 'z-index: 600;';
    list[(activeIndex+2) % 3].scale = 'transform: scale(0.6);';
    this.setData({
      activeIndex,
      list,
    });
  },
})
</script>

<style>
.card-wrap {
  position: relative;
  width: 100%;
}
.card {
  width: 500rpx;
  height: 600rpx;
  transition: 300ms;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 4rpx 4rpx 20rpx rgba(0, 0, 0, 0.2);
}
.card-image {
  width: 100%;
  height: 600rpx;
}
</style>
