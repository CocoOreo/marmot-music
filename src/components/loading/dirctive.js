import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'pos-realtive'
const append = (el) => {
  const style = getComputedStyle(el)
  if (['absolut', 'fixed', 'relative'].indexOf(style.position) === -1) {
    addClass(el, relativeCls)
  }
  el.appendChild(el.instance.$el)
}

const remove = (el) => {
  removeClass(el, relativeCls)
  el.removeChild(el.instance.$el)
}

const loadingDirective = {
  mounted (el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    // Store the generated DOM instance
    // Now we can access the generated DOM with el.instance
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated (el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

export default loadingDirective
