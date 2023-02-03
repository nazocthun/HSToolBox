<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { selectedMode, selectedMenu } = storeToRefs(store)

function handleUpdateValue(key: string) {
  console.log(key)
  selectedMode.value = key
  if (key.includes('index'))
    selectedMenu.value = 'index'
  else if (key.includes('calculator'))
    selectedMenu.value = 'calculator'
  else if (key.includes('battlegrounds'))
    selectedMenu.value = 'battlegrounds-minion-pool'
  else if (key.includes('mercenaries'))
    selectedMenu.value = 'mercenaries-hero-pool'
}

const activeMenu = ref<string | null>('index')
const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'index',
        },
      },
      { default: () => '首页' },
    ),
    key: 'index',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'Calculator',
        },
      },
      { default: () => '战令计算器' },
    ),
    key: 'calculator',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'BattleGrounds-MinionPool',
        },
      },
      { default: () => '酒馆战棋' },
    ),
    key: 'battlegrounds',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'Mercenaries-HeroPool',
        },
      },
      { default: () => '佣兵模式' },
    ),
    key: 'mercenaries',
  },
]
const width = ref(document.body.clientWidth)
const showMenu = computed(() => width.value < 1024)
onMounted(() => {
  window.onresize = () => {
    width.value = document.body.clientWidth
  }
})
onUnmounted(() => {
  window.onresize = null
})
</script>

<template>
  <div flex items-center>
    <div w-68 h-16>
      <!-- <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button>{{ selectedMode }}</n-button>
      </n-dropdown> -->
      这应该放个图片
    </div>
    <div v-if="!showMenu" flex-1>
      <n-menu v-model:value="activeMenu" mode="horizontal" :options="menuOptions" @update:value="handleUpdateValue" />
    </div>
    <div v-if="!showMenu">
      末尾的
    </div>
    <div v-if="showMenu" flex-1>
      显示菜单 中间的空白
    </div>
    <div v-if="showMenu">
      菜单
    </div>
  </div>
</template>
