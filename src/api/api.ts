import api from './instance'

// 获取所有卡牌
export const getAllCards = () => {
  return api.get('/cards/all')
}
// 获取特定ID的卡牌
export const getCardById = (id: string) => {
  return api.get(`/cards/${id}`)
}

export const getCardsByFilter = (params: {
  buyable?: string
  race?: string
  boundrace?: string
  tavernlevel?: string
  version?: string
}) => {
  return api.get('/cards/filter', { params })
}

export const getImageByIdAndVersion = (params: { id: string; version?: string }) => {
  return api.get('cards/image', { params })
}
