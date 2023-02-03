<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { ComputedRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { selectedMode, selectedMenu } = storeToRefs(store)
function handleUpdateValue(key: string) {
  selectedMenu.value = key
  if (key.includes('index'))
    selectedMode.value = 'index'
  else if (key.includes('calculator'))
    selectedMode.value = 'calculator'
  else if (key.includes('battlegrounds'))
    selectedMode.value = 'battlegrounds'
  else if (key.includes('mercenaries'))
    selectedMode.value = 'mercenaries'
}

const menuOptions: ComputedRef<MenuOption[]> = computed(() => [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'index',
          },
        },
        { default: () => '首页' },
      ),
    key: 'index',
    show: selectedMode.value === 'index',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Tutorial',
          },
        },
        { default: () => '使用说明' },
      ),
    key: 'index-indicators',
    show: selectedMode.value === 'index',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'UpdateNotes',
          },
        },
        { default: () => '更新日志' },
      ),
    key: 'index-update-notes',
    show: selectedMode.value === 'index',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Calculator',
          },
        },
        { default: () => '计算器' },
      ),
    key: 'calculator',
    show: selectedMode.value === 'calculator',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-MinionPool',
          },
        },
        { default: () => '随从池' },
      ),
    key: 'battlegrounds-minion-pool',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-HeroPool',
          },
        },
        { default: () => '英雄池' },
      ),
    key: 'battlegrounds-hero-pool',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-HeroPool',
          },
        },
        { default: () => '佣兵图鉴' },
      ),
    key: 'mercenaries-hero-pool',
    show: selectedMode.value === 'mercenaries',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-DungeonPool',
          },
        },
        { default: () => '副本图鉴' },
      ),
    key: 'mercenaries-dungeon-pool',
    show: selectedMode.value === 'mercenaries',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-QuestPool',
          },
        },
        { default: () => '英雄任务' },
      ),
    key: 'mercenaries-quest-pool',
    show: selectedMode.value === 'mercenaries',
  },
])
</script>

<template>
  <n-menu
    :value="selectedMenu"
    :options="menuOptions"
    @update:value="handleUpdateValue"
  />
</template>
