import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _75bef238 = () => interopDefault(import('../pages/blog/_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _28e820e5 = () => interopDefault(import('../pages/page/_slug.vue' /* webpackChunkName: "pages/page/_slug" */))
const _563de422 = () => interopDefault(import('../pages/tags/_slug.vue' /* webpackChunkName: "pages/tags/_slug" */))
const _ec857572 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog/:slug?",
    component: _75bef238,
    name: "blog-slug"
  }, {
    path: "/page/:slug?",
    component: _28e820e5,
    name: "page-slug"
  }, {
    path: "/tags/:slug?",
    component: _563de422,
    name: "tags-slug"
  }, {
    path: "/",
    component: _ec857572,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
