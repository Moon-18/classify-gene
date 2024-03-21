<template>
  <nav
    class="bg-opacity-10 bg-white sticky top-0 w-full z-999 backdrop-filter backdrop-blur-lg"
    :class="{ 'shadow-lg': isScroll || ishover }"
    @mouseover="ishover = true"
    @mouseleave="ishover = false"
  >
    <div class="w-1200px mx-auto flex items-center justify-between py-4">
      <div class="flex items-center">
        <!-- <img src="logo.svg" alt="Logo" class="w-10 h-10 mr-2" /> -->
        <span class="text-xl font-semibold">机器学习在基因分类中的应用</span>
      </div>
      <ul class="flex">
        <li><NuxtLink class="px-4 py-2 text-gray-400 hover:text-gray-900" to="/">机器学习性能比较</NuxtLink></li>
        <li><NuxtLink class="px-4 py-2 text-gray-400 hover:text-gray-900" to="/meaning">生物学意义</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isScroll } = useScroll();
const ishover = ref(false);
</script>

<style scoped></style>
