<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        :model="loginForm"
        ref="LoginFormRef"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //数据绑定
      loginForm: { username: 'admin', password: '123456' },
      //表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '登录名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  //添加行为，
  methods: {
    //添加表单重置方法
    resetLoginForm() {
      //this=>当前组件对象，其中的属性$refs包含了设置的表单ref
      // console.log(this);
      this.$refs.LoginFormRef.resetFields()
    },
    login() {
      this.$refs.LoginFormRef.validate(async valid => {
        // 验证失败就直接返回
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败😭')
        this.$message.success('登录成功😍')
        //TODO: 存储 token,跳转后台首页TODO:
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #05a381;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid rgb(3, 180, 47);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #05a381;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(9, 233, 222);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(238, 238, 238);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
