import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

const useLyric = ({songReady, currentTime}) => {
  const currentLyric = ref(null)
  const currentLineNum = ref(0)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)
  const pureMusicLyric = ref('')
  const playingLyric = ref('')
  
  const store = useStore()
  const currentSong = computed(()=> store.getters.currentSong)

  const handleLyric = ({lineNum, txt}) => {
    currentLineNum.value = lineNum
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if(!listEl) {
      return
    }
    if(lineNum > 8){
      const lineEl = listEl.children[lineNum - 8]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0,0,1000)
    }
  }
  const playLyric = () => {
    const currentLyricVal = currentLyric.value
    if(currentLyricVal){
      // jump to current Time
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  const stopLyric = () => {
    const currentLyricVal = currentLyric.value
    if(currentLyricVal){
      currentLyricVal.stop()
    }
  }

  watch(currentSong, async (newSong) => {
    if(!newSong.id || !newSong.url){
      return
    }
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = null
    pureMusicLyric.value = ''
    playingLyric.value = ''
    const lyric = await getLyric(newSong)
    store.commit('addSongLyric', {song:newSong, lyric})
    // If the song has changed when getting lyrics, then cancel the lyric assignment and the parser process.
    if(currentSong.value.lyric !== lyric){
      return
    }
    currentLyric.value = new Lyric(lyric, handleLyric)
    const hasLyric = currentLyric.value.lines.length
    if(hasLyric){
      if(songReady){
        playLyric()
      }
    } else{
      playingLyric.value = pureMusicLyric.value = lyric.replace(/\[(\d{2}):(\d{2}):(\d{2})\]/g, '')
    }
  })

  return {
    currentLyric,
    currentLineNum,
    playLyric,
    stopLyric,
    lyricListRef,
    lyricScrollRef,
    pureMusicLyric,
    playingLyric
  }
}

export default useLyric