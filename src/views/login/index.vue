<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <!-- 回退到我的 $router.go(-1) $router.back() -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="arrow-left" @click="$router.go(-1)" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form ref="loginFormRef" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        ><i slot="left-icon" class="iconfont icon-shouji"></i
      ></van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sm-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        // mobile: '13911111111',
        // code: '246810'
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /1[3|5|7|8]\d{9}/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      // 组件中使用this.$toast调用Toast
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 默认2s，如果为0，则持续展示
      })
      // 3. 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功') // 新toast调用关闭之前的toast
        // this.$router.push('/')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          // 服务端或是网络异常情况进入
          console.log('登录失败,请稍后重试', err)
        }
      }
      // 3. 根据请求响应后续操作
    },
    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 校验通过，倒计时显示
      this.isCountDownShow = true
      // 3. 发送验证码请求
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        console.log('发送失败', err)
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sm-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    color: #666;
    font-size: 22px;
  }
  .login-btn-wrap {
    // padding: 53px 33px;
    margin: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
  .van-count-down {
    margin-right: 5px;
    font-size: 45px;
  }
}
</style>
