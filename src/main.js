import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router' // Импортируем createRouter и createWebHashHistory
// import routes from './router' // Импортируем маршруты
import HomePage from './pages/HomePage.vue'
import FavoritesVue from './pages/FavoritesVue.vue' // Импортируем компонент для страницы избранного
import PayByCard from './components/PayByCard.vue'


const app = createApp(App)
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true, // Запрет закрытия по клику
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  closeButton: "button",
  maxToasts: 5, // Максимум тостов одновременно
  transition: 'Vue-Toastification__bounce', // Анимация
  dangerouslyUseHTMLString: true, // Позволяет использовать HTML в сообщениях
  icon: true, // Показывать иконки
});
app.use(autoAnimatePlugin);
// app.config.globalProperties.$toast = Toast; // нужно если используешь Options API Vue 2
// После этого ты можешь использовать $toast в компонентах Vue
// Например: this.$toast.success('Успех!');


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/favorites', name: 'Favorites', component: FavoritesVue },
    { path: '/pay', name: 'PayByCard', component: PayByCard },
  ],
});
app.use(router); // Используем маршрутизатор в приложении Vue

console.log(`Toast ${Toast} initialized`);
app.mount('#app');

