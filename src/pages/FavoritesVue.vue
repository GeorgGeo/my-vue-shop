<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const favoritesItems = ref([]);// Массив для хранения закладок. Будем хранить реальные товары, а не фейковые данные из favorites
const isLoading = ref(true); // Флаг загрузки
// Изначально true, чтобы показать индикатор загрузки

onMounted(async () => {
  try {
    // 1. Получаем список избранных товаров (с parentId )
    const { data: favorites } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/favorites');
    // 2. Получаем список товаров по их ID
    const { data: items } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items');
    // 3. Фильтруем товары по ID из избранных
    favoritesItems.value = items.filter(item => favorites.some(fav => fav.parentId === item.id));

  } catch (error) {
    console.error('Ошибка при загрузке закладок:', error);
    toast.error('Не удалось загрузить закладки');
  } finally {
    isLoading.value = false;
  }
})

</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Мои закладки</h1>

    <div v-if="isLoading" class="text-gray-500">Загрузка...</div>

    <ul v-else-if="favoritesItems.length > 0" class="text-gray-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <li v-for="item in favoritesItems" :key="item.id" class="border rounded-lg p-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img :src="item.imageUrl" :alt="item.title" class="w-full h-48 object-cover mb-4">
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ item.title }}</h3>
          <p class="text-red-600 font-bold mt-2">{{ item.price }} $</p>
          <button
            @click="$router.push('/')" class="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            В каталог
          </button><!-- Возвращаемся на главную -->
        </div>

      </li>
    </ul>

  </div>
</template>