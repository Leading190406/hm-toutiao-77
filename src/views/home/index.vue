<template>
     <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition="false"
        default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
           <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command ='changeMenu'>
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command ='setting'>个人设置</el-dropdown-item>
            <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 更新头像
    eventBus.$on('updatePhoto', (photo) => {
      this.photo = photo
    })
    // 更新名称
    eventBus.$on('updateName', (name) => {
      this.name = name
    })
    // 本地获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()
      this.$router.push({ name: 'login' })
    },
    changeMenu (menuType) {
      this[menuType]()
    }
  }
}
</script>

<style scoped lang='less'>
.wrapper{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside{
    background: #002033;
  }
  .el-header{
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold{
        font-size: 24px;
        vertical-align: middle;
    }
    .text{
        vertical-align: middle;
        padding-left: 10px;
    }
    .my-dropdown {
        float: right;
        img {
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }
        .el-dropdown-link {
        font-weight: bold;
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/image/logo_admin.png) no-repeat center /
    140px auto;
}
.miniLogo {
  background-image: url(../../assets/image/logo_admin_01.png);
  background-size: 36px auto;
}
.el-menu{
  border-right: none;
}
</style>
