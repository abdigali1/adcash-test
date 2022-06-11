<template>
  <div class="input-field">
    <div class="input-field__wrapper">
      <input
        :class="['input-field__input', { 'input-field__input--appended': $slots.append || type === 'password' }]"
        :type="inputType"
        :id="inputId"
        :value="modelValue"
        @input="onInput"
        :disabled="readonly || disabled"
        placeholder=" "
      />
      <label v-if="placeholder" :for="inputId" class="input-field__label">{{ placeholder }}</label>
      <div v-if="$slots.append || type === 'password'" class="input-field__after-content">
        <div
          v-if="type === 'password'"
          @click="togglePassword = !togglePassword"
          class="input-field__password-toggle"
        >
          <img v-if="togglePassword" src="@/assets/images/hide-password.svg" alt="Скрыть пароль" />
          <img v-else src="@/assets/images/show-password.svg" alt="Показать пароль" />
        </div>
        <slot v-else name="append" />
      </div>
      <div class="input-field__border"></div>
    </div>
    <ul
      :class="['input-field__error-list', { 'input-field__error-list--ul': errors.length > 1 }]"
      v-if="errors.length > 0"
    >
      <li
        class="input-field__error-item"
        v-for="(error, i) in errors"
        :key="`${error.name}-${i}`"
      >{{ error.message }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, toRefs, watch, computed } from 'vue'
import uuidv4 from '@/utils/uuidv4'
import { validators } from '@/utils/validators'

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  mask: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  valid: {
    type: String,
    validator: (value: string) => ['digits', 'phone', 'minLength', 'email', 'name', 'any'].includes(value),
    default: 'any'
  },
  required: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'update:has-errors'])

const togglePassword = ref(false)

const {
  modelValue,
  placeholder,
  valid,
  required,
  readonly,
  disabled,
  type
} = toRefs(props)

const inputType = computed(() => {
  return type.value !== 'password' ? type.value : togglePassword.value ? 'text' : 'password'
})

const inputId = ref('')

onMounted(() => {
  inputId.value = uuidv4()
})

const errors = ref<Record<string, string>[]>([])
let errorsTimeout: ReturnType<typeof setTimeout>

function validate(): boolean {
  errors.value = []

  if (required.value && !modelValue.value) {
    errors.value.push({
      name: 'required',
      message: `Поле "${placeholder.value}" обязательно для заполнения`
    })
  }

  const { validator, message } = validators[valid.value]
  if (modelValue.value && !validator(modelValue.value)) errors.value.push({ name: valid.value, message })

  clearTimeout(errorsTimeout)
  errorsTimeout = setTimeout(() => { errors.value = [] }, 5000)

  if (errors.value.length === 0) return false
  return true
}

function onInputValidation(): void {
  errors.value = []

  const { validator, message } = validators[valid.value]
  if (!validator(modelValue.value)) errors.value.push({ name: valid.value, message })
}

defineExpose({
  validate
})

watch(modelValue, onInputValidation)

function onInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<style lang="sass" scoped>
.input-field
  &__wrapper
    background-color: #D8D8D8
    border-radius: 4px
    padding: 1px
    display: flex
    align-items: stretch

  &__input
    flex-grow: 1
    border: none
    box-sizing: border-box
    border-radius: 4px
    font-size: 14px
    line-height: 16px
    color: #808080
    outline: none
    padding: 12px 16px 11px
    background: white
    z-index: 2

    &--appended
      border-radius: 4px 0 0 4px

  .input-field__input:focus ~ .input-field__label,
  .input-field__input:not(:placeholder-shown).input-field__input:not(:focus)~.input-field__label
    top: -5px
    font-size: 10px
    line-height: 12px

  &__label
    position: absolute
    top: 13px
    padding: 0 3px
    left: 14px
    font-size: 14px
    line-height: 16px
    color: #808080
    cursor: text
    transition: all 200ms ease-in
    background-color: white
    z-index: 3

  &__after-content
    display: flex
    align-items: center
    background-color: white
    border-radius: 0 4px 4px 0
    padding: 0 16px 0 0

  &__border
    position: absolute
    content: ""
    top: 0
    left: 0
    width: 0
    height: 0
    background: #FFCC33
    z-index: -1
    border-radius: 4px
    transition: height .3s,width .3s .1s

  &__password-toggle
    display: flex
    align-items: center
    justify-content: center

  .input-field__input:focus ~ .input-field__border
    width: calc(100% + 2px)
    height: calc(100% + 2px)
    top: -1px
    left: -1px
    transition: height .3s,width .3s .1s

  &__error-list
    list-style: none
    margin: 0
    margin-left: 10px
    padding: 5px 7px 0 0

    &--ul
      list-style: circle outside
      padding-left: 14px

  &__error-item
    color: rgb(255, 71, 87)
    font-size: 11px
</style>
