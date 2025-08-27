<template>
  <div>
    <div class="flex justify-center items-center gap-2 mt-6">
      <button @click="prevPage" :disabled="pagination.currentPage === 1">Назад</button>
      <span class="text-center">Страница {{ pagination.currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="pagination.currentPage === totalPages">Вперёд</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const pagination = inject('pagination');
// const totalItems = inject('totalItems');
const totalPages = computed(() => {
  return Math.ceil(pagination.totalItems / pagination.itemsPerPage);
});
const prevPage = () => {
  if (pagination.currentPage > 1) {
    pagination.currentPage--;
  }
};
const nextPage = () => {
  if (pagination.currentPage < totalPages.value) {
    pagination.currentPage++;
  }
};
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
span {
  font-weight: bold;
}


</style>