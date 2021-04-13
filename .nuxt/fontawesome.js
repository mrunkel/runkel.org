import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeLayers,
  FontAwesomeLayersText,
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  faInstagram as freeFabFaInstagram,
  faTwitter as freeFabFaTwitter,
  faGithub as freeFabFaGithub
} from '@fortawesome/free-brands-svg-icons'

library.add(
  freeFabFaInstagram,
  freeFabFaTwitter,
  freeFabFaGithub
)

config.autoAddCss = false

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('FontAwesomeLayers', FontAwesomeLayers)
Vue.component('FontAwesomeLayersText', FontAwesomeLayersText)
