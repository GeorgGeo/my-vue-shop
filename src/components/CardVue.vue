<template>
  <div>
    <div class="media-card card relative bg-green-200 border border-indigo-400 rounded-3xl p-8 sm:p-4 md:p-8 cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-green-300">
      <!-- <img @click="isFavorite ? onClickRemove() : onClickFavorite()" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Like 1" class="absolute top-8 left-8"> -->
      

      <img @click="props.item.isFavorite ? onClickRemove() : onClickFavorite()" :src="!props.item.isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Like 1" class="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">


      <!-- <img @click="isFavorite.value ? onClickRemove() : onClickFavorite()" :src="!isFavorite.value ? '/like-1.svg' : '/like-2.svg'" alt="Like 1" class="absolute top-8 left-8"> -->

      <!-- <img :src="item.imageUrl" alt="Sneaker" class="rounded">
      <p class="mt-2">{{ props.item.title }}</p> -->
      <img :src="props.item.imageUrl" alt="Sneaker" class="max-w-48 max-h-48 w-auto h-auto object-contain rounded">
      <p class="mt-2">{{ props.item.title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-gray-500">Цена:</span>
          <span class="text-black font-bold">{{ props.item.price }} $</span>
        </div>

        <img @click="emit('add', props.item)" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">
        <!-- <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus"> -->
      </div>
    </div>
  </div>
</template>


<script setup>

// import { toRef } from 'vue';

const props = defineProps({
  item: Object,
  onClickAdd: Function,
  onClickFavorite: Function,
  onClickRemove: Function,
  isAdded: Boolean,
});
const emit = defineEmits(['add']);
console.log(`CardVue props:`, props);
// id: Number,
//   title: String,
//   imageUrl: String,
//   price: Number,
//   isFavorite: Boolean,
//   isAdded: Boolean,

// Создаем реактивную ссылку на isFavorite
// const isFavorite = toRef(props.item, 'isFavorite');
</script>

<style scoped>
  @media (max-width: 768px) {
    .media-card {
      padding: 8px;
    }
  }
</style>