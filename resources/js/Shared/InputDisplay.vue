<template>
    <input type="text" class="form-control answer-input block w-full px-3 py-1.5 m-0 text-xs md:text-lg text-center text-white font-bold bg-clip-padding border border-solid border-gray-900 rounded" :class="[this.success ? 'bg-green-500' : 'bg-gray-500']" :value="this.value" disabled />
</template>

<script>

export default {
    name: 'input-display',
    props: {
        value: {
            type: String,
            default: ''
        },
        success: {
            type: Boolean,
            default: false
        }
    }
}
</script>
