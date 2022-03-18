<template>
    <div v-if="this.completed" class="grid grid-cols-1 h-16">
        <div class="text-3xl text-center font-black py-1" :class="[this.hasWon ? 'text-green-500' : 'text-red-500']">{{ this.answer }}</div>
    </div>
    <div v-else class="h-16"></div>
</template>

<script>

export default {
  name: 'display-answer',
  props: {
      completed: {
          type: Boolean,
          default: false
      },
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
