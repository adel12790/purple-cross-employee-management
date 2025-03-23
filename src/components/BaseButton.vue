<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm',
      variants[variant],
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup() {
    const variants = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      success: 'bg-green-500 text-white hover:bg-green-600',
      danger: 'bg-red-500 text-white hover:bg-red-600',
      warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      info: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    }

    return {
      variants
    }
  }
}
</script> 