<script setup lang="ts">
const props = defineProps<{ label: string }>()
</script>

<template>
  <div flex>
    <div flex-none pr-3 text-xl flex items-center>
      {{ props.label }}
    </div>
    <n-divider />
  </div>
</template>
