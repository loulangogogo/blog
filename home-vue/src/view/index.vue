<script setup lang="ts">
import MenuTree from "@/view/menu-tree.vue";
import BlogDisplay from "@/view/blog-display.vue";
import {ref} from "vue";

const url = ref();

const splitSize = ref(0.3);
</script>

<template>
  <a-split class="splitClass"
           :size="splitSize">
    <template #first>
      <menu-tree @selectMenu="(data:any)=>url=data"></menu-tree>
    </template>
    <template #second>
      <blog-display :url="url"></blog-display>
    </template>
  </a-split>
</template>

<style scoped>
.splitClass {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>