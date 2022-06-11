<template>
  <div class="main-checkbox">
    <label class="main-checkbox__wrap">
      <input class="main-checkbox__input" type="checkbox" :value="modelValue" @change="onChange" />
      <i class="main-checkbox__icon gg-check" />
      <div class="main-checkbox__label">
        {{ label }}
        <slot></slot>
      </div>
    </label>
    <transition name="slide">
      <ul
        :class="['main-checkbox__error-list', { 'main-checkbox__error-list--ul': errors.length > 1 }]"
        v-if="errors.length > 0"
      >
        <li
          class="main-checkbox__error-item"
          v-for="(error, i) in errors"
          :key="`${error.name}-${i}`"
        >{{ error.message }}</li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}

const {
  modelValue,
  label,
  required
} = toRefs(props)

const errors = ref<Record<string, string>[]>([])
let errorsTimeout: ReturnType<typeof setTimeout>

function validate(): void {
  errors.value = []

  if (required.value && !modelValue.value) {
    errors.value.push({
      name: 'required',
      message: `Поле "${label.value}" обязательно для заполнения`
    })
  }
}

watch(modelValue, validate)

watch(errors, () => {
  if (errors.value.length === 0) return
  clearTimeout(errorsTimeout)
  errorsTimeout = setTimeout(() => { errors.value = [] }, 5000)
})

defineExpose({
  validate
})
</script>

<style lang="sass" scoped>
.slide-enter-active,
.slide-leave-active
  transition: all 0.5s ease

.slide-enter-from,
.slide-leave-to
  opacity: 0
  transform: translateY(50%)
</style>
<style scoped lang="sass">

.main-checkbox
  display: flex
  flex-direction: column

  &__label
    margin-left: 8px
    font-size: 14px
    line-height: 14px

  &__wrap
    display: block
    position: relative
    cursor: pointer
    display: flex
    align-items: center

  &__input
    display: none

  &__icon
    height: 20px
    width: 20px
    background-color: white
    border: 1px solid #808080
    box-sizing: border-box
    border-radius: 2px
    color: transparent
    transition: all 0.2s ease

    &:after
      transition: width 0.4s, height 0.6s

  &__input:checked + &__icon
    background-color: var(--second-color)
    border-color: var(--second-color)
    color: #fff

    &:after
      width: 6px
      height: 10px
      border-radius: 1px

  &__error-list
    list-style: none
    margin: 0
    margin-left: 10px
    padding: 2px 7px 0 0

    &--ul
      list-style: circle outside
      padding-left: 14px

  &__error-item
    color: rgb(255, 71, 87)
    font-size: 11px
</style>
