<template>
  <div>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
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
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"></CartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPrice|numberFormat}}</span>
          </p>

          <router-link v-if="totalPrice" tag="button" :to="{name: 'order'}"
                       class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </div>

</template>

<script>
/* eslint-disable */
import numberFormat from '@/helpers/numberFormat';
import {mapGetters} from 'vuex';
import CartItem from '@/components/CartItem.vue';
export default {
  name: 'CardPage',
  components:{CartItem},
  filters:{numberFormat},
  computed: {
    ...mapGetters({products: 'cartDetailProducts',totalPrice: 'cartTotalPrice'}),

  }
};
</script>

<style scoped>

</style>
