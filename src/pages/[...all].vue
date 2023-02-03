<script setup lang="ts">
const router = useRouter()

function returnToHomePage() {
  router.push('/')
}
</script>

<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="returnToHomePage">
        回到主页
      </n-button>
    </template>
  </n-result>
</template>
