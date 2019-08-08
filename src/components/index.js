import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(MyChannel.name, MyChannel.name)
  }
}
