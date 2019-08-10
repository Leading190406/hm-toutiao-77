<template>
<div class="article-container">
    <el-card>
        <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="reqParams" size="small" label-width="80px">
            <el-form-item label="状态:">
                <el-radio-group v-model="reqParams.status" >
                    <el-radio :label="null">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道:">
               <my-channel v-model="reqParams.channel_id"></my-channel>
            </el-form-item>
            <el-form-item label="日期:">
                <el-date-picker
                v-model="dateValues"
                @change="changeDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholde="开始日期"
                end-placeholde="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search()">筛选</el-button>
            </el-form-item>
        </el-form>
    </el-card>
      <!-- 结果区域 -->
      <el-card>
          <div slot="header">
              根据筛选条件共查询到 {{total}} 条结果：
          </div>
          <el-table :data="articles">
              <el-table-column label="封面">
                  <template slot-scope="scope">
                      <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px;">w
                            <div slot="error">
                                <img src="../../assets/image/error.gif" width="100" alt="">
                            </div>
                      </el-image>
                  </template>
              </el-table-column>
              <el-table-column label="标题" prop="title"></el-table-column>
              <el-table-column label="状态" >
                  <template slot-scope="scope">
                      <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
                      <el-tag v-if="scope.row.status === 1 " >待审核</el-tag>
                      <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
                      <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
                      <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="发布时间" prop="pubdate"></el-table-column>
              <el-table-column label="操作" width="120">
                   <template slot-scope="scope">
                      <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
                      <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
                  </template>
              </el-table-column>
          </el-table>
          <div class="box">
              <el-pagination
              background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
          ></el-pagination>
          </div>
      </el-card>
</div>
</template>

<script>

export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],

      // 日期数据
      //   dateArr: [],
      dateValues: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认框 点击确认后  发删除请求  响应成功更新列表即可
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`articles/${id}`)
        // 这两句代码没有执行  上面一句代码报错  没有抛出这个错误
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 搜索
    search () {
      this.getArticles()
    },
    // 选择时间处理函数
    changeDate (values) {
      if (values) {
        this.reqParams.begin_pubdate = values[0]
        this.reqParams.end_pubdate = values[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 改变分页事件对应函数
    changePager (newPage) {
      // 修改获取数据的页码
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 获取文件列表数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>

</style>
