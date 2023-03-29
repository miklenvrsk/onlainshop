/* eslint-disable */
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'card'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{products.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name"
                          :title="'ФИО'" :placeholder="'Введите ваше полное имя'"></BaseFormText>
            <BaseFormText  v-model="formData.address" :error="formError.address"
                           :title="'Адрес доставки'"
                           :placeholder="'Введите ваш адрес'"></BaseFormText>
            <BaseFormText  v-model="formData.phone" :error="formError.phone"
                           :title="'Телефон'" :placeholder="'Введите ваш телефон'"></BaseFormText>
            <BaseFormText v-model="formData.email" :error="formError.email"
                          :title="'Email'" :placeholder="'Введи ваш Email'"></BaseFormText>
            <BaseFormTextAria :error="formError.name" :title="'Комментарий к заказу'"
                              v-model="formData.comment"
                              :placeholder="'Ваши пожелания'"></BaseFormTextAria>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="delivery3">
                  <input class="options__radio sr-only" type="radio"
                         name="delivery3" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="delivery">
                  <input class="options__radio sr-only" type="radio" id="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label" for="pay2">
                  <input class="options__radio sr-only" type="radio" id="pay2" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label" for="pay">
                  <input class="options__radio sr-only" type="radio" id="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.id">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price}} ₽</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{totalPrice}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-show="orderPost"><img src="img/jif/Spinner.gif" alt="spinner"></div>
        <div class="cart__error form__error-block" v-if="orderPostFailed">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import BaseFormField from '@/components/BaseFormField';
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextAria from '@/components/BaseFormTextAria';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
export default {
  name: 'OrderPage',
  components: { BaseFormTextAria, BaseFormText, BaseFormField },
  data() {
    return {
      formData:{},
      formError:{},
      formErrorMessage: '',
      orderPost: false,
      orderPostFailed: false,

    }
  },
  computed:{
    ...mapGetters({products: 'cartDetailProducts',totalPrice: 'cartTotalPrice'})
  },
  methods: {
    order(){
      this.orderPost = true;
      this.orderPostFailed = false;
      this.formError = {};
      this.formErrorMessage = '';

         axios.post(API_BASE_URL+'/api/orders', {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            }
          })
          .then(response => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({name: 'orderInfo', params: {id: response.data.id}});

          })
          .catch(error => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message;
            this.orderPostFailed = true;
          })
          .then(() => this.orderPost = false);
      },


    },







};
</script>

<style scoped>

</style>
