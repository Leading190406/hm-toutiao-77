<template>
    <div class="my-image">
        <!-- 图片按钮 -->
        <div class="img-btn">
            <img src="../assets/image/default.png" @click="openDialog()" alt />
        </div>
        <!-- 对话框 -->
        <el-dialog title="选择封面" :visible.sync='dialogVisible' width="750px">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="素材库" name='image'>
                        <el-radio-group v-model="reqParams.collect" @change='collectChange' size="mini">
                            <el-radio-button :label="false">全部</el-radio-button>
                            <el-radio-button :label="true">收藏</el-radio-button>
                        </el-radio-group>
                        <div class="img-list">
                        <div
                        class="img-item"
                        :class="{selected:selectedImageUrl === item.url}"
                        @click="selectedImage(item.url)"
                        v-for="item in images"
                        :key='item.id'>
                            <img :src="item.url" alt/>
                        </div>
                        </div>
                        <el-pagination
                            v-if="total > reqParams.per_page"
                            background
                            layout="prev, pager, next"
                            :total="total"
                            :page-size="reqParams.per_page"
                            :current-page="reqParams.page"
                            @current-change="changePager"
                        ></el-pagination>
                    </el-tab-pane>
                     <el-tab-pane label="上传图片" name="upload">上传图片content</el-tab-pane>
                </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                 <el-button type="primary"  @click="dialogVisible = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡  选项卡name的值
      activeName: 'image',
      // 记录选中的图片地址
      selectedImageUrl: null,
      // 传递参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0
    }
  },
  methods: {
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    collectChange () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.my-image{
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img-list {
  margin-top: 10px;
}
.img-item {
  width: 160px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 10px;
  position: relative;
  &.selected {
    &::after {
      // .img-item.selected::after{}
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/image/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
  }
}
</style>
