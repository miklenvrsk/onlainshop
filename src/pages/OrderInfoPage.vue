/* eslint-disable */
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту
            придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{order.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{order.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{order.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{order.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="items in order.basket.items" :key="items.id">
              <h3>{{items.product.title}}</h3>
              <b>{{items.product.price}} ₽</b>
              <span>Артикул: {{items.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{order.basket.items.length}}</b>
              товара на сумму <b>{{order.totalPrice}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { API_BASE_URL } from '@/config';
export default {
  name: 'OrderInfoPage',
  data() {
    return {
      order: this.$store.state.orderInfo,
    }
  },
  created() {


    if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$router.params.id){
      return;
    }
   this.$store.dispatch('loadOrderInfo', this.$router.params.id);

  },

  methods: {
    loadOrderInfo() {
       axios.get(API_BASE_URL +'/api/orders/'+this.$route.params.id, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
          orderId: this.$route.params.id,
        },
      })
        .then(response => {
          this.order = response.data;
          console.log(response);
        });
    },
  },
  beforeMount() {
    this.loadOrderInfo();
  }

};
</script>

<style scoped>

</style>
