/* eslint-disable /
<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="min-price">
          <input class="form__input" type="text" id="min-price" v-model.number="curPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="min-price">
          <input class="form__input" type="text" id="max-price" v-model.number="curPriceTo" >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select" for="category">
          <select class="form__select" type="text" id ="category" v-model.number="curCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categoryes"
                    :key="category.id">{{category.title}}</option>

          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item">
            <label class="colors__label" for="color">
              <input class="colors__radio sr-only" type="radio" id="color" value="5"
                     checked="" v-model="curColor">
              <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color2">
              <input class="colors__radio sr-only" type="radio" id="color2" value="2"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color3">
              <input class="colors__radio sr-only" type="radio" id="color3" value="6"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #939393;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color4">
              <input class="colors__radio sr-only" type="radio" id="color4" value="1"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #9200e0;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color4">
              <input class="colors__radio sr-only" type="radio" id="color4" value="4"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #8be000;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color5">
              <input class="colors__radio sr-only" type="radio" id="color5" value="8"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #e60039;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color6">
              <input class="colors__radio sr-only" type="radio" id="color6" value="9"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #fafafa;">
                </span></label>
          </li>
          <li class="colors__item">
            <label class="colors__label" for="color7">
              <input class="colors__radio sr-only" type="radio" id="color7" value="3"
                     v-model="curColor">
              <span class="colors__value" style="background-color: #000;">
                </span></label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label" for="volume">
              <input class="check-list__check sr-only" type="checkbox" id="volume" value="8"
                     checked="">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="volume2">
              <input class="check-list__check sr-only" type="checkbox" id="volume2"
                     value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="volume3">
              <input class="check-list__check sr-only" type="checkbox" id="volume3"
                     value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="volume4">
              <input class="check-list__check sr-only" type="checkbox" id="volume4"
                     value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="volume5">
              <input class="check-list__check sr-only" type="checkbox" id="volume5"
                     value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label" for="volume6">
              <input class="check-list__check sr-only" type="checkbox" id="volume6"
                     value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="recet">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'ProductFilter',

  props: ['priceFrom', 'priceTo', 'categoryId', 'color'],
  data() {
    return {
      curPriceFrom: 0,
      curPriceTo: 0,
      curCategoryId: 0,
      curColor: '',
      categoriesData: null,
    };
  },
  watch: {
    priceFrom(value) {
      this.curPriceFrom = value;
    },
    priceTo(value) {
      this.curPriceTo = value;
    },
    categoryId(value) {
      this.curCategoryId = value;
    },
    color(value) {
      this.curColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.curPriceFrom);
      this.$emit('update:priceTo', this.curPriceTo);
      this.$emit('update:categoryId', this.curCategoryId);
      this.$emit('update:color', this.curColor);
    },
    recet() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:color', '');
    },
    loadCategories() {
        axios.get(API_BASE_URL +'/api/productCategories')
          .then( responce => this.categoriesData = responce.data );
    },
  },
  created() {
    this.loadCategories();
  },
  computed: {
    categoryes() {
      return this.categoriesData ? this.categoriesData.items : [];
    },

  },

};

</script>

<style scoped>

</style>
