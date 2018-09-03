
<template>
    <div class="app-login page page-top">
        <app-header><span style="width:1.9rem;display:flex; justify-content:space-between;font-size:0.20rem;"><i>登陆</i><i style="font-size:0.16rem;">?忘记密码</i></span></app-header>

        <form @submit.prevent="submit">
            <label>你的手机号是？</label>
            <ui-input type="text" v-model="phone" placeholder="请输入手机号">
                <button type="button" @click="sendCode" v-if="isPhone" class="send-code">发送验证码</button>
            </ui-input>
            <label>验证码</label>
            <ui-input type="text" placeholder="请输入验证码" v-model="code"></ui-input>
            <button type="submit" class="submit">登陆</button>
        </form>
    </div>
</template>
<script>
import md5 from 'js-md5'
    export default {
        name: 'login',
        data() {
            return {
                phone: '13302661914',
                code: ''
            }
        },
        computed: {
            isPhone() {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(this.phone)) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        methods: {
            submit() {
                if (!this.code) return false;
                this.$store.dispatch('action_login', {
                    code: this.code, phone: this.phone,
                    success: (user_state) => {
                        console.log('登陆成功')
                        //存cookie
                        for (const key in user_state) {
                            if (user_state.hasOwnProperty(key)) {
                                const element = user_state[key];
                                this.$cookies.set(key,element,"7d","/"); 
                            }
                        }
                        console.log(111)
                        this.$router.push('/goodsPop')
                    },
                    fail: () => {
                    console.log('短信验证码错误')
                    }
                })
            },
            sendCode() { //发送验证码
                this.$http.post('/mz/v4/api/code?__t=' + Date.now,{
                    mobile: this.phone,
                    type: "2"
           }).then(res => {
                    if (res.data.status === 0) {
                        console.log('验证码发送成功')
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../stylesheets/_base.scss";
    .app-login {
    form {
        margin-top: 0.7rem;
        padding: 0.15rem;
        text-align: center;
        label {
        padding-left: 0.15rem;
        margin-top: 0.15rem;
        display: block;
        margin-bottom: 0.2rem;
        font-size: 0.16rem;
        }
        .submit {
        width: 1.63rem;
        background-color: $base-color;
        color: #fff;
        border: none;
        border-radius: 0.36rem;
        padding: 0.08rem 0.12rem;
        font-size: 0.15rem;
        outline: none;
        margin: 0.45rem 0 0;
        }
        .send-code {
        width: 0.95rem;
        position: absolute;
        right: 5px;
        top: 15px;
        background-color: #29a097;
        color: #fff;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        }
    }
    }
</style>

