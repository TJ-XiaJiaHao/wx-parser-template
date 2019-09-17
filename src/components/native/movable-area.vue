<config>
{
  'component': true
}
</config>

<template>
  <view class="section">
    <view class="section__title">movable-view</view>
    <movable-area style="height: 100px; width: 200px; background: red;">
      <movable-view style="height: 25px; width: 50px; background: blue;" x="{{x}}" y="{{y}}" direction="all">
      </movable-view>
    </movable-area>
    <view class="btn-area">
      <button size="mini" bindtap="tap">click me to move to (30px, 30px)</button>
    </view>
    <view class="section__title">scalable movable-view</view>
    <movable-area style="height: 100px; width: 200px; background: red;" scale-area>
      <movable-view style="height: 25px; width: 50px; background: blue;" direction="all" bindchange="onChange" bindscale="onScale" scale scale-min="0.5" scale-max="4" scale-value="2">
      </movable-view>
    </movable-area>
  </view>
</template>

<script>
Component({
  data: {
    x: 0,
    y: 0
  },
  methods: {
    tap: function(e) {
      this.setData({
        x: 30,
        y: 30
      });
    },
    onChange: function(e) {
      console.log(e.detail)
    },
    onScale: function(e) {
      console.log(e.detail)
    }
  }
})
</script>
