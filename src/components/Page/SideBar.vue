<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { ComputedRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { selectedMode, selectedMenu } = storeToRefs(store)
const { setSelectedSideBar } = useToolBoxStore()
function handleUpdateValue(key: string) {
  setSelectedSideBar(key)
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
            name: 'BattleGrounds-Minions',
          },
        },
        { default: () => '随从池' },
      ),
    key: 'battlegrounds-minions',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-Heroes',
          },
        },
        { default: () => '英雄池' },
      ),
    key: 'battlegrounds-heroes',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-Prizes',
          },
        },
        { default: () => '暗月奖品机制' },
      ),
    key: 'battlegrounds-prizes',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-Quests',
          },
        },
        { default: () => '任务机制' },
      ),
    key: 'battlegrounds-quests',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BattleGrounds-Buddies',
          },
        },
        { default: () => '伙伴机制' },
      ),
    key: 'battlegrounds-buddies',
    show: selectedMode.value === 'battlegrounds',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-Heroes',
          },
        },
        { default: () => '佣兵图鉴' },
      ),
    key: 'mercenaries-heroes',
    show: selectedMode.value === 'mercenaries',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-Dungeons',
          },
        },
        { default: () => '副本图鉴' },
      ),
    key: 'mercenaries-dungeons',
    show: selectedMode.value === 'mercenaries',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Mercenaries-Quests',
          },
        },
        { default: () => '英雄任务' },
      ),
    key: 'mercenaries-quests',
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
