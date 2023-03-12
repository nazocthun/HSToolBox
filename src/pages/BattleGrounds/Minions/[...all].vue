<script setup lang="ts">
import { getCardById } from '~/api/api'

const route = useRoute()
const cardId = ref('')
const cardData = ref<Card>({} as Card)
const animation = ref(false)

const fetchCard = async () => {
  try {
    await getCardById({ id: cardId.value }).then((res) => {
      cardData.value = res.data
    })
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  cardId.value = route.params.all as string
  await fetchCard()
})
</script>

<template>
  <div>
    <n-grid cols="2 625:3 800:4 1000:5 1200:6 1600:7" responsive="self">
      <n-grid-item>
        <Card
          :card-id="cardId"
          :animation="animation"
        />
      </n-grid-item>
      <n-grid-item v-if="cardData.golden_id">
        <Card
          :card-id="cardData.golden_id"
          :animation="animation"
        />
      </n-grid-item>
    </n-grid>
    <n-divider pr-3 />
    <div v-if="cardData.associated_ids">
      <h1>
        衍生物
      </h1>
      <n-grid cols="2 625:3 800:4 1000:5 1200:6 1600:7" responsive="self">
        <n-grid-item v-for="(associated_id, index) in cardData.associated_ids" :key="index">
          <Card
            :card-id="associated_id"
            :animation="animation"
          />
        </n-grid-item>
        <n-grid-item v-for="(associated_id, index) in cardData.golden_card.associated_ids" :key="index">
          <Card
            :card-id="associated_id"
            :animation="animation"
          />
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>
