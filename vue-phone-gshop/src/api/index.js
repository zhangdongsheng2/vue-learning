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

//4. 密码登陆接口
export const reqPwdLogin = (name,pwd,captcha) => ajax(`${BASE_URL}/login_pwd`,{name,pwd,captcha},'POST')

//5. 短信登陆接口
export const reqSmsLogin = (phone,code) => ajax(`${BASE_URL}/login_sms`,{phone,code},'POST')

//6. 发送验证码接口
export const reqSendCode = (phone) => ajax(`${BASE_URL}/sendcode`,{phone})

//7. 获取用户信息
export const reqUserInfo = () => ajax(`${BASE_URL}/userinfo`)

//8. 退出登陆
export const reqLogout = () => ajax(`${BASE_URL}/logout`)





