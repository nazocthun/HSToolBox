<script setup lang="ts">
import { getHeroById } from '~/api/api'

const props = defineProps<{ heroId: string }>()

// fetch data
const heroData = ref<Hero>({
  heroSkillId: '',
  hero_skins: [] as HeroSkin[],
  associatedCardId: '',
  buddies_id: '',
} as Hero)
const fecthHero = async (heroId: string) => {
  try {
    await getHeroById({ id: heroId }).then((res) => {
      console.log(res.data)
      heroData.value = res.data
    })
  }
  catch (error) {
    console.error(error)
  }
}

watch(() => props.heroId, async () => {
  await fecthHero(props.heroId)
})

onMounted(async () => {
  console.log(props.heroId)
  await fecthHero(props.heroId)
})
</script>

<template>
  <div>
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item>
        <Card :card-id="props.heroId" card-type="bgs" :animation="false" />
      </n-grid-item>
      <n-grid-item span="1 s:2 m:3 l:4 xl:5 2xl:6">
        <div pl-5>
          <div text-xl>
            {{ heroData.name }}
          </div>
          <n-divider />
          <div text-xl>
            生命：{{ heroData.health }}
          </div>
          <div text-xl>
            护甲：{{ heroData.armor ? heroData.armor : '0' }}
          </div>
          <div text-xl>
            护甲：{{ heroData.armor }}
          </div>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-if="heroData.heroSkillId && heroData.heroSkillId !== ''">
    <LabelDivider label="技能" />
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item v-for="(skill, index) in heroData.heroSkillId.split(',')" :key="index">
        <Card :card-id="skill" card-type="bgs" :animation="false" />
      </n-grid-item>
      <n-grid-item span="1 625:2 800:3 1000:4 1200:5 1600:6">
        <div v-if="props.heroId === 'BG24_HERO_100'">
          见 任务
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-if="heroData.hero_skins.length !== 0">
    <LabelDivider label="皮肤" />
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item v-for="(skin, index) in heroData.hero_skins" :key="index">
        <Card :card-id="skin.skin_id" card-type="bgs" :animation="false" />
        <div flex justify-center b-1 rounded-1 translate-y--10>
          {{ skin.skin_name }}
        </div>
      </n-grid-item>
    </n-grid>
  </div>
  <div v-if="heroData.associatedCardId && heroData.associatedCardId !== ''">
    <LabelDivider label="关联卡牌" />
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item v-for="(id, index) in heroData.associatedCardId.split(',')" :key="index">
        <Card :card-id="id" card-type="bgs" :animation="false" />
      </n-grid-item>
    </n-grid>
  </div>
  <div v-if="heroData.buddies_id && heroData.buddies_id !== ''">
    <LabelDivider label="伙伴" />
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="8" :y-gap="8" responsive="screen">
      <n-grid-item v-for="(buddy_id, index) in heroData.buddies_id.split(',')" :key="index">
        <Card :card-id="buddy_id" card-type="bgs" :animation="false" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<route>
{
  meta: {
    keepAlive: false
  }
}
</route>
