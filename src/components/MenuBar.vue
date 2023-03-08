<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
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

const menuOptions1: MenuOption[] = [
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
  },
]

const menuOptions: MenuOption[] = [
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
    children: [
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
      },
    ],
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
  },
  {
    label: '酒馆战棋',
    key: 'battlegrounds-content',
    children: [
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
      },
    ],
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
        { default: () => '佣兵模式' },
      ),
    key: 'mercenaries-content',
    children: [
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
      },
    ],
  },
]
</script>

<template>
  <n-menu
    default-expand-all
    :value="selectedMenu"
    :options="menuOptions"
    @update:value="handleUpdateValue"
  />
</template>
