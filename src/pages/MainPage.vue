<template>
  <div>
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div style="display: flex">
      <div class="content__catalog">
        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                       :category-id.sync="filterCategoryId" :color.sync="filterColor">

        </ProductFilter>
      </div>
      <section class="catalog">
        <div v-if="productsLoading"><img src="img/jif/Spinner.gif" alt="spiner"></div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузки товара
          <button @click.prevent="loadProducts">Попробывать еще раз</button>
        </div>

        <ProductList :products="produts"></ProductList>
        <BasePagination v-model="page" :count="countProducts" :per-page="produtsPerPage">

        </BasePagination>

      </section>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainPage',
  components: { ProductFilter, ProductList, BasePagination },
  comments: { ProductList },
  data() {
    return {
      page: 1,
      produtsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {

    produts() {
      return this.productsData ?
        this.productsData.items.map(product => {
          return {
            ...product,
            img: product.image.file.url,
          }
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  watch : {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
     this.loadProductsTimer = setTimeout(() => {
       axios.get(API_BASE_URL + '/api/products',{
         params: {
           page: this.page,
           limit: this.produtsPerPage,
           categoryId: this.filterCategoryId,
           minPrice: this.filterPriceFrom,
           maxPrice: this.filterPriceTo,
           colorId: this.filterColor,
         }
       })
         .then( response => this.productsData = response.data )
         .catch(() => this.productsLoadingFailed = true)
         .then(() => this.productsLoading = false);
     },2000);

    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>

</style>
