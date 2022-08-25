/*
封装的api调用模块
 */

import ajax from './ajax';

const BASE_URL = '/api'

//1. 根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

