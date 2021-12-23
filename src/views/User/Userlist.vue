<template>
  <div class="userlist">
    <div class="userlist-header" style="width: 60%">
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="普通用户" value="普通用户"></el-option>
        <el-option label="普通管理员" value="普通管理员"></el-option>
        <el-option label="超级管理员" value="超级管理员"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" v-model="search" clearable />
      <el-button type="primary" icon="el-icon-search" ></el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 60%">
      <el-table-column prop="avatar" label="头像" width="100">
        <template slot-scope="scope">
          <el-avatar shape="square" :src="scope.row.avatar">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="220">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="220"> </el-table-column>
      <el-table-column prop="address" label="常用收货地址" width="300">
      </el-table-column>
      <el-table-column prop="vip" label="会员" width="100"> </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <el-tag effect="plain">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编 辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户信息弹框 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="editUser" :model="editUser" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editUser.username"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editUser.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </el-dialog>

    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import { getallusers, updatauserinfo, deleteUser } from "@/api/user";
export default {
  data() {
    return {
      tableData: [], //用户数据
      dialogVisible: false, //弹框
      editUser: {}, // 修改的用户数据
      search: "", //搜索
      select: "", //选择
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    //获取用户列表
    getUserlist() {
      let phone = this.$store.getters.phone;
      getallusers(phone).then((res) => {
        this.tableData = res.data.data;
      });
    },

    //编辑用户信息
    handleEdit(index, row) {
      this.editUser = row;
      this.dialogVisible = true;
    },

    //保存编辑用户信息
    save() {
      updatauserinfo(this.editUser).then((res) => {
        if (res.data.code === 200) {
          this.getUserlist();
          this.$message.success("更新成功");
          this.dialogVisible = false;
        } else if (res.data.code === 300) {
          this.$message.error("更新失败");
          return;
        }
      });
    },

    //关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },

    //删除用户
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(row.phone).then((res) => {
            if (res.data.code === 200) {
              this.getUserlist();
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
              return;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.userlist-header {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}
</style>