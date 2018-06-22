import layout from './layout.vue'
import scrolltab from './scrolltab.vue'
import scrolltabPanel from './scrolltabPanel.vue'

export default {
  install(Vue){
    Vue.component('app-layout', layout);
    Vue.component('scrolltab', scrolltab);
    Vue.component('scrolltabPanel', scrolltabPanel);
  }
}

