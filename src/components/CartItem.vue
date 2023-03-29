/* eslint-disable */
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.img" width="120" height="120"
           :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
                {{item.product.id}}
              </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="countMin">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <label for="count">
        <input type="text" v-model.number="amount" id="count">
      </label>
      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    <b class="product__price">
      {{amount*item.product.price|numberFormat}} ₽
    </b>
    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
/* eslint-disable */
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
export default {
  name: 'CartItem',
  filters:{numberFormat},
  props: ['item'],
  computed: {
    amount: {
      get(){
        return this.item.amount
      },
      set(value){
        this.$store.dispatch('updateCartProductAmount', {productId:this.item.productId,
        amount: value});
      },
    },
    price: {
      get(){
        return this.item.product.price
      },
      set(value){
        this.$store.dispatch('updateCartProductAmount', {productId:this.item.productId,
          amount: value});
      },

    }
  },
  methods: {
    ...mapActions({deleteProduct: 'deleteCardProduct'}),
    countMin(){
      if(this.amount>1){
        return this.amount--;
      }
    },


  },
};
</script>

<style scoped>

</style>
