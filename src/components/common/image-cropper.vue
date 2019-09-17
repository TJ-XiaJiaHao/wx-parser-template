<!-- 图片裁剪框 -->
<config>
{
  'component': true
}
</config>

<template>
  <view>
    <view
      class="image-wrap"
      bindtouchend="onTouchEnd"
      bindtouchmove="onTouchMove"
      bindtouchstart="onTouchStart"
      style="width: {{containerWidth}}px;height: {{containerHeight}}px;">

      <!-- 拖拽图片 -->
      <image
        src="{{src}}"
        class="image"
        style="width: {{imageWidth}}px;height: {{imageHeight}}px;left: {{imageLeft}}px;top: {{imageTop}}px;opacity: {{isTouching ? 1 : 0.27}}"></image>


      <view class="image-copy" style="opacity: {{isTouching ? 0 : 1}}">
        <image
          src="{{src}}"
          class="image"
          style="width: {{imageWidth}}px;height: {{imageHeight}}px;left: {{imageLeft}}px;top: {{imageTop}}px;"></image>
      </view>
    </view>

    <!-- 裁剪确认 -->
    <view bindtap="onConfirm"><slot></slot></view>

    <!-- canvas画布 -->
    <canvas
      class="canvas-image"
      canvas-id="canvas-image"
      style="width: {{containerWidth}}px;height: {{containerHeight}}px;"/>
  </view>
</template>

<script>
import util from '../../utils/index.js'
Component({
  properties: {
    src: { type: String, value: '', observer: 'onImageChange' },
    width: { type: [Number, String], value: 0, observer: 'onSizeChange' },
    height: { type: [Number, String], value: 0, observer: 'onSizeChange' },
  },
  data: {
    containerWidth: 0,
    containerHeight: 0,
    imageSrcWidth: 0,
    imageSrcHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
    imageLeft: 0,
    imageTop: 0,
    imageMinWidth: 0,
    imageMinHeight: 0,
    isTouching: false,
    touchStartX: 0,
    touchStartY: 0,
    touchStartLeft: 0,
    touchStartTop: 0,
    touchStartWidth: 0,
    touchStartHeight: 0,
    touchStartDistance: 0,
  },
  methods: {
    onSizeChange() {
      const ratio = wx.getSystemInfoSync().screenWidth / 750;
      this.setData({
        containerWidth: this.data.width * ratio,
        containerHeight: this.data.height * ratio,
      });
    },
    onImageChange() {
      util.getImageInfo(this.data.src).then(res => {
        const containerHeight = this.data.containerHeight;
        const containerWidth = this.data.containerWidth;
        this.setData({
          imageSrcWidth: res.width,
          imageSrcHeight: res.height,
        });
        if (res.direction) { // 宽 > 高
          this.setData({
            imageHeight: containerHeight,
            imageMinHeight: containerHeight,
            imageWidth: res.width / res.height * containerHeight,
            imageMinWidth: res.width / res.height * containerHeight,
            imageLeft: (res.width / res.height * containerHeight - containerWidth) / -2,
            imageTop: 0,
          })
        } else {
          this.setData({ // 高 > 宽
            imageWidth: containerWidth,
            imageMinWidth: containerWidth,
            imageHeight: res.height / res.width * containerWidth,
            imageMinHeight: res.height / res.width * containerWidth,
            imageTop: (res.height / res.width * containerWidth - containerHeight) / -2,
            imageLeft: 0,
          })
        }
      });
    },
    onTouchStart(e) {
      this.setData({
        isTouching: true,
        touchStartLeft: this.data.imageLeft,
        touchStartTop: this.data.imageTop,
      })
      if (e.touches.length === 1) { // 一个手指
        this.setData({
          touchStartX: e.touches[0].clientX,
          touchStartY: e.touches[0].clientY,
        });
      } else {  // 两根手指
        const xDis = e.touches[1].clientX - e.touches[0].clientX;
        const yDis = e.touches[1].clientY - e.touches[0].clientY;
        this.setData({
          touchStartWidth: this.data.imageWidth,
          touchStartHeight: this.data.imageHeight,
          touchStartDistance: Math.sqrt(xDis * xDis + yDis * yDis),
        })
      }
    },
    onTouchMove(e) {
      if (e.touches.length === 1) { // 一个手指滑动
        const xMove = e.touches[0].clientX - this.data.touchStartX;
        const yMove = e.touches[0].clientY - this.data.touchStartY;
        this.moveImage(xMove, yMove);
      } else {
        const xDis = e.touches[1].clientX - e.touches[0].clientX;
        const yDis = e.touches[1].clientY - e.touches[0].clientY;
        const distance = Math.sqrt(xDis * xDis + yDis * yDis);
        const scale = distance / this.data.touchStartDistance;
        this.scaleImage(scale);
      }
    },
    onTouchEnd(e) {
      this.setData({
        isTouching: false,
      })
    },
    moveImage(xMove, yMove) {
      const LimitX = [this.data.containerWidth - this.data.imageWidth, 0];
      const LimitY = [this.data.containerHeight - this.data.imageHeight, 0];

      const targetLeft = this.data.touchStartLeft + xMove;
      const justLeft = Math.max(LimitX[0], Math.min(LimitX[1], targetLeft));

      const targetTop = this.data.touchStartTop + yMove;
      const justTop = Math.max(LimitY[0], Math.min(LimitY[1], targetTop));
      this.setData({
        imageLeft: justLeft,
        imageTop: justTop
      })
    },
    scaleImage(scale) {
      const targetWidth = this.data.touchStartWidth * scale;
      const justWidth = Math.max(this.data.imageMinWidth, targetWidth);

      const targetHeight = this.data.touchStartHeight * scale;
      const justHeight = Math.max(this.data.imageMinHeight, targetHeight);

      const justScale = justWidth / this.data.touchStartWidth;
      const xMove = this.data.touchStartLeft * (justScale - 1);
      const yMove = this.data.touchStartTop * (justScale - 1);
      this.moveImage(xMove, yMove);

      this.setData({
        imageWidth: justWidth,
        imageHeight: justHeight,
      });
    },
    // canvas不支持网络图片，所以需要先下载到本地
    onConfirm() {
      wx.showLoading({ title: '正在保存', mask: true });
      this.downloadFile(this.data.src)
      .then(url => this.drawCanvas(url))
      .then(() => this.canvasToFile())
      .then(url => {
        wx.hideLoading();
        this.triggerEvent('confirm', url);
      });
    },
    drawCanvas(url) {
      return new Promise((resolve, reject) => {
        util.getBoundingClientRect('.image-wrap', this).then(resw => {
          util.getBoundingClientRect('.image', this).then(resi => {
            const wScale = this.data.imageWidth / this.data.imageSrcWidth;
            const hScale = this.data.imageHeight / this.data.imageSrcHeight;
            const sx = (resw.left - resi.left) / wScale; // 裁剪开始位置
            const sy = (resw.top - resi.top) / hScale;   // 裁剪开始位置
            const sWidth = this.data.containerWidth / wScale;   // 裁剪宽度
            const sHeight = this.data.containerHeight / hScale; // 裁剪高度
            const baseWidth = this.data.containerWidth;   // 画布宽度
            const baseHeight = this.data.containerHeight; // 画布高度
            const ctx = wx.createCanvasContext('canvas-image', this);
            ctx.drawImage(url, sx, sy, sWidth, sHeight, 0, 0, baseWidth, baseHeight);
            ctx.draw(false, resolve);
          });
        });
      })
    },
    canvasToFile() {
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({//调用方法，开始截取
          x: 0,
          y: 0,
          width: this.data.containerWidth,
          height: this.data.containerHeight,
          destWidth: this.data.containerWidth * 4,
          destHeight: this.data.containerHeight * 4,
          canvasId: 'canvas-image',
          success: res => resolve(res.tempFilePath),
          fail: err => reject(err),
        }, this);
      })
    },
    downloadFile(url) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url,
          success: res => resolve(res.tempFilePath),
          fail: err => reject(err),
        });
      })
    },
  },
})
</script>

<style>
.image-wrap {
  position: relative;
  overflow: hidden;
}
.image {
  position: absolute;
  z-index: -2;
  transition: opacity 0.5s ease-in-out;
}
.image-copy {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  transition: opacity 0.5s ease-in-out;
}

.canvas-image {
  position: fixed;
  left: -100%;
  top: -100%;
  bottom: 264rpx;
  left: 0;
}
</style>
