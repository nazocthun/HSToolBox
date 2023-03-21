import { Race } from '~/types/types'
import api from './instance'

// Card APIs
export const getAllCards = () => {
  return api.get('/card/all')
}

export const getCardById = (params: { id: string }) => {
  return api.get('/card', { params })
}

export const getCardsByFilter = (params: {
  buyable?: string
  race?: string
  boundrace?: string
  tavernlevel?: string
  golden?: string
}) => {
  return api.get('/card/filter', { params })
}

export const getCardImageById = (params: { id: string }) => {
  return api.get('/image/card', { params })
}

// Hero APIs
// export const getHeroById = (params: { id: string }) => {
//   return api.get('/hero', { params })
// }

export const getHeroById = (params: { id: string }) => {
  return api.get('/hero', { params })
}

export const getHeroesByFilter = (params: {
  boundrace?: Race[]
}) => {
  return api.get('/hero/filter', { params })
}

export const getHeroImageById = (params: { id: string }) => {
  return api.get('/image/hero', { params })
}
