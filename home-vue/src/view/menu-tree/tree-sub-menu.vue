<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';

const {treeData} = defineProps<{
  treeData: Array<any> | undefined
}>();



</script>

<template>
  <template v-for="(data,index) in treeData" :key="index">
    <a-sub-menu v-if="data.children" :key="uuidv4()+index">
      <template #icon>
        <icon-folder :size="20" style="color: green"/>
      </template>
      <template #title>{{ data.title }}</template>
      <tree-sub-menu :tree-data="data.children" @selectMenu="(url:any)=>$emit('selectMenu',url)"></tree-sub-menu>
    </a-sub-menu>
    <a-menu-item v-else :key="uuidv4()" @click="$emit('selectMenu',data.url)">
      <template #icon>
        <icon-book :size="20"/>
      </template>
      <span>{{ data.title }}</span>
    </a-menu-item>
  </template>
</template>

<style scoped>

</style>