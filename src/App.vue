<script setup>
import { onMounted, reactive, ref, watch, provide, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';// Importing toast for notifications Импорт хука для тостов  

import HeaderVue from './components/HeaderVue.vue';
// import CardVue from './components/CardVue.vue';
// import CardList from './components/CardList.vue';
import DrawerVue from './components/DrawerVue.vue';
// import HomePage from './pages/HomePage.vue';
import { useRouter } from 'vue-router'; // Импортируем useRouter для навигации

// Создаём экземпляр роутера
const router = useRouter(); // Теперь можно использовать router.currentRoute

// const itemsArray = [
//   {
//     "id": 1,
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 12999,
//     "imageUrl": "/sneakers/sneakers-1.jpg"
//   },
//   {
//     "id": 2,
//     "title": "Мужские Кроссовки Nike Air Max 270",
//     "price": 15600,
//     "imageUrl": "/sneakers/sneakers-2.jpg"
//   },
//   {
//     "id": 3,
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "/sneakers/sneakers-3.jpg"
//   },
//   {
//     "id": 4,
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": 7800,
//     "imageUrl": "/sneakers/sneakers-4.jpg"
//   },
//   {
//     "id": 5,
//     "title": "Кроссовки Future Rider",
//     "price": 9550,
//     "imageUrl": "/sneakers/sneakers-5.jpg"
//   },
//   {
//     "id": 6,
//     "title": "Кроссовки Black Edition",
//     "price": 16999,
//     "imageUrl": "/sneakers/sneakers-6.jpg"
//   },
//   {
//     "id": 7,
//     "title": "Кроссовки Orange Boomb Edition",
//     "price": 7499,
//     "imageUrl": "/sneakers/sneakers-7.jpg"
//   },
//   {
//     "id": 8,
//     "title": "Кроссовки Nike Air Max 270",
//     "price": 15600,
//     "imageUrl": "/sneakers/sneakers-8.jpg"
//   },
//   {
//     "id": 9,
//     "title": "Кроссовки Nike Air Force 1",
//     "price": 5900,
//     "imageUrl": "/sneakers/sneakers-9.jpg"
//   },
//   {
//     "id": 10,
//     "title": "Кроссовки Adidas Ultraboost",
//     "price": 11500,
//     "imageUrl": "/sneakers/sneakers-10.jpg"
//   },
//   {
//     "id": 11,
//     "title": "Кроссовки Puma Clyde All-Pro",
//     "price": 7600,
//     "imageUrl": "/sneakers/sneakers-11.jpg"
//   },
//   {
//     "id": 12,
//     "title": "Кроссовки Converse Chuck Taylor All-Star",
//     "price": 13000,
//     "imageUrl": "/sneakers/sneakers-12.jpg"
//   },
// ];
const toast = useToast(); // Инициализация тостов

// const itemsArray = ref([]);// { value: [] } - для хранения товаров
const itemsArray = ref([]);// { value: [] }
const cart = ref([]);// { value: [] } - для хранения товаров в корзине


// const totalPrice = cart.value.reduce((acc, item) => acc + item.price, 0);//Не реактивная переменная, возвращается не reactive(1500), а 1500. Для хранения общей цены товаров в корзине
const pagination = reactive({
  currentPage: 1,
  itemsPerPage: 4, // Количество товаров на странице
  totalItems: 0, // Общее количество товаров
});// Реактивная переменная для хранения текущей страницы и количества товаров на странице

const placeOrder = async () => {
  try {
    // Отправляем данные о заказе на сервер
    const orderData = {
      items: cart.value,
      totalPrice: totalPrice.value,
      vatPrice: vatPrice.value,
      date: new Date().toISOString(), // Добавляем дату заказа
      // Дополнительные данные, если нужно
      // user: {
      //   name: 'Имя пользователя',
      //   email: 'Email пользователя',
      // },
      // address: 'Адрес доставки',
      // phone: 'Телефон пользователя',
      // paymentMethod: 'Способ оплаты',
    };
    // console.log(orderData);
    const response = await axios.post('https://sneakers.free.beeceptor.com/orders', orderData);
    console.log('Заказ успешно оформлен:', response.data);
    console.log('Ответ от сервера Beeceptor:', response.data);// Для проверки ответа от сервера Beeceptor
    toast.success('Заказ успешно оформлен! Ждите уведомления', { dangerouslyUseHTMLString: true }); // Уведомление об успешном оформлении заказа

    // Сброс флагов isAdded для всех товаров в корзине
    itemsArray.value.forEach(item => {
      item.isAdded = false; // Сбрасываем флаг isAdded для каждого товара
    });
    // похожий аналог
    // cart.value.forEach(item => item.isAdded = false);

    // Очищаем корзину

    cart.value = []; // Очищаем корзину после оформления заказа
    // обновить localStorage
    localStorage.setItem('cart', JSON.stringify(cart.value)); // Сохраняем пустую корзину в localStorage
    // Закрыть DrawerVue после оформления заказа
    closeDrawer(); 
  } catch (err) {
    console.error('Ошибка при оформлении заказа:', err);
    toast.error('Не удалось оформить заказ. Попробуйте снова.'); // Уведомление об ошибке при оформлении заказа
  }
};

// const totalPrice = ref(0);// { value: 0 } - для хранения общей цены товаров в корзине
const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0);
});// Реактивная переменная для хранения общей цены товаров в корзине
const vatPrice = computed(() => {
  return (totalPrice.value * 0.05).toFixed(2); // Вычисляем налог 5% от общей цены
});// Реактивная переменная для хранения налога 5% от общей цены товаров в корзине

const addToCart = (item) => {
  console.log(`Товар ${item.title} добавлен в корзину`);// Для проверки, что item(товар) добавляется в cart(корзину)

  // Данная функция будет вшивать item(товар) в cart(корзину)
  // Проверяем, есть ли товар в корзине
  // const existingItem = cart.value.find(cartItem => cartItem.id === item.id);
  // if (existingItem) {
  //   existingItem.quantity++;
  // } else {
  //   cart.value.push({ ...item, quantity: 1 });
  // };
  

  if (!item.isAdded) { // Проверяем, что товар не добавлен в корзину и не существует в корзине
    cart.value.push(item);// Добавляем товар в корзину
    item.isAdded = true; // Устанавливаем флаг isAdded в true
    toast.success(`Товар "${item.title}" добавлен в корзину`); // Уведомление об успешном добавлении товара в корзину
  } else { // Проверяем, что товар уже добавлен в корзину
    cart.value.splice(cart.value.indexOf(item), 1);// Удаляем товар из корзины
    // console.log(cart.value);
    item.isAdded = false; // Устанавливаем флаг isAdded в false
    toast.info(`Товар "${item.title}" удалён из корзины`); // Уведомление об удалении товара из корзины
  };
  // console.log(`Корзина: ${JSON.stringify(cart.value)}`);// Для проверки, что cart(корзина) обновляется
  console.log(`Корзина:`, cart.value);// Для проверки, что cart(корзина) обновляется
};
// Новая функция для удаления товара из корзины
const removeFromCart = (item) => {
  const index = cart.value.findIndex(cartItem => cartItem.id === item.id);

  // Проверка на наличие item и item.id
  if (!item || !item.id) {
    console.error('Ошибка: item или item.id не определены');
    toast.error('He удалось удалить товар. Попробуйте снова.');
    return;
  };

  if (index !== -1) {
    cart.value.splice(index, 1);
    item.isAdded = false; // Устанавливаем флаг isAdded в false
    toast.info(`Товар "${item.title}" удалён из корзины`); // Уведомление об удалении товара из корзины
  };
};

const drawerVisible = ref(false);// Для управления видимостью DrawerVue
//=================
const closeDrawer = () => {
  drawerVisible.value = false; // Закрываем DrawerVue
};
const openDrawer = () => {
  drawerVisible.value = true; // Открываем DrawerVue
};
//==================
// * Переменные и Метод для получения количества закладок и отображения окна
const showFavoritesWindow = ref(false);
const favoritesCount = ref(0);

const fetchFavoritesCount = async () => {
  try {
    const { data: favorites } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/favorites');
    favoritesCount.value = favorites.length; // Обновляем количество закладок
    // showFavoritesWindow.value = true; // Показываем окно с количеством закладок
    console.log(`Количество закладок: ${favoritesCount.value}`);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    toast.error('Не удалось загрузить количество закладок. Попробуйте снова.');
  }
};
// Обработчик события от Header.vue
const handleShowFavorites = async () => {
  await fetchFavoritesCount(); // Получаем количество закладок при открытии окна
  showFavoritesWindow.value = true; // Открываем окно только при клике
};
// console.log(itemsArray.value);// Для проверки, что массив реактивен и пустой
// console.log(itemsArray);// Для проверки, что массив реактивен и пустой

// Закрытие окна (опционально, если нужно добавить кнопку закрытия)
// const closeFavoritesWindow = () => {
//   showFavoritesWindow.value = false;
// };
// console.log(itemsArray.value);// Для проверки, что массив реактивен и пустой

//!==========================
// const filters = ref({
//   sortBy: '',
//   searchQuery: '',
// });
const filters = reactive({
  sortBy: 'title-asc',
  searchQuery: '',
});

const fetchFavorites = async (params = {}) => {
  try {
    const { data: favorites } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/favorites', {
      params,
    });
    //(obj) => ({ ... })	✅	Краткая форма, сразу возвращает объект
    // itemsArray.value = data.map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   isAdded: false,
    // }));
    if (!itemsArray.value.length) return;
    //**Переобновляем наши товары */
    itemsArray.value = itemsArray.value.map((obj) => {
      console.log(obj);
      const favorite = favorites.find(favorite => favorite.parentId === obj.id);

      if (!favorite) {
        return obj;
      };

      return {
        ...obj,
        isFavorite: true,
        // isAdded: false,
        favoriteId: favorite.id,
      }
    });
    // Обновляем favoritesCount после обработки
    favoritesCount.value = favorites.length; // Синхронизация с fetchFavorites
    console.log('Favorites after fetch:', itemsArray.value);
    console.log(itemsArray);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    toast.error('Не удалось загрузить избранное. Попробуйте снова.');
  }
};

const addToFavoriteFunction = async (item) => {
  // item.isFavorite = true;
  // item.isFavorite = !item.isFavorite;
  // console.log(item);
  try {
    // const { data } = await axios.post('https://681ca7baf74de1d219ad4697.mockapi.io/favorites', {
    //   itemId: item.id,
    //   isFavorite: item.isFavorite,
    // });
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
      };
      const { data } = await axios.post('https://681ca7baf74de1d219ad4697.mockapi.io/favorites', obj);
      item.isFavorite = true;
      item.favoriteId = data.id; // Сохраняем favoriteId - закладка id

      toast.success('Это правильный выбор! Добавлено в избранное!'); // Уведомление об успехе
      console.log(data);
    } else {
      await axios.delete(`https://681ca7baf74de1d219ad4697.mockapi.io/favorites/${item.favoriteId}`);
      item.isFavorite = false;
      item.favoriteId = null;

      toast.success('Очень жаль! Удалено из избранного!'); // Уведомление об успехе
    }
    // Обновляем favoritesCount после изменения
    await fetchFavoritesCount();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    toast.error('Не удалось изменить избранное. Попробуйте снова.'); // Уведомление об ошибке
  }
};

const removeFromFavorite = async (item) => {
  // item.isFavorite = false;
  // console.log(item);
  try {
    if (item.isFavorite && item.favoriteId) {
      await axios.delete(`https://681ca7baf74de1d219ad4697.mockapi.io/favorites/${item.favoriteId}`);

      item.isFavorite = false;
      item.favoriteId = null;

      toast.success('Очень жаль! Удалено из избранного!'); // Уведомление об успехе
    } else {
      console.warn('Попытка удалить несуществующую запись из избранного');
      toast.warning('Элемент не находится в избранном.');
    }
    // Обновляем favoritesCount после удаления
    await fetchFavoritesCount();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    toast.error('Не удалось удалить из избранного. Попробуйте снова.'); // Уведомление об ошибке
  }
};

const fetchItems = async (params = {}) => {
  try {
    // Сначала получаем ВСЕ товары, чтобы узнать их общее количество
    const countResponse = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items');
    const totalCount = countResponse.data.length;
    pagination.totalItems = totalCount; // Обновляем общее количество товаров для пагинации
    
    // Запрашиваем текущую страницу товаров
    params = {
      ...params,
      limit: pagination.itemsPerPage, // Ограничиваем количество возвращаемых товаров
      page: pagination.currentPage, // Добавляем текущую страницу для пагинации
    };
    // if (filters.searchQuery) {
    //   // params.title = filters.searchQuery;
    //   params.title = `*${filters.searchQuery}*`;
    // };

    const { data } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items', {
      params,
    });
    console.log(data);//**Ответ Axios со всеми настройками - ЕСЛИ БЕЗ ДЕСТРУКТУРИЗАЦИИ */
    //В fetchItems добавлена инициализация
    //Это гарантирует, что все элементы имеют свойства isFavorite и favoriteId, предотвращая проблемы с реактивностью.

    // Обновляем itemsArray
    itemsArray.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false, // Добавляем isAdded для отслеживания добавления в корзину
    }));//** Добавляем isFavorite и favoriteId к каждому элементу */ 
    // itemsArray.value = data;//вшиваем в items.value ответ от сервера data

    // Обновляем информацию о закладках
    await fetchFavorites(); // Обновляем избранное после получения товаров
  } catch (err) {
    console.log(`ERROR: ${err}`);
    console.error(`Ошибка при загрузке товаров: ${err.message}`);
    toast.error('Не удалось загрузить товары. Попробуйте снова.');
  }
};

// onMounted(async () => {
//   // fetch('https://681ca7baf74de1d219ad4697.mockapi.io/items').then(res => res.json()).then(data => {
//   //   console.log(data);
//   // });
//   // axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items').then((resp) => console.log(resp.data));

//   try {
//     const { data } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items');
//     console.log(data);//**Ответ Axios со всеми настройками - ЕСЛИ БЕЗ ДЕСТРУКТУРИЗАЦИИ */
//     itemsArray.value = data;//вшиваем в items.value ответ от сервера data 
//   } catch (err) {
//     console.log(`ERROR: ${err}`);
//   }
// });

//!**Синтаксис watch */
//watch(source, callback)
//source — это что нужно отслеживать (реактивная переменная, объект, или функция)

//callback(newVal, oldVal) — что делать, когда source изменится:
//newVal — новое значение
//oldVal — предыдущее значение

//watch(() => filters.value.sortBy,// ⬅️ источник: функция, возвращающая отслеживаемое значение
//async () => {// ⬅️ колбэк вызывается, когда это значение меняется

//watch(() => filters.value.sortBy, async (newVal) => {

onMounted(async () => {
  
  //fetchItems();
  await fetchItems(); // Сначала загружаем элементы
  await fetchFavorites();// Затем обновляем статус избранного
  await fetchFavoritesCount(); // Инициализируем favoritesCount

  // Инициализация корзины из localStorage
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];// Если в localStorage есть корзина, то загружаем её, иначе создаём пустую корзину
  // Устанавливаем флаг isAdded для товаров в корзине
  itemsArray.value.forEach(item => {
    item.isAdded = cart.value.some(cartItem => cartItem.id === item.id);
  });

  // console.log(itemsArray.value);
});

onMounted(() => {
  const setItemsPerPage = () => {
    pagination.itemsPerPage = window.innerWidth <= 480 ? 2 : 4;
  };

  setItemsPerPage();
  window.addEventListener('resize', setItemsPerPage);

  // Не забудь подгрузить товары после установки
  fetchItems();
});

watch(filters, () => {
  const [field, order] = filters.sortBy.split('-');

  fetchItems({
    sortBy: field,
    order: order || 'asc',
    search: filters.searchQuery,
  });
}, { deep: true, immediate: true });

// Работа с localStorage
watch(cart, (newCart) => {
  console.log('Saving cart to localStorage:', newCart); // Для отладки
  // любое изменение в cart(корзине) будет сохранять его в localStorage
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true, immediate: true });
// Инициализация корзины из localStorage
// onMounted(() => {
//   const savedCart = localStorage.getItem('cart');
//   if (savedCart) {
//     cart.value = JSON.parse(savedCart);
//     // Устанавливаем флаг isAdded для товаров в корзине
//     itemsArray.value.forEach(item => {
//       item.isAdded = cart.value.some(cartItem => cartItem.id === item.id);
//     });
//   }
// });


// watch(filters, async () => {
//   try {
//     // const [field, order] = sortBy.value.split('-');// Разделяем строку "price-desc" на ["price", "desc"]
//     // const [field, order] = filters.value.sortBy.split('-');//for ref
//     // const [field, order] = newVal.split('-');//fpr async (newVal)
//     const [field, order] = filters.sortBy.split('-');

//     const { data } = await axios.get('https://681ca7baf74de1d219ad4697.mockapi.io/items', {
//       params: {
//         sortBy: field,
//         order: order || 'asc',// если порядок не указан, по умолчанию asc
//       }
//     });
//     itemsArray.value = data;
//   } catch (err) {
//     console.log(`ERROR: ${err}`);
//   }
// });

watch(() => pagination.currentPage, () => {
  const [field, order] = filters.sortBy.split('-');
  fetchItems({
    sortBy: field,
    order: order || 'asc',
    search: filters.searchQuery,
    limit: pagination.itemsPerPage, // Ограничиваем количество возвращаемых товаров
    page: pagination.currentPage, // Добавляем текущую страницу для пагинации
  });
}, { immediate: true }); // Вызываем сразу при монтировании

watch(() => router.currentRoute.value.path, //// Следим за путём (path)
  (newPath) => {
  if (newPath !== '/pay') {
    closeDrawer(); // Закрываем DrawerVue при переходе на другие страницы
  }
}, { immediate: true });// Проверяем сразу при монтировании


provide('itemsArray', itemsArray); // Предоставляем itemsArray для использования в других компонентах
provide('cart', cart); // Предоставляем cart для использования в других компонентах

provide('addToFavorite', addToFavoriteFunction);//➡️ Здесь 'addToFavorite' — ключ (строка), а addToFavoriteFunction — значение, которое ты передаёшь.
// provide('addToFavoriteCardList', addToFavoriteFunction);
provide('removeFromFavorite', removeFromFavorite);//➡️ Здесь 'removeFromFavorite' — ключ (строка), а removeFromFavorite — значение, которое ты передаёшь.

provide('cartActions', {
  cart, // Передаём cart для доступа к корзине
  addToCart, // Передаём функцию добавления в корзину
  removeFromCart, // Передаём функцию удаления из корзины
  closeDrawer, // Передаём функцию закрытия DrawerVue
  openDrawer,   // Передаём функцию открытия DrawerVue
});

// ==========
provide('favoritesCount', favoritesCount); // Предоставляем favoritesCount для использования в других компонентах
provide('fetchFavoritesCount', fetchFavoritesCount); // Предоставляем функцию для обновления количества избранного
provide('fetchFavorites', fetchFavorites); // Предоставляем функцию для обновления избранного
// ==========
provide('filters', filters); // Предоставляем filters для использования в других компонентах
// provide('filters', reactive(filters)); // Предоставляем реактивные filters для использования в других компонентах

provide('pagination', pagination); // Предоставляем pagination для использования в других компонентах

provide('placeOrder', placeOrder); // Предоставляем функцию placeOrder для использования в других компонентах

provide('totalPrice', totalPrice); // Предоставляем totalPrice для использования в других компонентах

provide('closeDrawer', closeDrawer); // Предоставляем closeDrawer для использования в других компонентах
provide('openDrawer', openDrawer); // Предоставляем openDrawer для использования в других компонентах
</script>

<template>
  <div>
    <DrawerVue v-if="drawerVisible" :total-price="totalPrice" :vat="vatPrice" :place-order="placeOrder" />
    <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">

      <HeaderVue :total-price="totalPrice" :favorites-count="favoritesCount" @show-favorites="handleShowFavorites" @open-drawer="openDrawer" />

      <div class="main p-4">
        <!-- <HomePage @add-to-cart="addToCart" @show-favorites="handleShowFavorites" :items="itemsArray" /> -->
        <!-- <HomePage @add-to-cart="addToCart" />
        <HomePage />
        <CardList :items="itemsArray" @add-to-cart="addToCart" /> -->

        <router-view></router-view>
      </div>
      
    </div>
    <!-- Окно с количеством закладок -->
    <div v-if="showFavoritesWindow" class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4">Закладки</h2>
        <p>Количество закладок: {{ favoritesCount }}</p>
        <button @click="showFavoritesWindow = false" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast-image {
  display: inline-block;
}
</style>
