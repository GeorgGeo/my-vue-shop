
<template>
  <div>
    <div class="media-grid grid grid-cols-4 gap-5" v-auto-animate="{ duration: 500, easing: 'ease-in-out' }">
      <!-- <CardVue title="Мужские Кроссовки Nike Blazer Mid Suede" imageUrl="/sneakers/sneakers-1.jpg" :price="12" :isAdded="true" :isFavorite="true" :onClickAdd="onClickAddParent" /> -->
      <CardVue v-for="item in items" :key="item.id" :item="item" :imageUrl="item.imageUrl" :price="item.price" @add="() => handleAddToCart(item)" :onClickFavorite="() => addToFavorite(item)" :onClickRemove="() => removeFromFavorite(item)" :isFavorite="item.isFavorite" :isAdded="item.isAdded" />
        <!-- :onClickAdd = "() => emit('add-to-cart', item)" -->
        <!-- :onClickAdd="onClickAdd(item)"  -->
        <!-- :onClickAdd="() => handleAddToCart(item)" -->
    </div>
    <!-- :onClickAdd = "onClickAddParent" -->
  </div>
</template>


<script setup>
import { inject } from 'vue';
import CardVue from './CardVue.vue';

defineProps({
  items: Array,
});
// const onClickAddParent = () => {
//   alert('Добавить!');
// };

const emit = defineEmits(['add-to-cart']);//Создаем emit, который будет использоваться для передачи события 'add-to-cart' с данными в родительский компонент.
function handleAddToCart(item) {
  console.log(`Adding to cart: ${item.title}`); //Выводим в консоль сообщение о добавлении товара в корзину.
  emit('add-to-cart', item);//При вызове этой функции будет срабатывать событие 'add-to-cart' с передачей объекта item в родительский компонент.
};

// function onClickAdd2(item) {
//   return () => {
//     console.log(`Adding to cart: ${item.title}`); //Выводим в консоль сообщение о добавлении товара в корзину.
//     emit('add-to-cart', item);//При вызове этой функции будет срабатывать событие 'add-to-cart' с передачей объекта item в родительский компонент.
//   };
// };
// const addToFavoriteCardList = inject('addToFavoriteCardList');//Переменная addToFavorite получает значение, которое было передано в provide под ключом 'addToFavorite'.
const addToFavorite = inject('addToFavorite');//Переменная addToFavorite получает значение, которое было передано в provide под ключом 'addToFavorite'.
// const onClickFavorite = () => {
//   const obj = {
//     ...props,
//     parentId: props.id,
//   };

//   addToFavoriteCardList(obj);
// };
const removeFromFavorite = inject('removeFromFavorite');//Переменная removeFromFavorite получает значение, которое было передано в provide под ключом 'removeFromFavorite'.

</script>


<style scoped>
  @media(max-width: 991px) {
    .media-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>