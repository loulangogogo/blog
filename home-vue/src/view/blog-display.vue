<script setup lang="ts">
const {url} = defineProps<{
  url: any
}>();
</script>

<template>
  <iframe style="width: 100%;height: 100%;border: 0px" :src="url"></iframe>
</template>

<style scoped>

</style>