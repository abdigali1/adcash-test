<template>
  <div class="adcash">
    <h1 class="adcash__title">Ad targeting</h1>

    <adcash-form-vue class="adcash__block" @reset-form="resetForm" />
    <adcash-table-vue class="adcash__block" @save-changes="saveChanges" />
  </div>
</template>

<script setup>
import AdcashFormVue from "./components/AdcashForm.vue";
import AdcashTableVue from "./components/AdcashTable.vue";
import { useFormStore } from "./stores/form";
import { onBeforeMount } from "vue";
import pinia from "./stores";

const store = useFormStore(pinia());

onBeforeMount(async () => {
  await store.fetchRules();
  await store.fetchTypes();
  store.fetchCategories();
  store.fetchCountries();
  store.fetchDevices();
});

function saveChanges(rules) {
  console.log(JSON.parse(JSON.stringify(rules)));
}
function resetForm(ref) {
  ref.resetFields();
}
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";

.adcash {
  max-width: 1080px;
  margin: 0 auto;
  padding: 1rem;
  &__title {
    margin-bottom: var(--default-margin);
  }
  &__block {
    border: 1px solid var(--color-background);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--block-padding);

    margin-bottom: var(--default-margin);
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
