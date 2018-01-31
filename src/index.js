import image from './component/image.vue'
import imagelink from './component/image-link.vue'
import background from './component/background.vue'

/**
 * Merges plugin installation options with a component
 * @param  {VueComponent} component
 * @param  {Object} options
 * @return {VueComponent}
 */
const mergeOptions = function (component, options = {}) {
  return {
    ...component,
    data: () => ({ options })
  }
}

/**
 * Vue installation method
 * @param  {VueInstance} Vue
 * @param  {Object} [options={}]
 */
const install = function (Vue, options = {}) {
  Vue.component('progressive-img', mergeOptions(image, options))
  Vue.component('progressive-img-link', mergeOptions(imagelink, options))
  Vue.component('progressive-background', mergeOptions(background, options))
}

export default {
  install
}
