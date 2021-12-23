<template>
  <el-container>
    <el-header>
      <div><h1>商品后台管理系统</h1></div>
      <div class="userinfo">
        <el-avatar :src="userinfo.avatar"></el-avatar>
        <el-link class="username" type="primary">{{
          userinfo.username
        }}</el-link>
        <el-button
          type="danger"
          icon="el-icon-close"
          circle
          @click="loginout"
        ></el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          class="el-menu-vertical-demo"
          text-color="#909399"
          active-text-color="#1387f4"
        >
          <el-submenu index="goods">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/category" class="el-icon-s-operation">
                商品分类</el-menu-item
              >
              <el-menu-item index="/home/addgoods" class="el-icon-folder-add">
                发布新品</el-menu-item
              >
              <el-menu-item index="/home/goodslist" class="el-icon-tickets">
                商品列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="user">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/home/userinfo" class="el-icon-user">
                个人信息</el-menu-item
              >
              <el-menu-item
                v-if="
                  this.userinfo.role === '普通管理员' ||
                  this.userinfo.role === '超级管理员'
                    ? true
                    : false
                "
                index="/home/userslist"
                class="el-icon-tickets"
              >
                用户列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/home/orderlist">
            <i class="el-icon-document"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/home/profit">
            <i class="el-icon-setting"></i>
            <span slot="title">收入统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.setUserinfo();
  },
  data() {
    return {
      showuserlist: false,
      userinfo: {},
    };
  },
  methods: {
    //设置用户信息
    setUserinfo() {
      this.$store.commit(
        "set_userinfo",
        JSON.parse(sessionStorage.getItem("userinfo"))
      );
      this.userinfo = this.$store.getters.userinfo;
    },

    loginout() {
      //退出
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.el-header {
  background: #b3c0d1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userinfo {
  display: flex;
  align-items: center;
}

.username {
  margin: 0 0.625rem;
}

.el-aside {
  background: #d3dce6;
}

.el-main {
  background: #e9eef3;
}

.el-container {
  height: 100%;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
</style>