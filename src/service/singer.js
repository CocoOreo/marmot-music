import { get } from './base'

const getSingerList = () => {
  return get('/api/getSingerList')
}

export { getSingerList }
