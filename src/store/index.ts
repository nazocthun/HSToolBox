import { defineStore } from 'pinia'

export const useToolBoxStore = defineStore('toolbox', () => {
  const selectedMode = ref('index')
  const selectedMenu = ref<string>('index')

  function changeSelectedModeTo(newMode: string) {
    selectedMode.value = newMode
  }
  return {
    selectedMode,
    selectedMenu,
    changeSelectedModeTo,
  }
})
