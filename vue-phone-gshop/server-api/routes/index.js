var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const models = require('../db/models')
const UserModel = models.getModel('users')
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉
const sms_util = require('../util/sms_util')
const users = {}
const ajax = require('../api/ajax')
var svgCaptcha = require('svg-captcha')

/*
密码登陆
 */
router.post('/login_pwd', function (req, res) {
    const name = req.body.name
    const pwd = md5(req.body.pwd)
    const captcha = req.body.captcha.toLowerCase()
    console.log('/login_pwd', name, pwd, captcha, req.session)

    // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
    if (captcha !== req.session.captcha) {
        return res.send({code: 1, msg: '验证码不正确'})
    }
    // 删除保存的验证码
    delete req.session.captcha

    UserModel.findOne({name}, function (err, user) {
        if (user) {
            console.log('findUser', user)
            if (user.pwd !== pwd) {
                res.send({code: 1, msg: '用户名或密码不正确!'})
            } else {
                req.session.userid = user._id
                res.send({code: 0, data: {_id: user._id, name: user.name, phone: user.phone}})
            }
        } else {
            const userModel = new UserModel({name, pwd})
            userModel.save(function (err, user) {
                // 向浏览器端返回cookie(key=value)
                // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
                req.session.userid = user._id
                const data = {_id: user._id, name: user.name}
                // 3.2. 返回数据(新的user)
                res.send({code: 0, data})
            })
        }
    })
})

/*
一次性图形验证码
 */
router.get('/captcha', function (req, res) {
    console.log('/captcha', req.session.captcha)
    var captcha = svgCaptcha.create({
        ignoreChars: '0o1l',
        noise: 2,
        color: true
    });
    req.session.captcha = captcha.text.toLowerCase();
    req.cookies.captcha = captcha.text.toLowerCase();
    console.log(req.session.captcha)
    /*res.type('svg');
    res.status(200).send(captcha.data);*/
    res.type('svg');
    res.send(captcha.data)
});

/*
发送验证码短信
*/
router.get('/sendcode', function (req, res, next) {
    //1. 获取请求参数数据
    var phone = req.query.phone;
    //2. 处理数据
    //生成验证码(6位随机数)
    var code = sms_util.randomCode(6);
    //发送给指定的手机号
    console.log(`向${phone}发送验证码短信: ${code}`);
    sms_util.sendCode(phone, code, function (success) {//success表示是否成功
        if (success) {
            users[phone] = code
            console.log('保存验证码: ', phone, code)
            res.send({"code": 0})
        } else {
            //3. 返回响应数据
            res.send({"code": 1, msg: '短信验证码发送失败'})
        }
    })
})

/*
短信登陆
*/
router.post('/login_sms', function (req, res, next) {
    var phone = req.body.phone;
    var code = req.body.code;
    console.log('/login_sms', phone, code);
    if (users[phone] != code) {
        res.send({code: 1, msg: '手机号或验证码不正确'});
        return;
    }
    //删除保存的code
    delete users[phone];


    UserModel.findOne({phone}, function (err, user) {
        if (user) {
            req.session.userid = user._id
            res.send({code: 0, data: user})
        } else {
            //存储数据
            const userModel = new UserModel({phone})
            userModel.save(function (err, user) {
                req.session.userid = user._id
                res.send({code: 0, data: user})
            })
        }
    })

})

/*
根据sesion中的userid, 查询对应的user
 */
router.get('/userinfo', function (req, res) {
    // 取出userid
    const userid = req.session.userid
    // 查询
    UserModel.findOne({_id: userid}, _filter, function (err, user) {
        // 如果没有, 返回错误提示
        if (!user) {
            // 清除浏览器保存的userid的cookie
            delete req.session.userid

            res.send({code: 1, msg: '请先登陆'})
        } else {
            // 如果有, 返回user
            res.send({code: 0, data: user})
        }
    })
})


router.get('/logout', function (req, res) {
    // 清除浏览器保存的userid的cookie
    delete req.session.userid
    // 返回数据
    res.send({code: 0})
})

/*
根据经纬度获取位置详情
 */
router.get('/position/:geohash', function (req, res) {
    const {geohash} = req.params
    ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
        .then(data => {
            res.send({code: 0, data})
        })
})

/*
获取首页分类列表
 */
router.get('/index_category', function (req, res) {
    setTimeout(function () {
        const data = require('../data/index_category.json')
        res.send({code: 0, data})
    }, 300)
})

/*
根据经纬度获取商铺列表
?latitude=40.10038&longitude=116.36867
 */
router.get('/shops', function (req, res) {
    const latitude = req.query.latitude
    const longitude = req.query.longitude

    setTimeout(function () {
        const data = require('../data/shops.json')
        res.send({code: 0, data})
    }, 300)
})

// https://elm.cangdu.org/v4/restaurants?geohash=31.22967,121.4762&keyword=%E8%82%AF%E5%BE%B7%E5%9F%BA

// https://meishi.meituan.com/i/?cateId=17&onlylist=1

router.get('/search_shops', function (req, res) {
    const {geohash, keyword} = req.query

    var axios = require('axios');
    var data = JSON.stringify({
        "uuid": "37cf3185c82b494093f2.1661062776.1.0.0",
        "version": "8.2.0",
        "platform": 3,
        "app": "",
        "partner": 126,
        "riskLevel": 1,
        "optimusCode": 10,
        "originUrl": "http://meishi.meituan.com/i/?cateId=17&onlylist=1",
        "offset": 0,
        "limit": 15,
        "cateId": 17,
        "lineId": 0,
        "stationId": 0,
        "areaId": 0,
        "sort": "default",
        "deal_attr_23": "",
        "deal_attr_24": "",
        "deal_attr_25": "",
        "poi_attr_20043": "",
        "poi_attr_20033": ""
    });

    var config = {
        method: 'post',
        url: 'https://meishi.meituan.com/i/api/channel/deal/list',
        headers: {
            'Cookie': 'uuid=37cf3185c82b494093f2.1661062776.1.0.0; _lx_utm=utm_source%3DBaidu%26utm_medium%3Dorganic; _lxsdk_cuid=182bf0e8d8fc8-055f4bde157694-26021d51-1fa400-182bf0e8d8fc8; rvct=1258; latlng=31.167387%2C121.451627; ci3=10; ci=10; cityname=%E4%B8%8A%E6%B5%B7; IJSESSIONID=node01nl7n95zskg491xxriv76xk681151341753; iuuid=477AE98084F4B8033CE4D674465F030EF98F0DEB0DC9B1FC2EDF99FC50764199; _lxsdk=477AE98084F4B8033CE4D674465F030EF98F0DEB0DC9B1FC2EDF99FC50764199; WEBDFPID=52w33x1v93775u0x1v80486y00x7vv73817yu0vzy3997958uz7v10y7-1661158623908-1661072222757OSQWMAOfd79fef3d01d5e9aadc18ccd4d0c95074453; client-id=0d99c240-ff16-4628-9573-abbec70262f3; meishi_ci=10; cityid=10; _hc.v=7769bf6d-97ec-faf0-163f-174a65f0dde7.1661072236; _lxsdk_s=182bf9eab2c-8c0-2b3-46%7C%7C14; logan_session_token=8zt6rm0qlq8pnal0e7do; client-id=0d99c240-ff16-4628-9573-abbec70262f3',
            'mtgsig': '{"a1":"1.0","a2":1661072241906,"a3":"52w33x1v93775u0x1v80486y00x7vv73817yu0vzy3997958uz7v10y7","a4":"84969cfb99233a77fb9c9684773a23990968083b7e522ba2","a5":"Evnl4iLXHy5NNf/NJA7kHefI1fslYcLFUSHUlUyw29GYI68pQwJqe19sFSDNgTkDMbfMhxEGokUmFd5zYzl4YVnGFfIzACKWx7JywOQsNEQlr1stcn6ytcmz2W==","a6":"h1.1tRTGvR8VdzkN9m/L6nW+LssJT0wVrfDIJ7Hk+XfvtGEcYndNp9vYO6vulaUCqNbWDkxMRL5VwAucAiMxwzghMcy4YIzfD4KgqvkiU1nh3jc4ObT7NQCMBNlyHSQ6bKDp7kcb8uVe2bqJdjVDbJ5B75c2bAbpWBmd3r3ZHcMjalZz1bvlBJW6LutRlPjGypRYujgkNxxd7DYW5tlmWSF5SKEzdPt/Oaf5wew2c2DKXNhB92XAleXE8/zz/TfNbLQ4cxH3z5h84y5z2r6PknxbMOORrUKQ/fspOjaqTDmDIaw=","a7":"com.sankuai.meishi.fe.i","x0":4,"d1":"b40d175991741ecffb96ca568ee7046b"}',
            'Referer': 'https://meishi.meituan.com/i/?cateId=17&onlylist=1',
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            const list = response.data.data.poiList.poiInfos
            res.send({code: 0,data: list})
        })
        .catch(function (error) {
            console.log(error);
        });
})

module.exports = router;
