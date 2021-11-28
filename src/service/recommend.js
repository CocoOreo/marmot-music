import { get } from './base'

const getRecommend = () => {
  return get('/api/getRecommend')
}

export { getRecommend }
