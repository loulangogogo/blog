<script setup lang="ts">
import TreeSubMenu from "@/view/menu-tree/tree-sub-menu.vue";
import treeData from '../../../index.json'
</script>

<template>
  <a-menu theme="dark" style="height: 100%;user-select: none">
    <tree-sub-menu :tree-data="treeData" @selectMenu="(url:any)=>$emit('selectMenu',url)"></tree-sub-menu>
  </a-menu>
</template>

<style scoped>

</style>