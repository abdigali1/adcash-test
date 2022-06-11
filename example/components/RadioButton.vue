<template>
  <label class="radio-button">
    <input
      class="radio-button__input"
      type="radio"
      :value="value"
      name="radio-button"
      @change="onChange"
    />
    <span class="radio-button__icon" />
    <div class="radio-button__row">
      <span class="radio-button__label">{{ label }}</span>
      <div class="radio-button__col">
        <slot />
      </div>
    </div>
  </label>
</template>
<script lang="ts" setup>
const props = defineProps({
  value: {
    required: true,
    type: [String, Number, Boolean, Array, Object, Date]
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function onChange(): void {
  emit('update:modelValue', props.value)
}
</script>

<style lang="sass" scoped>
.radio-button
  display: flex
  align-items: center
  cursor: pointer
  position: relative
  border-bottom: 1px solid #CDCDCD
  padding-bottom: 10px
  margin-bottom: 20px

  &__wrap
    display: flex
    align-items: center
    cursor: pointer

  &__input[type="radio"]
    display: none

  &__row
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
    margin-left: 10px

  &__col
    display: flex
    align-items: center

  &__label
    font-weight: normal
    font-size: 14px
    line-height: 18px
    color: #000000

  &__icon
    position: relative
    height: 12px
    width: 12px
    background-color: white
    border-radius: 50%
    border: 1px solid #808080
    transition: all .3s ease
    flex-shrink: 0

  &__icon:after
    content: ""
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%) scale(0)
    width: 7px
    height: 7px
    border-radius: 50%
    background: #FFCC33
    transition: transform .2s ease

  &__input

    &:checked ~ .radio-button__icon
      border: 1px solid #FFCC33

    &:checked ~ .radio-button__icon:after
      transform: translate(-50%, -50%) scale(1)
</style>
