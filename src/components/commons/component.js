import Vue from 'vue'
import AppNav from './Nav.vue'
import AppHeader from './AppHeader.vue'
import UITitleBox from './UITitleBox.vue'
import UIInput from './UIInput.vue'
import AppCarNav from './carNav.vue'


Vue.component('ui-title-box', UITitleBox)
Vue.component('ui-input', UIInput)
Vue.component('app-header', AppHeader)
Vue.component('app-nav', AppNav)
Vue.component('app-car-nav',AppCarNav)