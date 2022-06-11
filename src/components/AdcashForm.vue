<template>
  <el-form
    ref="formRef"
    :rules="formValidation"
    :model="form"
    label-width="auto"
    label-position="top"
    hide-required-asterisk
  >
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="Type" prop="type">
          <el-select
            v-model="form.type"
            placeholder="Select type"
            style="width: 100%"
            @change="onTypeChange"
          >
            <el-option
              v-for="item in store.typesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="Rules" prop="rules">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="You can create your own rules by clicking enter/selecting with the mouse after typing"
            placement="top"
            :disabled="form.type !== 4"
          >
            <el-select
              v-model="form.rules"
              filterable
              clearable
              :allow-create="form.type === 4 ? true : false"
              default-first-option
              multiple
              placeholder="Select rules"
              style="width: 100%; height: 32px"
            >
              <el-option
                v-for="(item, index) in getRulesOfType"
                :key="item.id ? item.id : index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row justify="end">
      <el-button @click="$emit('resetForm', formRef)">Reset</el-button>
      <el-button @click="onSubmitForm">Add rule</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useFormStore } from "../stores/form";
import pinia from "../stores";
import { computed } from "@vue/reactivity";

const emit = defineEmits(["resetForm"]);
const store = useFormStore(pinia());
const formRef = ref();
const form = reactive({
  type: null,
  rules: [],
});

const getRulesOfType = computed(() => {
  if (
    !form.type ||
    !store.categoryList.length ||
    !store.countryList.length ||
    !store.deviceList.length ||
    !store.typesList.length
  )
    return;

  if (form.type === 1) return store.categoryList;
  else if (form.type === 2) return store.countryList;
  else if (form.type === 3) return store.deviceList;
  else return [];
});

const formValidation = reactive({
  type: [
    {
      required: true,
      message: "Please select type",
      trigger: "change",
    },
  ],
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select rule",
      trigger: "change",
    },
  ],
});

const onTypeChange = () => {
  form.rules = [];
};

async function onSubmitForm() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await store.addRules(form);

      emit("resetForm", formRef.value);
    }
  });
}
</script>
