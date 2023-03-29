<template>
  <router-link class="header__cart" :to="{name:'card'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{$store.state.cardProducts.length}}
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'CardIndicator.vue',
};
</script>

<style scoped>

</style>
