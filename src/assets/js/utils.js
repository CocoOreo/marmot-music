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
