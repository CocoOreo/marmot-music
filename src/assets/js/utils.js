export const shuffle = (source) => {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * (max + 1))
}

const swap = (arr, i, j) => {
  [arr[j], arr[i]] = [arr[i], arr[j]]
}

export const formatTime = (interval) => {
  interval = Math.floor(interval)
  const minute = String(Math.floor(interval / 60)).padStart(2,'0')
  const second = String(interval % 60).padStart(2,'0')
  return `${minute}:${second}`
}