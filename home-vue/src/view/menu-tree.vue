<script setup lang="ts">
import TreeSubMenu from "@/view/menu-tree/tree-sub-menu.vue";
import ask from '@/ask/index';
import {onMounted, ref} from "vue";

const treeData = ref();


onMounted(async ()=>{
  const res:any = await ask.get("https://loulangogogo.github.io/blog/index.json");
  treeData.value = res;

})
</script>

<template>
  <a-menu theme="dark" style="height: 100%;user-select: none">
    <tree-sub-menu :tree-data="treeData" @selectMenu="(url:any)=>$emit('selectMenu',url)"></tree-sub-menu>
  </a-menu>
</template>

<style scoped>

</style>