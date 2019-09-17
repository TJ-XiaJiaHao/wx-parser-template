
<config>
{
  'component': true
}
</config>
<template>
  <view class="card-list" catchtouchend="moveItem" catchtouchmove="prevent" bindtouchstart="moveStart">
    <view wx:for="{{cardList}}" wx:key="index" class="card-wrap"
      style="opacity:{{item.display || 0}};transform: translateX({{item.slateX || 0}}) scale({{item.scale || 0}});z-index:{{item.zIndex || 0}};transform-origin: 100% 50% 0;{{item.style || ''}}">
      <view class="card">
        <image class="card-image" src="/assets/images/common/cover.png"/>
      </view>
    </view>
  </view>
</template>

<script>
Component({
  data: {
    startX: 0,
    endX: 0,
    current: 0,
    cardList: [{}, {}, {}, {},{}, {}, {}, {}],
  },
  ready() {
    this.checkPage(0);
  },
  methods: {
    prevent() {
      return false;
    },

    showToast (title, hideLoading) {
      if (hideLoading) wx.hideLoading();
      wx.showToast({ title, mask: true, duration: 1000, icon: 'none' });
    },

    /*
     * 手指触发开始移动
     */
    moveStart(e) {
      this.setData({
        startX: e.changedTouches[0].pageX
      });
    },

    /*
     * 手指触摸后移动完成触发事件
     */
    moveItem(e) {
      this.setData({ endX: e.changedTouches[0].pageX });

      //计算手指触摸偏移剧距离
      const moveX = this.data.startX - this.data.endX;

      //向左移动
      if(moveX > 20 ){
        if(this.data.current >= (this.data.cardList.length - 1)) {
          return this.showToast('最后一个卡片了喔');
        }
        this.setData({ current: this.data.current + 1 });
        this.checkPage(this.data.current);
      }
      if(moveX < -20) {
        if (this.data.current <= 0) {
          return this.showToast('这是第一个卡片了喔');
        }
        this.setData({ current: this.data.current - 1 });
        this.checkPage(this.data.current);
      }
    },

    /*
     * 卡片判断逻辑,传入参数为当前是第几个
     */
    checkPage(index) {
      const data = this.data.cardList;
      let m = 1;
      for(let i = 0;i < data.length;i ++) {
        //先将所有的页面隐藏
        const disp = 'cardList[' + i + '].display';
        const sca = 'cardList[' + i + '].scale';
        const slateX = 'cardList[' + i + '].slateX';
        const zIndex = 'cardList[' + i + '].zIndex';
        const style = 'cardList[' + i + '].style';
        this.setData({ [disp]: 0, [style]: 'display:block' });
        //向左移动上一个页面
        if(i === (index - 1) ){
          this.setData({ [slateX]: '-120%', [disp]: 1, [zIndex]: 2 });
        }
        //向右移动的最右边要display:none的页面
        if (i === (index + 3)) {
          this.setData({ [style]:'display:none', [slateX]:'0', [zIndex]: -10 });
        }
        if(i === index || (i > index && (i < index + 3))) {
          //第一个
          if(m === 1){
            this.setData({ [disp]: 1, [sca]: 1, [slateX]: 0, [zIndex]: 1 });
          }
          //第二个
          else if (m === 2) {
            this.setData({ [disp]: 0.6, [sca]: 0.86, [slateX]:'30px', [zIndex]: -1 });
          }
          //第三个
          else if (m === 3) {
            this.setData({ [disp]: 0, [sca]: 0.6, [slateX]:'60px', [zIndex]: -2 });
          }
          m++;
       }
      }
    },
  }
})
</script>

<style>

.card-list {
  position: relative;
  width: 100%;
  height: 1000rpx;
  z-index: 500;
  margin-top: 26rpx;
  overflow: hidden;
}
.card-wrap {
  position: absolute;
  right: 118rpx;
  top: 0;
  height: 690rpx;
  opacity: 0;
  transition: all 500ms;
}
.card-wrap:nth-of-type(1){
  z-index: 10;
}
.card-wrap:nth-of-type(n+4){
  transform:translateX(40px) scale(0.6);
  transform-origin: 100% 50% 0;
}
.card {
  width: 572rpx;
  height: 900rpx;
  transition: 300ms;
  background: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 4rpx 4rpx 20rpx rgba(0, 0, 0, 0.2);
}
.card-image {
  width: 100%;
  height: 100%;
}
</style>
