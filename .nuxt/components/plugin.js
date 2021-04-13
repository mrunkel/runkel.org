import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Image: () => import('../../components/global/image.vue' /* webpackChunkName: "components/image" */).then(c => wrapFunctional(c.default || c)),
  InfoBox: () => import('../../components/global/infoBox.vue' /* webpackChunkName: "components/info-box" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  PrevNext: () => import('../../components/PrevNext.vue' /* webpackChunkName: "components/prev-next" */).then(c => wrapFunctional(c.default || c)),
  Footer: () => import('../../components/footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c)),
  Header: () => import('../../components/header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
