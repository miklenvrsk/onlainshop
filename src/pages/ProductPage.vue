/* eslint-disable */
<template>
  <main class="content container" v-if="productsLoading">
    <img src="img/jif/Spinner.gif" alt="spiner">
  </main>
  <main class="content container" v-else-if="!productData">
    Не удалось загрузить товар
  </main>
  <main class="content container" v-else>

    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url"
                :alt="product.title">
        </div>

      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addToCard">
            <b class="item__price">
              {{product.price | numberFormat}} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label" :for="color.id">
                    <input class="colors__radio sr-only" type="radio" :id="color.id"
                           :value="color.id">
                    <span class="colors__value" :style="{background: color.code}">
                    </span>
                  </label>
                </li>

              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label" for="sizes-item3">
                    <input class="sizes__radio sr-only" type="radio" id="sizes-item3" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label" for="sizes-item">
                    <input class="sizes__radio sr-only" type="radio" id="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label" for="sizes-item2">
                    <input class="sizes__radio sr-only" type="radio" id="sizes-item2"
                           value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click.prevent="countMin">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <label for="count">
                  <input type="text" v-model.number="productAmount">
                </label>

                <button type="button" aria-label="Добавить один товар"
                        @click.prevent="productAmount++">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" :disabled="productAddSend">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSend"><img src="img/jif/Spinner.gif" alt="#"></div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию.
            Данные отображаются на дисплее, а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает
            местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет
            смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает
            габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д.
            (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты
            от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions} from 'vuex';

export default {
  name: 'ProductPage',
  data() {
    return {
      productAmount: 1,
      productData: null,
      productsLoading: false,
      productsLoadingFailed: false,
      productAdded: false,
      productAddSend: false,
    };
  },
  filters: {
    numberForma: numberFormat,
  },
  computed: {
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    gotoPage,
    addToCard() {
      this.productAdded = false;
      this.productAddSend = true;
      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount,
      })
        .then(()=>{
          this.productAdded = true;
          this.productAddSend = false;
        });

    },
    countMin() {
      if ( this.productAmount > 1 ){
        return this.productAmount--;
      }
    },
    loadProduct() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      axios.get(API_BASE_URL +'/api/products/'+this.$route.params.id )
        .then(responce => this.productData = responce.data)
        .catch(() => this.productsLoadingFailed = true)
        .then( () => this.productsLoading = false );
    }
  },
  watch: {
    '$route.params.id': {
      handler(){
        this.loadProduct();
      },
      immediate: true,
    }
  },

};
</script>

<style scoped>

</style>
