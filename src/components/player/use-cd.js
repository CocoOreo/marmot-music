import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";

const useCd = () => {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(()=> store.state.playing)

  const imgCls = computed(()=> {
    return playing.value ? 'playing' : ''
  })

  watch(playing, (newPlaying) => {
    if(!newPlaying){
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  const syncTransform = (wrapper, inner) => {
    const imgTransform = getComputedStyle(inner).transform
    const wrapperTransform = getComputedStyle(wrapper).transform
    wrapper.style.transform = wrapperTransform === 'none' ? imgTransform : wrapperTransform.concat(" ", imgTransform)
  }
  return {
    imgCls,
    cdRef,
    cdImageRef
  }
}

export default useCd