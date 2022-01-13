import storage from "good-storage";

const insertArray = (arr, val,compare, maxLen) => {
  if(Array.isArray(arr)){
      const index = arr.findIndex(compare)
      if(index > -1){
        return
      }
      arr.unshift(val)
      if(maxLen && arr.length > maxLen){
        arr.pop()
      }
    }
  }


const deleteFromArray = (arr, compare) => {
  const index = arr.findIndex(compare)
  if(index > -1){
    arr.splice(index,1)
  }
}

export const save = (item, key, compare, maxLen) => {
  // The second param : if storeage gets nothing, it will return []
  const items = storage.get(key, [])
  if(Array.isArray(items)){
    insertArray(items, item, compare, maxLen)
  }
  storage.set(key, items)
  return items
}

export const remove = (key,compare) => {
  const items = storage.get(key,[])
  if(Array.isArray(items)){
    deleteFromArray(items, compare)
  }
  storage.set(key, items)
  return items
}

export const load = (key) => {
  return storage.get(key, [])
}
