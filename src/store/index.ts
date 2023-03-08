import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { lightTheme } from 'naive-ui'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

export const useToolBoxStore = defineStore('toolbox', () => {
  const theme: Ref<BuiltInGlobalTheme> = ref(lightTheme)
  const clientWidth = ref<number>(0)
  const showMenu = computed(() => clientWidth.value < 1024)
  const selectedMode = ref('index')
  const selectedMenu = ref<string>('index')

  const setSelectedHeader = (key: string) => {
    // selectedMenu.value = key
    switch (true) {
      case key.includes('index'):
        selectedMode.value = 'index'
        selectedMenu.value = 'index'
        break
      case key.includes('calculator'):
        selectedMode.value = 'calculator'
        selectedMenu.value = 'calculator'
        break
      case key.includes('battlegrounds'):
        selectedMode.value = 'battlegrounds'
        selectedMenu.value = 'battlegrounds-minions'
        break
      case key.includes('mercenaries'):
        selectedMode.value = 'mercenaries'
        selectedMenu.value = 'mercenaries-heroes'
        break
      default:
        break
    }
  }
  const setSelectedSideBar = (key: string) => {
    selectedMenu.value = key
    switch (true) {
      case key.includes('index'):
        selectedMode.value = 'index'
        break
      case key.includes('calculator'):
        selectedMode.value = 'calculator'
        break
      case key.includes('battlegrounds'):
        selectedMode.value = 'battlegrounds'
        break
      case key.includes('mercenaries'):
        selectedMode.value = 'mercenaries'
        break
      default:
        break
    }
  }

  const handleRoutePath = (fullPath: string) => {
    const menuRoutes = {
      '/calculator': 'calculator',
      '/battlegrounds/minions': 'battlegrounds-minions',
      '/battlegrounds/heroes': 'battlegrounds-heroes',
      '/mercenaries/heroes': 'mercenaries-heroes',
      '/mercenaries/dungeons': 'mercenaries-dungeons',
      '/mercenaries/quests': 'mercenaries-quests',
    }
    if (fullPath === '/')
      return
    for (const [route, menu] of Object.entries(menuRoutes)) {
      if (fullPath.startsWith(route)) {
        selectedMode.value = menu.split('-')[0] // 从菜单选项中提取模式
        selectedMenu.value = menu
        break
      }
    }
  }

  return {
    theme,
    clientWidth,
    showMenu,
    selectedMode,
    selectedMenu,
    setSelectedHeader,
    setSelectedSideBar,
    handleRoutePath,
  }
})
