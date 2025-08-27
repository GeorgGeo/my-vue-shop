
<template>
  <div>
    <div class="fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 z-10"></div>
    <!--  -->
    <div class="fixed top-0 right-0 h-full w-96 bg-white bg-opacity-90 z-20 p-4">
      <DrawerHead />

      <InfoBlock v-if="!totalPrice" title="Корзина пустая" description="Добавьте хотя бы одну пару кроссовок, чтобы сделать покупку." image-url="/package-icon.png" />

      <CardItemList v-if="totalPrice" />

      <!-- Детали нашей корзины -->
      <div v-if="totalPrice" class="flex flex-col gap-5 mb-6 my-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b-2 border-dashed border-indigo-500 border-b-indigo-500"></div>
          <b>{{ totalPrice }} $</b>
        </div>
        <!--  -->
        <div class="flex gap-2">
          <span>Налог 5%: </span>
          <div class="flex-1 border-b-2 border-dashed border-indigo-500 border-b-indigo-500"></div>
          <b>{{ vat }} $</b>
        </div>

        <!-- Кнопка теперь НЕ вызывает placeOrder, а переходит на страницу оплаты -->
        <!-- <router-link to="/pay" class="flex justify-center">
           
        </router-link> -->
        <button @click="handlePay" :disabled="!totalPrice" class="bg-green-500 w-full rounded-xl py-3 text-white !disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-green-600 cursor-pointer">Оформить заказ</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import CardItemList from './CardItemList.vue';
import DrawerHead from './DrawerHead.vue';
import InfoBlock from './InfoBlock.vue';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

// Деструктурируем необходимые свойства из props
const { totalPrice, vat } = defineProps({
  totalPrice: {
    type: Number,
    default: 0,
  },
  vat: {
    type: Number,
    default: 0,
  },
  placeOrder: {
    type: Function,
    default: () => {},
  },
});

// const router = useRouter();
const closeDrawer = inject('closeDrawer'); // Получаем функцию закрытия DrawerVue
const router = useRouter(); // Получаем роутер для навигации

const handlePay = async () => {
  if (!totalPrice) return; // Если нет цены, ничего не делаем

  // Здесь можно добавить логику для обработки платежа
  // Например, вызвать placeOrder или другую функцию
  // await placeOrder();
  closeDrawer(); // Закрываем DrawerVue после оплаты

  // Перенаправляем на страницу оплаты
  router.push('/pay'); // Переходим на страницу оплаты
};

</script>

<style scoped>
button:active {
  background-color: #166534; /* эквивалент bg-green-800 */
  transform: scale(0.9);
}
button {
  -webkit-tap-highlight-color: transparent;  /* Отключает подсветку на мобильных */
}
/* Отключаем подсветку только для интерактивных элементов */
button, a, [role="button"], .tap-target {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

/* Кастомный фокус для доступности */
button:focus-visible, a:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: #d1d5db; /* эквивалент bg-gray-300 */
}
</style>