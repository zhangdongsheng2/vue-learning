/*
提供mock数据, 拦截三个接口
 */
import data from './data.json'
import Mock from 'mockjs'

Mock.mock('/goods',{code:0,data: data.goods})
Mock.mock('/ratings',{code:0,data: data.ratings})
Mock.mock('/info',{code:0,data: data.info})
