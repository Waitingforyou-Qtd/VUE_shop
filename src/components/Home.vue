<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/1212313.png" alt />
        <span>河南省***电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout" style="background: red;color:blue; cursor: pointer;">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">😎</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="red"
          active-text-color="blue"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- TODO:一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- TODO:一级菜单的模板区域 -->
            <template slot="title">
              <!-- 一级图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- TODO:二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <!-- TODO:图标 -->
                <i class="el-icon-s-grid"></i>
                <!-- TODO:文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 图标
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: this.isCollapse,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    // 刷新的时候去 sessionStorage 里面去取
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // TODO:获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      this.menulist = res.data
    },

    // 切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    saveNavState(activePath) {
      // 保存链接的激活状态
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0ccfa5;
  padding-left: 0;
  color: rgb(6, 132, 163);
  font-size: 22px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      font-weight: 900;
      color: rgb(0, 255, 21);
    }
  }
}
.el-aside {
  background: linear-gradient(#45a505, #8f0ac4);
  .el-menu {
    // TODO:去掉右边框
    border-right: 0;
  }
}
.el-main {
  background: linear-gradient(#e2263f, #084aa0);
}
.iconfont {
  margin-right: 15px;
  font-size: 30px;
  color: red;
}
.toggle-button {
  background-color: #950ba7;
  font-size: 38px;
  line-height: 40px;
  color: rgb(7, 247, 167);
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
