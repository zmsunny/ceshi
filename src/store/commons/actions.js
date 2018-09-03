
import axios from 'axios'
import md5 from 'js-md5'
import { CHANGE_USER_STATE, CHANGE_USER_INFO, CHANGE_CART_GOODS} from './const'
const actions  = {
    action_login (context, { code, phone, success, fail }) {
        axios.post('/mz/v4/api/login?__t=' + Date.now, {
            code: "",
            codeKey: "",
            loginType: 1,
            password: md5(code),
            username: phone
        }).then(res => {
            if (res.data.status === -23104) {
                fail()
            }else {
                //更改state的数据，所以要调用mutations的方法
                context.commit({
                    type: CHANGE_USER_STATE,
                    user_state: res.data.data.data
                })
                //获取了用户名等信息
                this.dispatch('action_get_user_info')
                success(res.data.data.data)              
            }
        })
    },
    action_get_user_info (context ) {
        axios.get('/mz/v4/api/me?__t=' + Date.now()).then(res =>{
            let user_info = { nickname: '李二狗' }
            context.commit({
                type: CHANGE_USER_INFO,
                user_info
            })
        })
    },
    action_add_good_in_cart (context, params) {
        //在这里应该去发送ajax请求,在这里模拟后端和数据库
        //调用后端接口，成功之后，后端返回这个用户操作之后的购物车数据
        backend.add_good_in_cart(params).then(res => {
            let goods = res.data.goods
            //将最新的购物车数据同步到state里
            context.commit({
                type: CHANGE_CART_GOODS,
                goods
            })
        })
    },
}
const backend = {
    get_goods_in_cart () { // 获取购物车
        return JSON.parse( localStorage.goods ? localStorage.goods : '[]' )
    },
    add_good_in_cart ({ good_id, name, price, num = 1, pic}) {//加入购物车
        let back = this
        return new Promise(function (resolve, rejected) {
            setTimeout(() => {//假设这是一个网络请求
                let goods = back.get_goods_in_cart()//获取到数据库里的购物车数据

                //判断是否有这个商品，有的话更改数量
                let isHas = goods.some(good => {
                    if ( good.good_id === good_id ) {
                        good.num += num;
                        return true
                    }
                    return false
                });
                //如果没有这个商品就添加这个商品
                if ( !isHas ) {
                    goods.push({
                        good_id, name, price, num, pic
                    })
                }

                //同步到数据库里
                localStorage.goods = JSON.stringify(goods)
                //返回给前端
                resolve({
                    code: 200,
                    data: {
                        goods
                    }
                })
            }, 500)
        })
    }
}
export default actions