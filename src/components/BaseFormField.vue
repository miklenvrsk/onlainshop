<template>
  <div>
    <slot></slot>
    <span class="form__value">{{title}}</span>
    <span class="form__error" v-if="error">{{error}}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'BaseFormField',
  props: ['title','error',]
};
</script>

<style scoped>

</style>
