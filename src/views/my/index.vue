<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <!-- fit="cover" 短边铺满 -->
          <van-image round class="avatar" :src="userInfo.photo" fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round type="default" size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录 -->
    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录 -->
    <!-- 导航 -->
    <!-- 开启盒子反馈clickable -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <!-- span也得加上插槽，不然覆盖其他盒子 -->
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      @click="onLogout"
      title="退出登录"
      clickable
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  created() {
    // ...mapState(['user']) 的
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout() {
      console.log('onLogout')
      // 1. 退出提示 使用组件要this.$..
      this.$dialog
        .confirm({
          title: '确认要退出吗？'
        })
        .then(() => {
          // 2. 确认退出：清除容器状态（容器中的user+本地存储的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    // background-color: pink;
    // background: url(../../assets/banner.png) no-repeat;
    // background: url(@/assets/banner.png) no-repeat; // @ 指向src目录
    background: url('~@/assets/banner.png') no-repeat; // @ 指向src目录 string
    background-size: cover; // 缩放铺满背景
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column; // 竖列
      justify-content: center; // 垂直居中
      align-items: center; // 水平居中
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      span.text {
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }
  .user-info {
    .base-info {
      box-sizing: border-box; // 高度、padding计算其中
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between; // 两边
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-status {
      display: flex;
      height: 130px;
      .data-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      margin-bottom: 8px;
      height: 141px;
      i.iconfont {
        font-size: 45px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #eb5253;
    margin-top: 8px;
  }
}
</style>
