import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue){
    // console.log('执行了'+Vue);
    
    // document.body.appendChild(Toast.$el)
    //1.创建组件对象
    const toastContrustor = Vue.extend(Toast)

    //2.new的方式，根据组件构造器可以创建出一个组件对象
    const toast = new toastContrustor()

    //3.将组件手动挂载到div上
    toast.$mount(document.createElement('div'))

    //4.toast.$el就是对应的div了
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj