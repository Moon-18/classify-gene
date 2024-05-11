<template>
  <table class="w-full divide-y divide-gray-200">
    <thead class="bg-gray-50 w-full">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-for="t in title">
          {{ t }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 w-full">
      <tr
        v-for="(item, index) in info"
        :key="index"
        class="bg-white hover:bg-gray-200"
        :class="{ 'bg-gray-100': index % 2 === 1 }">
        <td
          class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-400px whitespace-pre-wrap"
          v-for="(value, key) in item"
          :style="{ 'min-width': 100 / title.length + '%' }">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const { info, title } = defineProps<{
  info: Record<string, string>[];
  title: string[];
}>();
</script>

<style scoped></style>
