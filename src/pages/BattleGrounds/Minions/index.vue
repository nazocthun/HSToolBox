<script setup lang="ts">
import { getCardsByFilter } from '~/api/api'
// const message = useMessage()
const cardData = ref<[Card]>([] as unknown as [Card])

const log = () => console.log(cardData.value)
const float = ref()
const changeFloat = (e: any) => float.value = e.target.scrollTop > 64

const router = useRouter()
const go = (to: string) => {
  router.push(`minions/${to}`)
}

const race = ref('all')
const raceOptions = [
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '野兽',
    value: 'beast',
  },
  {
    label: '鱼人',
    value: 'merloc',
  },
  {
    label: '机械',
    value: 'mech',
  },
  {
    label: '恶魔',
    value: 'demon',
  },
  {
    label: '龙',
    value: 'dragon',
  },
  {
    label: '海盗',
    value: 'pirate',
  },
  {
    label: '元素',
    value: 'elemental',
  },
  {
    label: '野猪人',
    value: 'quilboar',
  },
  {
    label: '娜迦',
    value: 'naga',
  },
  {
    label: '亡灵',
    value: 'undead',
  },
  {
    label: '无类型',
    value: 'none',
  },
]

const boundRace = ref('all')
const boundRaceOptions = [
  {
    label: '不指定',
    value: 'all',
  },
  {
    label: '野兽',
    value: 'beast',
  },
  {
    label: '鱼人',
    value: 'merloc',
  },
  {
    label: '机械',
    value: 'mech',
  },
  {
    label: '恶魔',
    value: 'demon',
  },
  {
    label: '龙',
    value: 'dragon',
  },
  {
    label: '海盗',
    value: 'pirate',
  },
  {
    label: '元素',
    value: 'elemental',
  },
  {
    label: '野猪人',
    value: 'quilboar',
  },
  {
    label: '娜迦',
    value: 'naga',
  },
  {
    label: '亡灵',
    value: 'undead',
  },
]

const tavernLevel = ref('0')
const levelOptions = [
  {
    label: '全部',
    value: '0',
  },
  {
    label: '1星随从',
    value: '1',
  },
  {
    label: '2星随从',
    value: '2',
  },
  {
    label: '3星随从',
    value: '3',
  },
  {
    label: '4星随从',
    value: '4',
  },
  {
    label: '5星随从',
    value: '5',
  },
  {
    label: '6星随从',
    value: '6',
  },
]

const buyable = ref(1)
const buyableOptions = [
  {
    label: '不包含衍生物',
    value: 1,
  },
  {
    label: '包含衍生物',
    value: 2,
  },
  {
    label: '衍生物',
    value: 0,
  },
]

const version = ref('latest')
const versionOptions = [
  {
    label: '当前版本',
    value: 'latest',
  },
]

const handleRaceUpdateValue = (value: string) => {
  race.value = value
}
const handleTavernLevelUpdateValue = (value: string) => {
  tavernLevel.value = value
}

const handleboundRaceUpdateValue = (value: string) => {
  boundRace.value = value
}

const handleBuyableUpdateValue = (value: number) => {
  buyable.value = value
}

const handleVersionUpdateValue = (value: string) => {
  version.value = value
}

const fecthNewCardData = async (params: {}) => {
  try {
    await getCardsByFilter(params).then((res) => {
      console.log(res)
      cardData.value = res.data
    })
  }
  catch (error) {
    console.error(error)
  }
}
watchEffect(async () => {
  const params = {
    buyable: buyable.value,
    race: race.value,
    boundrace: boundRace.value,
    tavernlevel: tavernLevel.value,
  }
  await fecthNewCardData(params)
})

onMounted(async () => {
  const params = {
    buyable: 1,
  }
  await fecthNewCardData(params)
})
</script>

<template>
  <n-scrollbar :on-scroll="changeFloat">
    <div h-full w-full>
      <n-statistic label="共找到" tabular-nums>
        <n-number-animation ref="numberAnimationInstRef" :from="0" :to="cardData.length" />
        <template #suffix>
          位随从
        </template>
      </n-statistic>
      <div
        w-full
        style="position: sticky; top: 0px; background-color: var(--n-color); padding-bottom: 1px;"
        :style="float ? 'z-index: 999;' : ''"
      >
        <n-grid cols="2 625:3 800:4 1000:5 1200:6 1600:7" :x-gap="8" :y-gap="8" responsive="self">
          <n-grid-item>
            <div py-2>
              随从种族
            </div>
            <n-select :value="race" :options="raceOptions" @update:value="handleRaceUpdateValue" />
          </n-grid-item>
          <n-grid-item>
            <div py-2>
              特定种族绑定
            </div>
            <n-select :value="boundRace" :options="boundRaceOptions" @update:value="handleboundRaceUpdateValue" />
          </n-grid-item>
          <n-grid-item>
            <div py-2>
              酒馆等级
            </div>
            <n-select :value="tavernLevel" :options="levelOptions" @update:value="handleTavernLevelUpdateValue" />
          </n-grid-item>
          <n-grid-item>
            <div py-2>
              是否可购买
            </div>
            <n-select :value="buyable" :options="buyableOptions" @update:value="handleBuyableUpdateValue" />
          </n-grid-item>
          <n-grid-item>
            <div py-2>
              版本
            </div>
            <n-select :value="version" :options="versionOptions" @update:value="handleVersionUpdateValue" />
          </n-grid-item>
        </n-grid>
        <n-divider pr-3 />
      </div>
      <n-grid cols="2 625:3 800:4 1000:5 1200:6 1600:7" responsive="self">
        <n-grid-item v-for="(card, index) in cardData" :key="index">
          <div p-1>
            <!-- {{ card.card_name }},{{ index }} -->
            <Card
              :card-id="card.card_id"
              :version="card.version"
              @click="go(card.card_id)"
            />
          </div>
        </n-grid-item>
      </n-grid>
      <n-button @click="log">
        log
      </n-button>
      <n-back-top :right="10" />
    </div>
  </n-scrollbar>
</template>
