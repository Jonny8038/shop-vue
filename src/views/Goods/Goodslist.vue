<template>
  <div class="goodslist">
    <div class="goodslist-header" style="width: 15%">
      <el-input
        style="margin-right: 10px"
        v-model="serach"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="addGoods">添加商品</el-button>
    </div>

    <!-- 弹框   -->
    <el-dialog
      title="添加商品"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" style="width: 60%">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select
            style="width: 55%"
            v-model="form.categorys"
            placeholder="请选择"
          >
            <el-option label="奶茶" value="奶茶"></el-option>
            <el-option label="饮料" value="饮料"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width: 60%" label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品图片"
          ><div class="imageArr">
            <div
              class="imageContent"
              v-for="(imageUrl, index) in form.imageArr"
              :key="index"
            >
              <img :src="imageUrl" class="avatar" />
              <span class="el-icon-close imgDel" @click="deleImg(index)"></span>
            </div>

            <el-upload
              v-show="addImagebtn"
              class="avatar-uploader"
              :show-file-list="false"
              action="http://localhost:3000/upload/goodsimg"
              name="goods-img"
              :headers="uploadheader"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savegoods">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addgoods } from "@/api/goods";
export default {
  created() {
    this.uploadheader.authorization = "Bearer " + this.$store.getters.token;
  },
  data() {
    return {
      uploadheader: {
        authorization: "", //上传图片的token
      },
      addImagebtn: true, //添加图片的按钮

      dialogVisible: false, //弹框
      serach: "", // 搜索
      form: {
        imageArr: [], //图片组
        goodsname: "香蕉", //商品名称
        price: 12, //价格
        categorys: "", //分类
        delivery: false, //及时配送
        type: [], //活动性质
        desc: "第三方啥地方第三方的", //商品简介
      },
    };
  },
  methods: {
    //添加商品
    addGoods() {
      this.dialogVisible = true;
    },

    savegoods() {
      addgoods(this.form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleClose() {},

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.form.imageArr.push(res.path);
      if (this.form.imageArr.length >= 5) {
        //图片数量大于5
        this.addImagebtn = false;
      }
      console.log(this.form.imageArr);
    },
    // 删除图片
    deleImg(index) {
      this.form.imageArr.splice(index, 1);
      console.log(this.form.imageArr);
    },
  },
};
</script>

<style scoped>
.goodslist-header {
  display: flex;
  flex-direction: row;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px solid #dcdfe6;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.imageContent {
  position: relative;
  display: flex;
  flex-direction: row;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 10px;
}
.imgDel {
  cursor: pointer;
  font-size: 24px;
  color: red;
  position: absolute;
  top: -10px;
  right: 0px;
}
.imageArr {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: row;
}
</style>