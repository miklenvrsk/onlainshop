<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow"
         :class="{'pagination__link--disabled': pageNum === 1}"
      @click.prevent="paginate( prewPage())">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
        .
      </a>
    </li>
    <li class="pagination__item" v-for="pageNamber in pages" :key="pageNamber">
      <a href="#" class="pagination__link"
         :class="{'pagination__link--current': pageNamber === page}"
      @click.prevent="pageNum=paginate(pageNamber)">
        {{pageNamber}}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая стра"
         :class="{'pagination__link--disabled': pageNum === pages}"
         @click.prevent="paginate(nextPage(pages))">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',
  data() {
    return {
      pageNum: 1,
    };
  },
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
      return page;
    },
    nextPage(pages) {
      // eslint-disable-next-line no-plusplus,no-param-reassign
      if (this.pageNum < pages) {
        // eslint-disable-next-line no-plusplus
        this.pageNum++;
      }

      return this.pageNum;
    },
    prewPage() {
      // eslint-disable-next-line no-plusplus,no-param-reassign
      if (this.pageNum > 1) {
        // eslint-disable-next-line no-plusplus
        this.pageNum--;
      }

      return this.pageNum;
    },

  },
};
</script>

<style scoped>

</style>
