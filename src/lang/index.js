import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
//引入element里面提供的语言
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

//导入语言包
import myEn from './en'
import myZh from './zh'

Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
    en: {
        ...myEn,//自己的语言包
        ...enLocale,//element 
    },
    zh: {
        ...myZh,
        ...zhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'en', // 设置地区
    messages, // 设置地区信息
})

//加载element语言
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})


export default i18n