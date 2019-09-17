
<config>
{
  'component': true,
  'disableScroll': true,
}
</config>
<template>
  <view class="camera-wrap">
    <camera class="camera">
      <!-- 录像计时器 -->
      <cover-view class="record-duration-wrap" hidden="{{!isRecording}}">
        <cover-view
          class="record-duration"
          style="width: {{recordDuration / maxRecordDuration * 100 + '%'}}"></cover-view>
      </cover-view>
      <!-- 拍摄按钮 -->
      <cover-view class="camera-btn-border"></cover-view>
      <cover-view class="camera-btn"
        bindtouchstart="onTouchStart"
        bindtouchend="onTouchEnd"></cover-view>
      <!-- 拍摄提示 -->
      <cover-view class="tip">单击拍照，长按录视频</cover-view>
    </camera>
  </view>
</template>

<script>
Component({
  data: {
    touchTimer: null,
    btnAnimation: null,
    isRecording: false,
    recordTimer: null,
    recordDuration: 0,
    maxRecordDuration: 20,
    ctx: null,
    authRecord: false,
  },
  ready() {
    this.setData({
      ctx: wx.createCameraContext()
    });
    this.checkAuthSetting();
  },
  methods: {
    /*
     * 初始化授权状态
     */
    checkAuthSetting() {
      wx.getSetting({
        success: res => {
          this.setData({
            authRecord: !!res.authSetting['scope.record'],
          });
        },
      });
    },

    /*
     * 展示弹窗（toast）
     */
    showToast (title, hideLoading) {
      if (hideLoading) wx.hideLoading();
      wx.showToast({ title, mask: true, duration: 500, icon: 'none' });
    },

    /*
     * 清空长按计时器
     */
    clearTouchTimer() {
      if (this.data.touchTimer) {
        clearTimeout(this.data.touchTimer);
        this.setData({ touchTimer: null });
      }
    },

    /*
     * 清空录像计时器
     */
    clearRecordTimer() {
      if (this.data.recordTimer) {
        clearTimeout(this.data.recordTimer);
        this.setData({ recordTimer: null });
      }
    },

    /*
     * 长按开始，500毫秒內未松开则表示录像
     */
    onTouchStart() {
      this.clearTouchTimer();
      this.setData({
        touchTimer: setTimeout(() => {
          this.clearTouchTimer();
          if (this.data.authRecord) {
            this.startRecord();
          } else {
            this.doAuthRecord();
          }
        }, 500),
      })
    },

    /*
     * 获取用户授权
     */
    doAuthRecord() {
      wx.authorize({
        scope: 'scope.record',
        success: () => this.setData({ authRecord: true }),
      });
    },

    /*
     * 松开手指，如果还在计时，则表示拍照，否则为录像
     */
    onTouchEnd() {
      if (this.data.touchTimer) {
        this.takePhoto();
      } else {
        this.stopRecord();
      }
      this.clearTouchTimer();
    },

    /*
     * 拍照
     */
    takePhoto() {
      this.data.ctx.takePhoto({
        quality: 'high',
        success: res => {
          this.showToast('拍照成功');
          const tempImagePath = res.tempImagePath;
          wx.navigateTo({ url: `/pages/components/image-previewer?imgUrl=${tempImagePath}` });
        },
        fail: err => {
          this.showToast('拍照失败');
        },
      })
    },

    /*
     * 开始录像
     */
    startRecord() {
      this.clearRecordTimer();
      this.data.ctx.startRecord({
        timeoutCallback: res => {
          this.onRecordFinished(res);
        },
        success: () => {
          this.setData({
            isRecording: true,
            recordTimer: setInterval(() => {
              this.addRecordDuration();
            }, 1000),
          });
        }
      })
    },

    /*
     * 结束录像
     */
    stopRecord() {
      wx.showLoading({ title: '正在保存', mask: true });
      this.clearRecordTimer();
      this.setData({
        recordDuration: 0,
        isRecording: false,
      });
      this.data.ctx.stopRecord({
        success: res => {
          wx.hideLoading();
          this.onRecordFinished(res);
        },
        fail: err => {
          wx.hideLoading();
          this.showToast('保存失败，请重试');
        }
      })
    },

    onRecordFinished(res) {
      wx.navigateTo({ url: `/pages/components/video-player?url=${res.tempVideoPath}` });
    },

    /*
     * 录像计时
     */
    addRecordDuration() {
      this.setData({
        recordDuration: this.data.recordDuration + 1,
      });
      if (this.data.recordDuration >= this.data.maxRecordDuration) {
        this.stopRecord();
      }
    },
  },
})
</script>


<style>
.camera-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.camera {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.tip {
  position: absolute;
  bottom: 64rpx;
  width: 100%;
  color: #ffffff;
  font-size: 28rpx;
  text-align: center;
}
.camera-btn-border {
  width: 120rpx;
  height: 120rpx;
  position: absolute;
  border-radius: 50%;
  bottom: 126rpx;
  left: calc(50% - 60rpx);
  border: 4rpx solid #e04159;
  box-sizing: border-box;
}
.camera-btn {
  width: 96rpx;
  height: 96rpx;
  position: absolute;
  bottom: 138rpx;
  left: calc(50% - 48rpx);
  background: #e04159;
  border-radius: 50%;
}
.record-duration-wrap {
  width: 600rpx;
  height: 16rpx;
  border-radius: 10rpx;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  position: absolute;
  top: 200rpx;
  left: calc(50% - 300rpx);
}
.record-duration {
  background: green;
  height: 100%;
}
</style>
