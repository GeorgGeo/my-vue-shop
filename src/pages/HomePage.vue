
<script setup>
import { inject } from 'vue';
import CardList from '../components/CardList.vue';
import PaginationVue from '../components/PaginationVue.vue';
// import PayByCard from '@/components/PayByCard.vue';

const itemsArray = inject('itemsArray');
// const cart = inject('cart');

// const props = defineProps({
//   items: Array,
// });
const { addToCart } = inject('cartActions');
const filters = inject('filters');

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};
</script>

<template>
  <div>
    <div class="media-class flex justify-between items-center">
      <h2 class="text-3xl font-bold p-3 mb-5">Все кроссовки</h2>

      <div class="media-class flex gap-4">
        <select @change="onChangeSelect" class="py-1 px-3 border-2 rounded-xl outline-none focus:border-gray-400" name="sort" id="sort-select">
          <option value="title-asc">По названию</option>
          <option value="price-asc">По цене (дешёвые)</option>
          <option value="price-desc">По цене (дорогие)</option>
        </select>

        <div class="relative">
          <img class="absolute top-1/2 left-4 transform -translate-y-1/2" src="/search.svg" alt="Search" width="16" height="16">

          <input @input="onChangeSearchInput" class="border-2 rounded-xl py-1 pl-10 pr-4 outline-none focus:border-gray-400" type="text" placeholder="Поиск...">
        </div>
      </div>

    </div>

    <div class="mt-10">
      <!-- <CardList :items="itemsArray" /> -->
      <CardList :items="itemsArray" @add-to-cart="addToCart" />
      <!-- Компонент пагинации -->
      <PaginationVue />

      <!-- <PayByCard /> -->

      <!-- <CardList :items="props.items" @add-to-cart="addToCart" /> -->
    </div>
    <!--  -->
  </div>
</template>

<style scoped>
  @media(max-width: 991px) {
    .media-class {
      flex-direction: column;
    }
  }
</style>