<template>
  <div class="flex flex-col items-center justify-center p-4 m-2 bg-white rounded-lg shadow-md text-center mx-auto">
    <img height="80" width="80" :src="imageUrl" alt="Info Block Image" class="rounded-full mb-4">
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Default Title',
    },
    description: {
      type: String,
      default: 'Default Description',
    },
    imageUrl: {
      type: String,
      default: '/default-image.jpg',
    },
  });
</script>