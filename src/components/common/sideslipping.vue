<!--
  超出行数的文字将会以省略号的形式展现
  @param wrapStyle  {String} 自定义样式
  @param index {Number} 该组件索引值
  @param currentSlippingIndex {Number} 当前选中的sideslipping组件的索引值
  @param maxSlip {Number} 最大滑动距离
-->
<config>{ "component": true } </config>

<template>
  <view class="sideslipping" style="{{wrapStyle}}">
    <view class="content"
      style="transform: translate({{translate || 0}}px);transition:{{transition}}ms">
      <view class="content-wrap"
        bindtouchstart="touchStart"
        bindtouchmove="touchMove"
        bindtouchend="touchEnd"
        catchtap="onConTap"><slot name="content"></slot></view>
      <view class="slip-wrap" catchtap="onSlip">
        <slot name="slip"></slot>
      </view>
    </view>

    <view class="buttons-wrap">
      <slot name="buttons"></slot>
    </view>
  </view>
</template>

<script>
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    index: {
      type: Number,
      value: 0,
    },
    currentSlippingIndex: {
      type: Number,
      value: -1,
      observer: 'onIndexChange',
    },
    wrapStyle: {
      type: String,
      value: '',
    },
    maxSlip: {
      type: Number,
      value: 60,
    }
  },

  data: {
    translate: 0,                 // 测滑距离
    transition: 100,              // 过渡时间

    touchStartX: 0,               // 滑动开始位置X
    touchStartY: 0,               // 滑动开始位置Y
    touchStartTime: null,         // 滑动开始时间
    touchStartOffset: 0,          // 滑动开始时的定位

    isNoMove: false,              // 禁止测滑
    ifFirstMove: true,            // 第一次滑动

    moveBuff: 30,                  // 滑动缓冲距离，该距离内不发生滑动效果
  },

  methods: {

    // 监听参数currentSlippingIndex的变化，该参数指明了当前正在展开的测滑组件，用于实现同一时间只能展开一个组件的效果
    onIndexChange(nval) {
      if(nval !== this.data.index) {
        this.closeSlip(200);
      }
    },

    // 监听touchstart，记录开始滑动的相关数据
    touchStart(evt) {
      // 只接受一根手指的滑动
      if(evt.touches.length === 1) {
        this.setData({
          touchStartX: evt.touches[0].clientX,
          touchStartY: evt.touches[0].clientY,
          touchStartTime: Date.now(),
        });
      }
      this.triggerEvent('itemTouch', this.data.index);
    },

    // 监听touchmove，实时滑动组件，减少了误滑
    touchMove(evt) {
      const disX = evt.touches[0].clientX - this.data.touchStartX;
      const disY = evt.touches[0].clientY - this.data.touchStartY;
      const moveX = disX + this.data.touchStartOffset;
      let translate = this.data.translate;

      // 判断此次滑动是上下滚动还是左右侧滑，如果是上下滚动，则之后所有的滑动都不会再触发左滑
      if (this.data.isFirstMove && Math.abs(disY) > Math.abs(disX / 2)) {
        this.setData({ isNoMove: true });
      }

      if (this.data.isNoMove) return;
      else if(this.data.isFirstMove) this.triggerEvent('changeMovingStatus', true);

      this.setData({
        isFirstMove: false,
        transition: 0,
      });

      if (disX < -this.data.moveBuff && moveX > -this.data.moveBuff) {                               // 左滑距离过小
        translate = 0;
      } else if (disX < -this.data.moveBuff && moveX > -this.data.maxSlip - this.data.moveBuff) {    // 左滑过程中
        translate = moveX + this.data.moveBuff;
      } else if (disX < -this.data.moveBuff && moveX <= -this.data.maxSlip - this.data.moveBuff) {   // 左滑距离过大
        translate = -this.data.maxSlip;
      } else if (disX > this.data.moveBuff && moveX < -this.data.maxSlip + this.data.moveBuff) {    // 右滑距离过小
        translate = -this.data.maxSlip;
      } else if (disX > this.data.moveBuff && moveX < this.data.moveBuff) {
        translate = moveX - this.data.moveBuff;
      } else if (disX > this.data.moveBuff) {
        translate = 0;
      }
      this.setData({
        translate: translate,
      });
    },

    // 监听touchend
    touchEnd(evt) {
      if (evt.changedTouches.length === 1) {
        const disX = this.data.touchStartX - evt.changedTouches[0].clientX;    // 手指移动距离
        const moveX = this.data.touchStartOffset - disX;           // 侧滑移动距离
        const touchEndTime = new Date().getTime();
        const speed = Math.abs(disX) / (touchEndTime - this.data.touchStartTime);
        let translate = 0;
        // 计算过程中松手的结果（展开或收拢）
        if (this.data.isNoMove) {
          translate = 0;
        } else if (Math.abs(disX) < 10) {                                        // 移动距离过小，认为是点击而非滑动s
          // translate = this.data.touchStartOffset || 0;
          translate = this.data.touchStartOffset || 0;
        } else if (disX > 20 && speed > 0.15) {                            // 快速左滑将展开
          translate = -this.data.maxSlip;
        } else if (disX < -20 && speed > 0.15) {                          // 快速由滑将闭合
          translate = 0;
        } else if ((disX > 0 && moveX + this.data.moveBuff < -this.data.maxSlip / 3) ||
                  (disX < 0 && moveX - this.data.moveBuff < -this.data.maxSlip * 2 / 3)) {
          translate = -this.data.maxSlip;
        } else {                                      // 慢速移动到右半区域将右滑
          translate = 0;
        }

        if (translate === 0) this.closeSlip(400);
        else this.openSlip(400);
      }
      this.setData({
        isFirstMove: true,
        isNoMove: false,
      });
      this.triggerEvent('changeMovingStatus', false);
    },

    // 展开|关闭组件
    onSlip() {
      if (this.data.translate === 0) this.openSlip(400);
      else this.closeSlip(400);
      this.triggerEvent('itemTouch', this.data.index);
    },

    // 点击主体内容，如果组件为展开状态，则关闭组件，否则递交点击事件
    onConTap() {
      if (this.data.translate === 0) this.triggerEvent('contentTap', this.data.index);
      else this.closeSlip(400);
    },

    // 展开组件
    openSlip(transition) {
      this.setData({
        transition: transition || 400,
        translate: -this.data.maxSlip,
        touchStartOffset: -this.data.maxSlip,
      });
    },

    // 关闭组件
    closeSlip(transition) {
      this.setData({
        transition: transition || 400,
        translate: 0,
        touchStartOffset: 0,
      });
    },
  },
});
</script>

<style lang="scss">
@mixin flex-block($direction: row, $justify: none, $align: none) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
}

@mixin padding($top:0rpx, $right:0rpx, $bottom:0rpx, $left:0rpx) {
  box-sizing: border-box;
  padding:$top $right $bottom $left;
}

.sideslipping {
  width: 100%;
  height: 160rpx;
  position: relative;

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    background: white;
    @include flex-block(row, center, center);

    .content-wrap {
      flex: 1;
      height: 100%;
      @include flex-block(row, flex-start, center);
    }

    .slip-wrap {
      height: 100%;
      @include flex-block(row, flex-end, center);
    }
  }

  .buttons-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    text-align: center;
    @include flex-block(row, flex-end, center);
  }
}
</style>
