

<template>
  <div>
    <div class="flex flex-col flex-1 gap-5" v-auto-animate="{ duration: 500, easing: 'ease-in-out' }">
      <CartItem v-for="item in cart" :key="item.id" :item="item" :title="item.title" :price="item.price" :imageUrl="item.imageUrl" :onClickRemove="() => removeFromCart(item)"/>
    </div>
  </div>
</template>


<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { cart, removeFromCart } = inject('cartActions');

</script>


<style scoped>

</style>