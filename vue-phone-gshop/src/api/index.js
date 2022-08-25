/*
封装的api调用模块
 */

import ajax from './ajax';

const BASE_URL = '/api'

//1. 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

//2. 获取食品分类
export const reqFoodCategorys = () => ajax(`${BASE_URL}/index_category`)

//3. 根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax(`${BASE_URL}/shops`,{longitude,latitude})



