<template>
    <div class="grid grid-cols-1">
        <div class="text-3xl text-center font-black py-1" :class="[this.hasWon ? 'text-green-500' : 'text-red-500']">{{ this.answer }}</div>
    </div>
</template>

<script>

export default {
  name: 'display-answer',
  props: {
      hasWon: {
        type: Boolean,
        default: false
      },
      answer: {
        type: String,
        required: true
      }
  },
}
</script>
