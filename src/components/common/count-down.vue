<!--
  倒计时组件，提供两种模式，一种为字符串模式，一种是分开的比分式模式
  @param freeTime  {Number} 倒计时剩余时间，单位毫秒
  @param split {Boolean} 是否拆分，拆分后时分秒将各自独立
  @param showDay  {Boolean} 是否展示日，如果false，则只显示时分秒
  @param wrapStyle  {String} 倒计时组件的样式
  @param splitStyle  {String} 倒计时拆分后各单元通用样式
  @param splitDayStyle  {String} 倒计时拆分后日的样式
  @param splitHouStyle  {String} 倒计时拆分后时的样式
  @param splitMinStyle  {String} 倒计时拆分后分的样式
  @param splitSecStyle  {String} 倒计时拆分后秒的样式
  @event countdownEnd 倒计时结束事件
-->
<config> { "component": true } </config>

<template>
  <view class="count-down-wrap" style="{{wrapStyle}}">
    <view wx:if="{{!split}}">{{freeTimeStr}}</view>
    <view wx:if="{{split}}" class="split">
      <view style="{{splitStyle}} {{splitDayStyle}}" wx:if="{{showDay && day}}">{{day}}</view>
      <slot name="splitAfterDay" wx:if="{{showDay && day}}"></slot>
      <view style="{{splitStyle}} {{splitHouStyle}}">{{hou}}</view>
      <slot name="splitAfterHou"></slot>
      <view style="{{splitStyle}} {{splitMinStyle}}">{{min}}</view>
      <slot name="splitAfterMin"></slot>
      <view style="{{splitStyle}} {{splitSecStyle}}">{{sec}}</view>
    </view>
  </view>
</template>

<script>
import util from '../../utils/index.js';
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    freeTime: {
      type: Number,
      value: 0,
      observer: 'onFreeTimeChange',
    },
    split: {
      type: Boolean,
      value: false,
    },
    showDay: {
      type: Boolean,
      value: false,
    },
    wrapStyle: {
      type: String,
      value: '',
    },
    splitStyle: {
      type: String,
      value: '',
    },
    splitDayStyle: {
      type: String,
      value: '',
    },
    splitHouStyle: {
      type: String,
      value: '',
    },
    splitMinStyle: {
      type: String,
      value: '',
    },
    splitSecStyle: {
      type: String,
      value: '',
    },
  },
  created() {
    this.freeTimerId = null;
    this.freeLeftTime = 0;
  },
  detached() {
    this.freeTimeEnd();
  },
  data: {
    freeTimeStr: '00:00:00',
    day: '',
    hou: '00',
    min: '00',
    sec: '00',
  },
  methods: {
    // 当剩余时间改变时，重新开始倒计时
    onFreeTimeChange(nval) {
      this.freeLeftTime = nval;
      this.freeTimeStart();
      this.setData({ freeTimeStr: this.dataFomart(this.freeLeftTime) });
    },

    // 时间戳转成 XX天 XX:XX:XX形式
    dataFomart(time) {
      const datatime = util.dataFomart(time);
      const datatimeLen = datatime.length;
      const sec = datatime[datatimeLen - 1];
      const min = datatime[datatimeLen - 2];
      const hou = datatime[datatimeLen - 3];
      const day = datatimeLen > 3 ? datatime[datatimeLen - 4] : null;
      this.setData({ day, hou, min, sec });
      return day && this.data.showDay ? `${day} ${hou}:${min}:${sec}` : `${hou}:${min}:${sec}`;
    },

    // 限免倒计时
    freeTimeStart() {
      // 防止重复触发
      if (this.freeTimerId) this.freeTimeEnd();
      this.freeTimerId = setInterval(() => {
        if (this.freeLeftTime > 1) {
          this.freeLeftTime = this.freeLeftTime - 1;
          this.setData({ freeTimeStr: this.dataFomart(this.freeLeftTime) });
        } else {
          this.freeLeftTime = 0;
          this.setData({ freeTimeStr: this.dataFomart(this.freeLeftTime) });
          this.freeTimeEnd();
          this.triggerEvent('countdownEnd');
        }
      }, 1000);
    },

    // 结束限免倒计时
    freeTimeEnd() {
      clearInterval(this.freeTimerId);
      this.freeTimerId = null;
    },
  },
});
</script>

<style lang="scss">
.count-down-wrap {
  .split {
    display: flex;
  }
}
</style>
