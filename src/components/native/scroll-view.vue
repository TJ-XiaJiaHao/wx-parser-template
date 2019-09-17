<config>
{
  'component': true
}
</config>

<template>
  <view class="title" style="margin-top: 32rpx;">scroll-view</view>
  <view class="section">
    <view class="section__title">vertical scroll</view>
    <scroll-view scroll-y style="height: 200px;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}">
      <view id="green" class="scroll-view-item bc_green" style="background: green;"></view>
      <view id="red"  class="scroll-view-item bc_red" style="background: red;"></view>
      <view id="yellow" class="scroll-view-item bc_yellow" style="background: yellow;"></view>
      <view id="blue" class="scroll-view-item bc_blue" style="background: blue;"></view>
    </scroll-view>

    <view class="btn-area">
      <button size="mini" bindtap="tap">click me to scroll into view </button>
      <button size="mini" bindtap="tapMove">click me to scroll</button>
    </view>
  </view>
  <view class="section section_gap">
    <view class="section__title">horizontal scroll</view>
    <scroll-view scroll-x style="width: 100%;height: 200px;">
      <view class="scroll-view_H">
        <view id="green" class="scroll-view-item_H bc_green" style="background: green;"></view>
        <view id="red"  class="scroll-view-item_H bc_red" style="background: red;"></view>
        <view id="yellow" class="scroll-view-item_H bc_yellow" style="background: yellow;"></view>
        <view id="blue" class="scroll-view-item_H bc_blue" style="background: blue;"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
const order = ['red', 'yellow', 'blue', 'green', 'red']
Component({
  data: {
    toView: 'red',
    scrollTop: 100
  },
  methods: {
    upper: function(e) {
      // console.log(e)
    },
    lower: function(e) {
      // console.log(e)
    },
    scroll: function(e) {
      // console.log(e)
    },
    tap: function(e) {
      for (var i = 0; i < order.length; ++i) {
        if (order[i] === this.data.toView) {
          this.setData({
            toView: order[i + 1]
          })
          break
        }
      }
    },
    tapMove: function(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    }
  }
})
</script>

<style>
.scroll-view-item {
  width: 100%;
  height: 200px;
}
.scroll-view_H {
  width: 800px;
  height: 100%;
}
.scroll-view-item_H {
  width: 200px;
  height: 100%;
  display: inline-block;
}
</style>
