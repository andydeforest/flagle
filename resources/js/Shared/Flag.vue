<template>
    <img v-show="!this.loading && this.ready" @load="this.ready = true" :src="this.imgSrc" alt="Country flag" :class="{'animate__animated animate__slideInLeft animate__faster': this.animating }" class="flag mx-auto object-cover sm:mx-26 mb-5 " />
    <div v-if="this.loading || !this.ready" key="flag-skeleton" class="skeleton mb-5 mx-auto align-middle"></div>
</template>

<style scoped>
    .flag {
        max-height: 30vh;
        max-width: 90vw;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .skeleton {
        height: 30vh;
        width: 60%;
    }
</style>


<script>

export default {
    name: 'flag-component',
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        imgSrc: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            ready: false,
            animating: true
        }
    },
    watch: {
        loading() {
            this.ready = false;
        },
        imgSrc() {
            this.animating = true;
            setTimeout(() => {
                this.animating = false;
            }, 1000);
        }
    }
}
</script>
