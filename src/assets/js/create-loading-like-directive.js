import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'pos-realtive'

const createLoadingLikeDirective = (component) => {
  const name = component.name
  const append = (el) => {
    const style = getComputedStyle(el)
    if (['absolut', 'fixed', 'relative'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    el.appendChild(el[name].instance.$el)
  }

  const remove = (el) => {
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }
  const directive = {
    mounted (el, binding) {
      const app = createApp(component)
      const instance = app.mount(document.createElement('div'))
      if (!el[name]) {
        el[name] = {}
      }
      // Store the generated DOM instance
      // Now we can access the generated DOM with el.instance
      el[name].instance = instance
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
  return directive
}

export default createLoadingLikeDirective
