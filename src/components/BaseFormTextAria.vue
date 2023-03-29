<template>
  <BaseFormField  :title="title">
    <label for="textarea">
       <textarea class="form__input form__input--area" id="textarea"
                 v-model="dataValue" name="comments"
                 placeholder="Ваши пожелания"></textarea>
    </label>

  </BaseFormField>
</template>

<script>
/* eslint-disable */
import FormaFildeMexim from '@/mexims/FormaFildeMexim';

export default {
  mixins: [FormaFildeMexim],
};
</script>

<style scoped>

</style>
