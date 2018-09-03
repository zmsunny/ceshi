import {
    CHANGE_USER_STATE,
    CHANGE_USER_INFO,
    CHANGE_CART_GOODS
} from './const'
const mutations = {
    [CHANGE_USER_STATE] (state, payload) {
        state.user_state = payload.user_state
        console.log(state.user_state)
    },
    [CHANGE_USER_INFO] (state, payload) {
        state.user_info = payload.user_info
    },
    [CHANGE_CART_GOODS] (state, payload) {
        state.goods = payload.goods
    }
}

export default mutations