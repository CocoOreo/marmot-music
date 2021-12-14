import { get } from './base'

const getSingerList = () => {
  return get('/api/getSingerList')
}

const getSingerDetail = (singer) => {
  return get('/api/getSingerDetail', { mid: singer.mid })
}

export { getSingerList, getSingerDetail }
