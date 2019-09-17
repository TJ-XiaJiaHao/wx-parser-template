<config>
{
  'component': true
}
</config>
<template>
  <view class="container {{hideOption}}">

    <!-- 提示 -->
    <view class="slider-tip tip-left" style="left:{{leftValue + sliderLength / 2 - 28}}rpx;">{{lowValue}}</view>
    <view class="slider-tip tip-right" style="left:{{rightValue + sliderLength / 2 - 30}}rpx;">{{highValue}}</view>

    <!-- 两个球 -->
    <view class="slider-item min" style="left:{{leftValue}}rpx;background-color:{{blockColor}};" catchtouchmove="_minMove"></view>
    <view class="slider-item max" style="left:{{rightValue}}rpx;background-color:{{blockColor}};" catchtouchmove="_maxMove"></view>

    <!-- 滑动条 -->
    <view class="slider-body left" style="left:{{sliderLength / 2}}rpx; width:{{leftValue}}rpx;background-color:{{backgroundColor}};"></view>
    <view class="slider-body body" style="left:{{leftValue + sliderLength / 2}}rpx; width:{{rightValue-leftValue}}rpx;background-color:{{selectedColor}};"></view>
    <view class="slider-body right" style="left:{{rightValue + sliderLength / 2}}rpx; width:{{totalLength - rightValue}}rpx;background-color:{{backgroundColor}};"></view>
  </view>
</template>

<script>
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** slider 最小值 */
    min: {
      type: Number,
      value: 0,
    },
    /** slider 最大值 */
    max: {
      type: Number,
      value: 100,
    },
    /** 预选选择的小值*/
    minValue: {
      type: Number,
      value: 0,
    },
    /** 预选选择的大值 */
    maxValue: {
      type: Number,
      value: 100,
    },
    /** 滑块颜色 */
    blockColor:{
      type: String
    },
    /** 未选择进度条颜色 */
    backgroundColor:{
      type: String
    },
    /** 已选择进度条颜色 */
    selectedColor:{
      type: String
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    leftValue: 0,
    rightValue: 100,
    totalLength: 0,
    bigLength: 0,
    ratio: 0.5,
    sliderLength: 46,
    containerLeft: 0, //标识整个组件，距离屏幕左边的距离
    hideOption: '', //初始状态为显示组件
    lowValue: 0,
    highValue: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    /**
    * 设置左边滑块的值
    */
    _propertyLeftValueChange() {
      const minValue = this.data.minValue / this.data.max * this.data.bigLength
      const min = this.data.min / this.data.max * this.data.bigLength
      this.setData({
        leftValue: minValue - min
      })
    },

    /**
     * 设置右边滑块的值
     */
    _propertyRightValueChange() {
      const right = this.data.maxValue / this.data.max * this.data.bigLength + this.data.sliderLength
      this.setData({
        rightValue: right
      })
    },

    /**
     * 左边滑块滑动
     */
    _minMove(e) {
      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2

      if (pagex + this.data.sliderLength >= this.data.rightValue) {
        pagex = this.data.rightValue - this.data.sliderLength
      } else if (pagex <= 0) {
        pagex = 0
      }

      this.setData({
        leftValue: pagex
      })

      let lowValue = parseInt(pagex / this.data.bigLength * parseInt(this.data.max - this.data.min) + this.data.min)
      this.setData({ lowValue})
      this.triggerEvent('lowValueChange', {lowValue})
    },

    /**
     * 右边滑块滑动
     */
    _maxMove(e) {

      let pagex = e.changedTouches[0].pageX / this.data.ratio - this.data.containerLeft - this.data.sliderLength / 2
      if (pagex <= this.data.leftValue + this.data.sliderLength) {
        pagex = this.data.leftValue + this.data.sliderLength
      } else if (pagex >= this.data.totalLength) {
        pagex = this.data.totalLength
      }

      this.setData({
        rightValue: pagex
      })

      pagex = pagex - this.data.sliderLength
      let highValue = parseInt(pagex / this.data.bigLength * (this.data.max - this.data.min) + this.data.min)
      this.setData({ highValue });
      this.triggerEvent('highValueChange', { highValue })
    },

    /**
     * 隐藏组件
     */
    hide() {
      this.setData({
        hideOption: 'hide',
      })
    },
    /**
     * 显示组件
     */
    show() {
      this.setData({
        hideOption: '',
      })
    },
    /**
    * 重置
    */
    reset() {
      this.setData({
        rightValue: this.data.totalLength,
        leftValue: 0,
      })
    },

  },

  ready() {
    const info = wx.getSystemInfoSync();
    const ratio = info.windowWidth / 750
    this.setData({ ratio })
    const query = wx.createSelectorQuery().in(this)
    query.select(".container").boundingClientRect((res) => {
      this.setData({
        totalLength: res.width / this.data.ratio - this.data.sliderLength,
        bigLength: res.width / this.data.ratio - this.data.sliderLength * 2,
        rightValue: res.width / this.data.ratio - this.data.sliderLength,
        containerLeft: res.left / this.data.ratio,
        highValue: this.data.maxValue,
        lowValue: this.data.minValue
      })
      /**
       * 设置初始滑块位置
       */
      this._propertyLeftValueChange()
      this._propertyRightValueChange()
    }).exec()
  }
})
</script>
<style>
.container {
  width: 100%;
  position: relative;
}

/* 滑动条 */
.slider-body {
  position: absolute;
  height: 8rpx;
  top: 64rpx;
  background-color: #F7F7F7;
}
.body {
  background-color: #19896f;
  z-index: 0.3;
}
.left {
  z-index: 0.1;
}
.right {
  z-index: 0.2;
}
/* 滑动提示文字 */
.slider-tip {
  position: absolute;
  width: 58rpx;
  border-radius: 4rpx;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 36rpx;
  text-align: center;
}
.slider-tip:after {
  content: '';
  border-top: 6rpx solid;
  border-left: 12rpx solid transparent;
  border-right: 12rpx solid transparent;
  position: absolute;
  top: 36rpx;
  left: calc(50% - 12rpx);
}
.tip-left {
  background-color: #298890;
  top: 0;
}
.tip-left:after {
  border-top-color: #298890;
}
.tip-right {
  background-color: #44D8E0;
  border-color: #44D8E0;
  top: 0;
}
.tip-right:after {
  border-top-color: #44D8E0;
}

/* 滑动球 */
.slider-item {
  border-radius: 50%;
  width: 42rpx;
  height: 42rpx;
  top: 42rpx;
  position: absolute;
  border: 4rpx solid #ffffff;
  background-color: #ffffff;
  box-shadow: 0 6rpx 12rpx rgba(0,0,0,0.16);
  z-index: 2;
}

.hide{
  display: none;
}
</style>
