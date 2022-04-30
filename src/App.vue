<template>
  <div id="app">
    <router-view />
    <h1>麻花头条</h1>
    <i class="iconfont icon-guanbi"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
export default {
  // 建议命名，有用
  name: 'App'
}
</script>

<style lang="less">
</style>
