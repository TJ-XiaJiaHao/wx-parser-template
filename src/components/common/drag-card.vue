<!--
  可拖拽卡片，此组件仅负责拖拽交互，多卡片组合请在外层控制
  @params x {Number} 卡片x方向位置，单位rpx
  @params y {Number} 卡片y方向位置，单位rpx
  @params customStyle {String} 卡片自定义样式
  @params movalbe {Boolean} 卡片是否可拖拽，默认为true
-->
<config> { "component": true } </config>

<template>
  <view>
    <view
      class="card-wrap"
      catchtouchstart="onTouchStart"
      catchtouchmove="onTouchMove"
      catchtouchend="onTouchEnd"
      animation="{{animation}}"
      style="left: {{currentX}}px; top: {{currentY}}px;{{customStyle}}">
      <slot></slot>
    </view>
  </view>
</template>

<script>
Component({
  properties: {
    x: { type: Number, value: 0, observal: 'initPostion' },
    y: { type: Number, value: 0, observal: 'initPostion' },
    customStyle: { type: String, value: '' },
    movable: { type: Boolean, value: true },
  },
  data: {
    baseX: 0,    // 卡片基准位置
    baseY: 0,    // 卡片基准位置
    currentX: 0, // 卡片实时位置
    currentY: 0, // 卡片实时位置
    startX: 0,   // 卡片拖拽开始位置
    startY: 0,   // 卡片拖拽开始位置
    animation: null,
    isAnimating: false,
  },
  ready() {
    this.initPostion();
  },
  methods: {
    /*
     * 初始化卡片基准位置
     */
    initPostion() {
      const wScale = wx.getSystemInfoSync().windowWidth / 750;
      const hScale = wx.getSystemInfoSync().windowHeight / 1334;
      const x = wScale * this.data.x;
      const y = hScale * this.data.y;
      this.setData({
        currentY: y,
        currentX: x,
        baseX: x,
        baseY: y,
      });
    },

    /*
     * 重置卡片到基准位置
     */
    resetPosition() {
      this.setData({
        currentX: this.data.baseX,
        currentY: this.data.baseY
      });
    },

    /*
     * 拖拽start
     */
    onTouchStart(e) {
      if (!this.data.movable || this.data.isAnimating) return;
      this.setData({
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
      })
    },

    /*
     * 拖拽move
     */
    onTouchMove(e) {
      if (!this.data.movable || this.data.isAnimating) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const moveX = this.data.startX - clientX;
      const moveY = this.data.startY - clientY;
      this.setData({
        currentX: this.data.baseX - moveX,
        currentY: this.data.baseY - moveY
      })
    },

    /*
     * 拖拽end
     */
    onTouchEnd(e) {
      if (!this.data.movable || this.data.isAnimating) return;
      const clientX = e.changedTouches[0].clientX;
      const clientY = e.changedTouches[0].clientY;
      const moveX = this.data.startX - clientX;
      const moveY = this.data.startY - clientY;
      if (Math.abs(moveX) < 20 && Math.abs(moveY) < 20) {
        this.resetPosition();
      } else {
        this.animateOut(moveX > 0, moveY > 0);
      }
    },

    /*
     * 卡片滑出动画
     */
    animateOut(isLeft, isUp) {
      this.setData({ isAnimating: true });
      const animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease'
      });
      const translateX = isLeft ? -500 : 500;
      const translateY = isUp ? -500 : 500;
      this.animation = animation;
      this.animation.translateY(translateY).translateX(translateX).opacity(0).step();
      this.setData({ animation: this.animation.export() });
      setTimeout(() => this.triggerEvent('out', { isLeft, isUp }), 200);
      setTimeout(() => {
        this.animation.translateY(0).translateX(0).opacity(1).step({ duration: 10 });
        this.setData({
          isAnimating: false,
          currentX: this.data.baseX,
          currentY: this.data.baseY,
          animation: this.animation.export(),
        });
      }, 500);
    },
  },
})
</script>

<style>
.card-wrap {
  position: absolute;
}
</style>
