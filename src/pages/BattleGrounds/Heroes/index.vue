<script setup lang="ts">
import type { LayoutInst } from 'naive-ui'
import type { Ref } from 'vue'
import type { FormValidationStatus } from 'naive-ui/es/form/src/interface'
import { storeToRefs } from 'pinia'
import { getHeroesByFilter } from '~/api/api'
import { useToolBoxStore } from '~/store'

const store = useToolBoxStore()
const { scrollTop, heroPageScrollTop } = storeToRefs(store)

const router = useRouter()
const go = (id: string) => {
  router.push(`heroes/${id}`)
}

// menu options & handler
const races = ref(['ALL'])
const status = ref('success' as FormValidationStatus)
const boundRaceOptions = [
  {
    label: '不指定',
    value: 'ALL',
  },
  {
    label: '野兽',
    value: 'BEAST',
  },
  {
    label: '鱼人',
    value: 'MERLOC',
  },
  {
    label: '机械',
    value: 'MECH',
  },
  {
    label: '恶魔',
    value: 'DEMON',
  },
  {
    label: '龙',
    value: 'DRAGON',
  },
  {
    label: '海盗',
    value: 'PIRATE',
  },
  {
    label: '元素',
    value: 'ELEMENTAL',
  },
  {
    label: '野猪人',
    value: 'QUILBOAR',
  },
  {
    label: '娜迦',
    value: 'NAGA',
  },
  {
    label: '亡灵',
    value: 'UNDEAD',
  },
]
const handleBoundRaceUpdateValue = (value: string[]) => {
  if (value.length === 0) {
    value.push('ALL')
  }
  else if (value[0] === 'ALL') {
    const index = value.indexOf('ALL')
    value.splice(index, 1)
  }
  else if (value.includes('ALL')) {
    value = ['ALL']
  }
  if (value.length > 5) {
    value.pop()
    status.value = 'error'
  }
  else {
    status.value = 'success'
  }
  races.value = value
}

// fetch data
const heroesData = ref<[Hero]>([] as unknown as [Hero])
const fecthNewHeroesData = async (params: {}) => {
  try {
    await getHeroesByFilter(params).then((res) => {
      heroesData.value = res.data
    })
  }
  catch (error) {
    console.error(error)
  }
}

// reload data
watchEffect(async () => {
  const params = {
    boundrace: races.value,
  }
  await fecthNewHeroesData(params)
})

// remember scrollbar position
const contentRef = inject('getContentRef') as Ref<LayoutInst | null>
const heroPageScroll = () => {
  contentRef.value?.scrollTo({ top: heroPageScrollTop.value })
}
onActivated(() => {
  heroPageScroll()
})
onDeactivated(() => {
  heroPageScrollTop.value = scrollTop.value
})
</script>

<template>
  <div>
    <n-statistic label="共找到" tabular-nums>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="heroesData.length" />
      <template #suffix>
        位英雄
      </template>
    </n-statistic>
    <n-card w-full style="position: sticky; top: 0px; padding-bottom: 1px; z-index: 999;">
      <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
        <n-grid-item span="2">
          <div py-2>
            选择种族<span v-if="status === 'error'" text-red>最多选择5个种族</span>
          </div>
          <n-select
            :value="races"
            multiple
            clearable
            :status="status"
            max-tag-count="responsive"
            :options="boundRaceOptions"
            @update:value="handleBoundRaceUpdateValue"
          />
        </n-grid-item>
      </n-grid>
    </n-card>
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item v-for="(hero, index) in heroesData" :key="index">
        <Hero
          :hero-id="hero.id"
          :hero-name="hero.name"
          @click="go(hero.id)"
        />
      </n-grid-item>
    </n-grid>
    <n-back-top :right="10" />
  </div>
</template>

<route>
{
  name: "BattleGrounds-Heroes",
  meta: {
    keepAlive: true,
  },
}
</route>
