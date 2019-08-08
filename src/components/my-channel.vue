<template>
    <el-select clearable :value ='value' @change="fn" placeholder="请选择">
        <el-option v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
export default {
  name: 'myChannel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOtions()
  },
  methods: {
    async getChannelOtions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }

}
</script>

<style scoped lang='less'>

</style>
