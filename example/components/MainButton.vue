<template>
  <button
    :class="['main-button', { 'main-button--full-width': fullWidth }]"
    v-bind="{ ...$attrs }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>

.main-button
  position: relative
  overflow: hidden
  display: inline-block
  padding: 12px 40px 11px
  background-color: #FFCC33
  font-size: 14px
  line-height: 16px
  text-align: center
  color: #303030
  border-radius: 4px
  border: none
  outline: none
  margin: 0
  cursor: pointer
  transition: all 0.2s ease
  font-weight: normal

  &:disabled
    background: #EDEDED
    cursor: not-allowed

  &:not(:disabled):hover
    background-color: #F3BA0D

  &--full-width
    width: 100%
</style>
