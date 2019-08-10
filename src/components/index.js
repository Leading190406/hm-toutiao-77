<<<<<<< HEAD
// 封装一个插件
// 注册所有components下的组件为全局组件

import MyChannel from '@/components/my-channel'

// vue插件 暴露一个对象  对象中有一个选项  install 安装意思
export default {
  install (Vue) {
    // 安装函数  当Vue.use(使用插件) install被调用
    // Vue 全局的vue对象

    Vue.component(MyChannel.name, MyChannel)
=======
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    Vue.component(MyChannel.name, MyChannel.name)
>>>>>>> f859a8dd51370d25d927426dc13389793704073c
  }
}
