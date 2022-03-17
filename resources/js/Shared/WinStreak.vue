<template>
    <div class="text-sm md:text-2xl font-mono text-center mb-2 md:mb-5">Current Streak: <div :class="{'animate__animated animate__flipInX' : fireAnimation }" class="relative inline-block">{{ this.$store.state.VictoryCounter.victories }}</div></div>
</template>

<script>

export default {
    name: 'win-streak',
    data() {
        return {
            fireAnimation: false
        }
    },
    watch: {
        '$store.state.VictoryCounter.victories': {
            deep: true,
            handler() {
                this.fireAnimation = true;
                setTimeout(() => {
                    this.fireAnimation = false;
                }, 1000)
            }
        }
    }
}
</script>
