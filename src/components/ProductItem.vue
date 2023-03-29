<template>
  <div>
    <router-link class="catalog__pic" href="#"
      :to="{name: 'product', params:{id: product.id}}" >
      <img :src="product.img"  :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
              {{product.price | numberFormat}} Р
            </span>

    <ul class="colors colors--black">

      <li class="colors__item" v-for="color in colors" :key="color.id">
          <label :for="color.id">
            <input class="colors__radio sr-only" type="radio" :id="color.id"  :value="color.code">
          </label>

          <span class="colors__value" :style="{background: color.code}">
                  </span>
      </li>
    </ul>
  </div>

</template>

<script>
/* eslint-disable */
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',

  filters: {
    numberFormat,
  },
  props: ['product'],
  methods: {
    gotoPage,
  },
  data() {
    return {
    colors: this.product.colors

    };
  },
};
</script>

<style scoped>

</style>
