<template>
    <div class="flex text-center text-sm md:text-lg text-white font-bold truncate w-full align-middle p-1 md:p-2 border border-solid border-gray-900 rounded h-full" :class="[this.success ? 'bg-green-500' : 'bg-gray-500']">
        <div class="m-auto "><slot /></div>
    </div>
</template>

<script>

export default {
    name: 'input-display',
    props: {
        success: {
            type: Boolean,
            default: false
        }
    }
}
</script>
