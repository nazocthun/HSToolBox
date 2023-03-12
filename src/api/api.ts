import api from './instance'

// 获取所有卡牌
export const getAllCards = () => {
  return api.get('/card/all')
}
// 获取特定ID的卡牌
export const getCardById = (params: { id: string }) => {
  return api.get('/card', { params })
}

export const getCardsByFilter = (params: {
  buyable?: string
  race?: string
  boundrace?: string
  tavernlevel?: string
}) => {
  return api.get('/card/filter', { params })
}

export const getImageByIdAndVersion = (params: { id: string }) => {
  return api.get('image/card', { params })
}

export const getHeroes = () => {
  return api.get('/heroes')
}
