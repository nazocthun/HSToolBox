<script setup lang="ts">
import { getImageByIdAndVersion } from '~/api/api'

const props = defineProps({
  cardId: {
    type: String,
    default: () => '',
  },
  animation: {
    type: Boolean,
    default: () => true,
  },
})

const imageUrl = ref('')
const init = async () => {
  const params = {
    id: props.cardId,
  }
  if (props.cardId !== '') {
    await getImageByIdAndVersion(params).then((res) => {
      imageUrl.value = res.data
    })
  }
}

// 动态卡牌
const card = ref()
const { elementX, elementY, elementHeight, elementWidth, isOutside } = useMouseInElement(card)

watchEffect(() => {
  if (!isOutside.value && props.animation) {
    const rotateX = (elementHeight.value / 2 - elementY.value) / 7
    const rotateY = -(elementWidth.value / 2 - elementX.value) / 7
    card.value.style.cssText = `transform: perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);`
  }
})
watch(() => isOutside.value, () => {
  if (isOutside.value && props.animation)
    card.value.style.cssText = 'transition: all 1000ms; transform: perspective(1000px) rotateX0deg) rotateY(0deg);'
})

watch(() => props.cardId, init)
onMounted(() => {
  init()
})
</script>

<template>
  <div ref="card">
    <n-image
      :class="{ 'hover:scale-110 hover:transition-all-350 transition-all-1000 cursor-pointer': props.animation }"
      :src="imageUrl"
      preview-disabled
    >
      <template #placeholder>
        <div
          style="
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0001;
        "
        >
          Loading
        </div>
      </template>
    </n-image>
  </div>
</template>

<style>

</style>
