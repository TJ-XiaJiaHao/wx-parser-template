<config>
{
  'component': true
}
</config>

<template>
  <view>
    <view class="title" style="margin-top: 32rpx;">editor</view>
    <editor
      id="mEditor"
      class="ql-container"
      placeholder="{{placeholder}}"
      showImgSize
      showImgToolbar
      showImgResize
      read-only="{{readOnly}}"
      bindready="onEditorReady">
    </editor>
  </view>
</template>

<script>
Component({
  data: {
    placeholder: '富文本编辑器',
    readOnly: false,
  },
  methods: {
    onEditorReady() {
      wx.createSelectorQuery().in(this).select('#mEditor').context().exec(res => {
        this.editorCtx = res[0].context;
        this.insertText();
        this.insertImage();
      });
    },
    insertText() {
      this.editorCtx.insertText({
        text: '富文本编辑器-按钮需要自己处理'
      })
    },
    insertImage() {
      this.editorCtx.insertImage({
        src: 'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg'
      })
    },
  }
})
</script>
