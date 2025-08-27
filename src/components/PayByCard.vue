<template>
  <div>
    <div class="flex justify-center items-center">
        <div class="space-y-16">
            <div class="w-[400px] h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl">
            
                <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png">
                
                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light">
                                Name
                            </p>
                            <!-- <p class="font-bold tracking-widest font-mono">
                                Ramiro Pastrano
                            </p> -->
                            <input
                                :value="cardHolder"
                                type="text"
                                @input="updateCardHolder"
                                class="font-bold tracking-widest font-mono bg-transparent border-none outline-none focus:ring-2 focus:ring-white focus:rounded w-full text-white"
                                placeholder="Имя на карте"
                            />
                        </div>
                        <img class="w-14" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1000px-Mastercard-logo.svg.png"/>
                    </div>
                    <div class="pt-1">
                        <p class="font-light">
                            Num.
                        </p>
                        <!-- <p class="font-medium tracking-more-wider font-mono">
                            <strong>4642</strong>  3489  9867  <span class="bg-blue-700  rounded-full px-2 py-1 text-xs absolute">●●●●</span>
                        </p> -->
                        <input
                            type="text"
                            v-model="cardNumber"
                            @input="formatCardNumber"
                            class="font-medium tracking-more-wider font-mono bg-transparent border-none outline-none focus:ring-2 focus:ring-white focus:rounded w-full text-white placeholder-white"
                            placeholder="0000 0000 0000 0000"
                            maxlength="19"
                        />
                        
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <!-- Срок действия: MM/YY -->
                            <div class="w-1/2 pr-2">
                                <p class="font-light text-xs text-xs">
                                    Expires At
                                </p>
                                <!-- <p class="font-medium tracking-wider text-sm font-mono">
                                    03/25
                                </p> -->
                                <input
                                    :value="expiry"
                                    @input="formatExpiry"
                                    type="text"
                                    class="font-medium tracking-wider font-mono bg-transparent border-none outline-none focus:ring-2 focus:ring-white focus:rounded w-full text-white placeholder-white"
                                    placeholder="MM/YY"
                                    maxlength="5"
                                />
                            </div>
    
                            <div class="">
                                <p class="font-light text-xs">
                                    CVC
                                </p>
                                <!-- <p class="font-bold tracking-more-wider text-sm font-mono">
                                    123
                                </p> -->
                                <input
                                    v-model="cvcRaw"
                                    @input="formatCvc"
                                    type="password"
                                    inputmode="numeric"
                                    class="font-bold tracking-more-wider font-mono bg-transparent border-none outline-none focus:ring-2 focus:ring-white focus:rounded w-full text-white placeholder-white text-right"
                                    placeholder="●●●"
                                    maxlength="3"
                                />
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>


    <button type="submit" @click="handlePay" :disabled="isProcessing.value || !isFormValid" class="bg-green-500 text-white px-4 py-2 rounded-xl !disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:bg-green-600 cursor-pointer">{{ isProcessing ? 'Оплачиваем...' : 'Оплатить' }}</button>

  </div>
</template>

<script setup>
import { inject, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';// Importing toast for notifications Импорт хука для тостов  

const router = useRouter();
const toast = useToast(); // Инициализация тостов

// Получаем функцию placeOrder из контекста
const placeOrder = inject('placeOrder');
const isProcessing = ref(false);

const cardNumber = ref(''); // Хранит отформатированный номер карты
const cardHolder = ref(''); // Хранит имя владельца карты
const expiry = ref(''); // Хранит срок действия карты
const cvc = ref(''); // Хранит CVC-код карты

// Будем хранить "сырые" значения (cardNumberRaw, expiryRaw, cvcRaw), потому что cardNumber.value — это строка с ●●●●, а нам нужно проверять настоящие цифры.
const cardNumberRaw = ref(''); // Настоящие цифры без маски
const expiryRaw = ref(''); // Хранит только цифры для проверки. Настоящие цифры срока действия
const cvcRaw = ref(''); // Настоящие цифры CVC

// Имя держателя (просто копируем)
const updateCardHolder = (event) => {
    cardHolder.value = event.target.value.toUpperCase();
};

// Форматирование номера карты: разделяем по 4 цифры, маскируем последние 4
const formatCardNumber = (event) => {

    // Только цифры
    const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
    cardNumberRaw.value = digits; // Сохраняем "сырые" цифры для проверки

    // Добавляем пробелы каждые 4 цифры
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();

    // Маскируем последние 4 цифры, если введено 16 цифр
    cardNumber.value = digits.length === 16
        ? formatted.slice(0, -4) + '●●●●'
        : formatted;
};

// Срок действия карты: MM/YY
const formatExpiry = (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    expiryRaw.value = digits; // Сохраняем "сырые" цифры для проверки

    let formatted = digits;

    // Добавляем разделитель /
    if (digits.length > 2) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2);
    }
    expiry.value = formatted;
};

// CVC: маскируем как ●●●, но храним цифры
const formatCvc = (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 3);
    cvcRaw.value = digits; // v-model уже обновит это, но на всякий случай
    cvc.value = digits.replace(/./g, '●'); // маска для отображения
};
const totalPrice = inject('totalPrice');
const isFormValid = computed(() => {
    //Проверяем, что корзина не пустая
    const hasItems = totalPrice.value > 0;

    // Проверка имени 
    if (!cardHolder.value || cardHolder.value.trim().length < 2) {
        return false;
    };
    // Проверка номера карты
    if (cardNumberRaw.value.length !== 16) {
        return false;
    };
    // Проверка срока действия карты
    if (expiryRaw.value.length !== 4) {
        return false;
    };
    const month = Number(expiryRaw.value.slice(0, 2));
    const year = Number(expiryRaw.value.slice(2));
    if (month < 1 || month > 12) {
        return false;
    };
    if (year < 0) {
        return false;
    }
    // Проверка CVC
    if (cvcRaw.value.length !== 3) {
        return false;
    };

    // return hasItems && cardNumberRaw.value.length === 16 && expiryRaw.value.length === 4 && cvcRaw.value.length === 3;
    return hasItems;
});
const handlePay = async () => {
    if (isProcessing.value) return; // Предотвращаем повторные клики
    // isProcessing.value = true;

    // Проверяем форму перед отправкой
    if (!isFormValid.value) {
        // isProcessing.value = false;
        // Можно показать тост или подсветить поля
        toast.error('Пожалуйста, заполните все поля корректно.');
        return;
    };

    isProcessing.value = true;

    try {
        await placeOrder(); // Выполняем весь заказ
        // После успешной оплаты — можно перейти на главную или показать успех
        router.push('/'); // Перенаправляем на главную страницу
        // alert('Оплата прошла успешно!');
    } catch (error) {
        // Ошибка уже обработана в placeOrder через toast.error
        console.error('Ошибка при оплате:', error);
        // Можно показать сообщение об ошибке пользователю
        // alert('Ошибка при оплате. Пожалуйста, попробуйте еще раз.');
    } finally {
        isProcessing.value = false;
    }
}
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