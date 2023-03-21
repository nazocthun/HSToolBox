<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { GlobalThemeOverrides, LayoutInst } from 'naive-ui'
import { NConfigProvider, darkTheme, lightTheme, useOsTheme } from 'naive-ui'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { handleRoutePath } = useToolBoxStore()
const { clientWidth, heroPageScrollTop, scrollTop, showMenu, theme } = storeToRefs(store)

const osThemeRef = useOsTheme()
const initTheme = () => {
  if (!localStorage.getItem('theme')) {
    theme.value = osThemeRef.value === 'dark' ? darkTheme : lightTheme
    localStorage.setItem('theme', theme.value.name)
  }
}
const loadTheme = () => {
  theme.value = localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
}

const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: '#E4E4E4',
    bodyColor: '#E4E4E4',
    modalColor: '#E4E4E4',
    cardColor: '#E4E4E4',
    borderColor: '#DCDCDC',
  },
  Layout: {
    headerBorderColor: '#DCDCDC',
    siderBorderColor: '#DCDCDC',
  },
  Divider: {
    color: '#DCDCDC',
  },
  Card: {
    borderColor: '#DCDCDC',
  },
  Popover: {
    borderRadius: '20px',
    color: '#fef0cd',
    boxShadow: 'none',
  },
}

const darkThemeOverrides: GlobalThemeOverrides = {
  Popover: {
    borderRadius: '20px',
    color: '#453513',
    boxShadow: 'none',
  },
}

// highlight menu options base on route name
const route = useRoute()
watchEffect(() => {
  handleRoutePath(route.fullPath)
})

// give scrollbar ref
const contentRef = ref<LayoutInst | null>(null)
const scroll = (e: Event) => {
  if (route.fullPath.match('/battlegrounds/heroes/*')) {
    scrollTop.value = (e.currentTarget as HTMLElement).scrollTop
  }
  else {
    scrollTop.value = 0
    heroPageScrollTop.value = 0
  }
}
provide('getContentRef', contentRef)

// auto collapse Menu
const collapsed = ref(false)
const showMenuBar = ref<boolean | 'bar' | 'arrow-circle' | undefined>('bar')
watchEffect(() => {
  collapsed.value = showMenu.value
  showMenuBar.value = showMenu.value ? undefined : 'bar'
})
onBeforeMount(() => {
  clientWidth.value = document.body.clientWidth
})
onMounted(() => {
  initTheme()
  loadTheme()
  window.onresize = () => {
    clientWidth.value = document.body.clientWidth
  }
})
onUnmounted(() => {
  window.onresize = null
})
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="theme.name === 'light' ? lightThemeOverrides : darkThemeOverrides">
    <n-layout position="absolute">
      <n-layout-header h-16 px-8 bordered>
        <Header />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; bottom: 0px;">
        <n-layout-sider
          bordered
          :collapsed="collapsed"
          collapse-mode="width"
          :collapsed-width="0"
          :width="180"
          :show-trigger="showMenuBar"
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <SideBar />
        </n-layout-sider>
        <n-layout-content ref="contentRef" content-style="padding: 24px;" :native-scrollbar="false" :on-scroll="scroll">
          <RouterView v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" v-if="$route.meta.keepAlive" :key="route.name" />
            </keep-alive>
            <n-message-provider>
              <component :is="Component" v-if="!$route.meta.keepAlive" :key="route.name" />
            </n-message-provider>
          </RouterView>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </NConfigProvider>
</template>
