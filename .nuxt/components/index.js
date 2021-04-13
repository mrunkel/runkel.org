import { wrapFunctional } from './utils'

export { default as Image } from '../../components/global/image.vue'
export { default as InfoBox } from '../../components/global/infoBox.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as PrevNext } from '../../components/PrevNext.vue'
export { default as Footer } from '../../components/footer.vue'
export { default as Header } from '../../components/header.vue'

export const LazyImage = import('../../components/global/image.vue' /* webpackChunkName: "components/image" */).then(c => wrapFunctional(c.default || c))
export const LazyInfoBox = import('../../components/global/infoBox.vue' /* webpackChunkName: "components/info-box" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyPrevNext = import('../../components/PrevNext.vue' /* webpackChunkName: "components/prev-next" */).then(c => wrapFunctional(c.default || c))
export const LazyFooter = import('../../components/footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const LazyHeader = import('../../components/header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
