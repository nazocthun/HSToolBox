<script setup lang="ts">
import { getImageByIdAndVersion } from '~/api/api'

const props = defineProps<{ cardId: string; version?: string }>()

const imageUrl = ref('')
const init = async () => {
  const params = {
    id: props.cardId,
    version: props.version,
  }
  await getImageByIdAndVersion(params).then((res) => {
    // console.log(res.data)
    imageUrl.value = res.data
  })
}
watch(() => props.cardId, init)
onMounted(() => {
  init()
})
</script>

<template>
  <n-image
    cursor-pointer
    transition-all-350
    hover:scale-108
    hover:transition-all-350
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
</template>

<style>

</style>
