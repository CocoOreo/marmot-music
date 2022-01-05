import { computed, ref } from 'vue'
const useShortcut = (props, groupRef) => {
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  const scrollTo = (index) => {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  const onShortcutTouchStart = (e) => {
    touch.y1 = e.touches[0].pageY
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }
  const onShortcutTouchMove = (e) => {
    touch.y2 = e.touches[0].pageY
    // | 0 equals to math.floor
    const diff = Math.floor((touch.y2 - touch.y1) / ANCHOR_HEIGHT)
    const anchorIndex = touch.anchorIndex + diff
    scrollTo(anchorIndex)
  }

  return { shortcutList, onShortcutTouchStart, onShortcutTouchMove, scrollRef }
}

export default useShortcut
