
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

BScroll.use(Slide)

const useMiniSlider = () => {
  const store = useStore()
  const fullScreen = computed(() => store.state.fullScreen)
  const currentIndex = computed(() => store.state.currentIndex)
  const playList = computed(() => store.state.playList)
  const sliderShow = computed(() => !!playList.value && !fullScreen.value)


  const sliderWrapperRef = ref(null)
  const slider = ref(null)
  onMounted(() => {
    let sliderVal
    watch(sliderShow, async (newSliderShow) => {
      if(newSliderShow){
        await nextTick()
        if(!sliderVal){
          sliderVal = slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            slide: {
              loop: true,
              autoplay: false
            }
          })

          sliderVal.on('slidePageChanged', ({pageX}) => {
            store.commit('setCurrentIndex', pageX)
          })
        } else {
          sliderVal.refresh()
        }
        sliderVal.goToPage(currentIndex.value, 0, 0)
      }
    })

    watch(currentIndex, (newIndex)=>{
      if(sliderVal && sliderShow.value){
        sliderVal.goToPage(newIndex, 0, 0)
      }
    })

    watch(playList, async (newPlayList) => {
      if(sliderVal && sliderShow.value){
        await nextTick()
        sliderVal.refresh()
      }
    })
  })

  onUnmounted(() => {
    if(slider.value){
      slider.value.destory()
    }
  })
  return {
    slider,
    sliderWrapperRef
  }
}

export default useMiniSlider