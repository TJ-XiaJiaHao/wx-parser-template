<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'ellipsis-text': '/components/common/ellipsis-text',
  }
}
</config>
<template>
  <view class="page-ellipsis-text">
    <navigation title="省略文本组件"></navigation>

    <view class="ellipsis-text">
      <ellipsis-text line="3" fixHeight="{{true}}">3行固定高度，不足3行仍显示3行</ellipsis-text>
    </view>

    <view class="ellipsis-text">
      <ellipsis-text line="3" fixHeight="{{false}}">3行不定高度，不足3行自动缩短</ellipsis-text>
    </view>

    <view class="ellipsis-text">
      <ellipsis-text line="3">灵异这事儿，我觉得就如同开了脑洞，没开时，常做些人神共愤的事，一但开了，人就会越来越谦卑。又如同向左走、向右走，没方向时自会洞悉那种力量。但愿今日的回忆，不是那扇门的重新开启。第三卷《九门外章》全开，隐秘于历史的真相，脱胎，玉蛊，鬼引，云葬，妖楼，隐尸……为你一一道来，精彩前行。《院上坟》群号391232505《三十四号大院》V群号425300087（需一万粉丝值） </ellipsis-text>
    </view>
  </view>
</template>

<script>
Page({

})
</script>

<style>
.page-ellipsis-text {
  padding: 0 32rpx;
}
.ellipsis-text {
  padding: 32rpx 0;
  border-bottom: 2rpx solid #EFEFEF;
}
</style>
