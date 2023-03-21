<script setup lang="ts">
const props = defineProps({
  cardType: {
    type: String, // 'render' | 'bgs' | 'render-merc-lvl30'
    default: () => 'render',
  },
  cardId: {
    type: String,
    default: () => '',
  },
  animation: {
    type: Boolean,
    default: () => true,
  },
})

const imageUrl = computed(() => `https://images.fbigames.com/hs/${props.cardType}/${props.cardId}.png`)
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
</script>

<template>
  <div ref="card">
    <n-image
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
