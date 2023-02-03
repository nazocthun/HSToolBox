<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { darkTheme, useOsTheme } from 'naive-ui'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { clientWidth, showMenu } = storeToRefs(store)

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))

// Auto collapse Menu
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
  window.onresize = () => {
    clientWidth.value = document.body.clientWidth
  }
})
onUnmounted(() => {
  window.onresize = null
})
</script>

<template>
  <n-config-provider :theme="theme">
    <n-space vertical size="large">
      <n-layout>
        <n-layout-header h-16 px-8 border-b-1>
          <Header />
        </n-layout-header>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            :collapsed="collapsed"
            collapse-mode="width"
            :collapsed-width="0"
            :width="240"
            :show-trigger="showMenuBar"
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <SideBar />
          </n-layout-sider>
          <n-layout-content class="h-[calc(100vh-64px)] p-5">
            <RouterView />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>