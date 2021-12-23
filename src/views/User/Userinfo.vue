<template>
  <div class="userinfo">
    <el-form ref="form" :model="userinfo" label-width="80px">
      <el-form-item label="手机号:">{{ userinfo.phone }}</el-form-item>
      <el-form-item label="用户名:">{{ userinfo.username }} </el-form-item>
      <el-form-item label="角色:">{{ userinfo.role }} </el-form-item>
      <el-form-item label="会员:">{{ userinfo.vip }} </el-form-item>
      <el-form-item label="性别:">{{ userinfo.sex }} </el-form-item>
      <el-form-item label="邮箱:">{{ userinfo.email }} </el-form-item>
      <el-form-item label="地址:">{{ userinfo.address }} </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="open">修 改</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/upload/img"
        name="file"
        :headers="uploadheader"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
      >
        <img v-if="userinfo.avatar" :src="userinfo.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <!-- 信息修改弹框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="40%"
      :before-close="handleClose"
    >
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            用户名
          </template>
          <el-input v-model="userinfo.username" placeholder="请输入用户名" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-bank-card"></i>
            会员
          </template>
          <el-select v-model="userinfo.vip" placeholder="请选择角色">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            性别
          </template>
          <el-select v-model="userinfo.sex" placeholder="请选择活">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="保密" value="保密"></el-option>
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            邮箱
          </template>
          <el-input v-model="userinfo.email" placeholder="请输入邮箱" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            地址
          </template>
          <el-input v-model="userinfo.address" placeholder="请输入地址" />
        </el-descriptions-item>
      </el-descriptions>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onUpdata">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updatauserinfo } from "@/api/user";
export default {
  created() {
    this.uploadheader.authorization = "Bearer " + this.$store.getters.token;
    this.userinfo = this.$store.getters.userinfo;
  },
  data() {
    return {
      size: "600",
      dialogVisible: false,
      userinfo: {}, //用户信息
      token: "",
      uploadheader: {
        authorization: "", //token
      },
    };
  },
  methods: {
    //打开修改用户信息修改框
    open() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((res) => {
          if (res === "confirm") {
            this.dialogVisible = false;
          }
        })
        .catch((_) => {});
    },

    //头像上传
    handleAvatarSuccess(res, file) {
      this.userinfo.avatar = res.path;
      updatauserinfo(this.userinfo).then((res) => {
        if (res.data.code === 200) {
          this.$store.commit("set_userinfo", res.data.data);
          this.$message.success("更新成功");
        } else if (res.data.code === 300) {
          this.$message.error("更新失败");
          return;
        }
      });
    },

    //更新个人信息
    onUpdata() {
      updatauserinfo(this.userinfo).then((res) => {
        if (res.data.code === 200) {
          this.$store.commit("set_userinfo", res.data.data);
          this.$message.success("更新成功");
        } else if (res.data.code === 300) {
          this.$message.error("更新失败");
          return;
        }
      });

      this.dialogVisible = false;
    },
  },
  filters: {
    rank: function (value) {
      if (value === 1) {
        return "普通用户";
      } else if (value) {
        return "普通管理员";
      } else if (value) {
        return "超级管理员";
      }
    },
  },
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: row;
}

.el-form {
  width: 30%;
}

.el-upload {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
.avatar {
  width: 178px;
  height: 178px;
  overflow: hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #1e1e1e;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>