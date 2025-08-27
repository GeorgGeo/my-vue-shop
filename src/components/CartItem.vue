<template>
  <div>
    <div class="flex items-center border border-blue-300 p-4 rounded-xl gap-4">
      <!-- <img class="w-16 h-16" src="/sneakers/sneakers-1.jpg" alt="Sneaker"> -->
      <img class="w-16 h-16" :src="imageUrl" alt="Sneaker">

      <div class="flex flex-col">
        <!-- <p>Мужские Кроссовки Nike Air Max 270</p> -->
        <p>{{ title }}</p>

        <div class="flex justify-between mt-2">
          <!-- <b>12 $</b> -->
          <b>{{ price }} $</b>
          <img @click="onClickRemove" class="opacity-50 hover:opacity-100 cursor-pointer transition duration transform hover:scale-110 hover:rotate-180" src="/close.svg" alt="Close">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
    id: Number,
    title: String,
    price: Number,
    imageUrl: String,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickAdd: Function,
    onClickFavorite: Function,
    onClickRemove: Function, // Добавляем пропс для обработки клика на кнопку удаления
})
</script>

<style scoped>

</style>