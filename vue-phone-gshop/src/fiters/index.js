import Vue from 'vue'
import format from "date-fns/format";

//定义过滤器
Vue.filter('dateString',function (value, formatStr='YYYY-MM-DD HH:mm:ss'){
    return format(value,formatStr)
})

