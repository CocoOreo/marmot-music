import { remove, save } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'
import { computed } from 'vue'
import { useStore } from 'vuex'
const useFavorite = () => {
  const maxLen = 100
  const store = useStore()
  const favoriteList = computed(()=> store.state.favoriteList)
  const getFavoriteIcon = (song) => {
    console.log(song)
    if(isFavorite(song)){
      return 'icon-favorite'
    }
    return 'icon-not-favorite'
  }
  const isFavorite = (song) => {
    const favoriteListVal = favoriteList.value
    return favoriteListVal.findIndex((item) => {
      return song.id === item.id
    }) > -1
  }

  const toggleFavorite = (song) => {
    // local storage for users
    let list
    if(isFavorite(song)){
      // remove
      list = remove(FAVORITE_KEY, (item) => item.id === song.id)
    } else {
      // save
      list = save(song, FAVORITE_KEY, (item)=> item.id === song.id, maxLen)
      console.log(list)
    }
    store.commit('setFavoriteList', list)
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}

export default useFavorite