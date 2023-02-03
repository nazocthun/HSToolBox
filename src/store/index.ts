import { defineStore } from 'pinia'

export const useToolBoxStore = defineStore('toolbox', () => {
  const clientWidth = ref<number>(0)
  const showMenu = computed(() => clientWidth.value < 1024)
  const selectedMode = ref('index')
  const selectedMenu = ref<string>('index')

  function changeSelectedModeTo(newMode: string) {
    selectedMode.value = newMode
  }
  return {
    clientWidth,
    showMenu,
    selectedMode,
    selectedMenu,
    changeSelectedModeTo,
  }
})
