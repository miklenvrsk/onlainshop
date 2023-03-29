<template>
  <BaseFormField :error="error" :title="title">
    <label for="comments">
      <input class="form__input" v-model="dataValue" :type="type"  id="comments"
             :placeholder="placeholder">
    </label>

  </BaseFormField>
</template>

<script>
/* eslint-disable */
import FormaFildeMexim from '@/mexims/FormaFildeMexim';

export default {
  props: {
    type: {
      default: 'text',
    }
  },
  mixins: [FormaFildeMexim]
};
</script>

<style scoped>

</style>
