<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { darkTheme, lightTheme } from 'naive-ui'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { theme, selectedMode, showMenu } = storeToRefs(store)
const { setSelectedHeader } = useToolBoxStore()

function handleUpdateValue(key: string) {
  setSelectedHeader(key)
}

const changeTheme = () => {
  theme.value = theme.value.name === 'dark' ? lightTheme : darkTheme
  localStorage.setItem('theme', theme.value.name)
}

const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'index',
        },
      },
      { default: () => '炉石工具箱' },
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
          name: 'BattleGrounds-Minions',
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
          name: 'Mercenaries-Heroes',
        },
      },
      { default: () => '佣兵模式' },
    ),
    key: 'mercenaries',
  },
]
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
      <n-menu :value="selectedMode" mode="horizontal" :options="menuOptions" @update:value="handleUpdateValue" />
    </div>
    <!-- <div v-if="!showMenu">
      末尾的
    </div> -->
    <div v-if="showMenu" flex-1 />
    <n-button style="margin: 0" @click="changeTheme">
      主题
    </n-button>
    <n-popover v-if="showMenu" w-64 trigger="click" placement="bottom-end">
      <template #trigger>
        <n-button style="margin: 0">
          菜单
        </n-button>
      </template>
      <MenuBar />
    </n-popover>
  </div>
</template>
