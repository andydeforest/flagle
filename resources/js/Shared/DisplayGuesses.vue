<template>
    <div v-for="(g, x) in this.guesses" :key="x" class="grid mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2 h-10">
        <div class="col-span-2 md:col-span-1">
            <input-display :success="this.hasWon">{{ g.guess }}</input-display>
        </div>
        <div class="col-span-2 md:col-span-1">
            <input-display :success="this.hasWon">{{ `${g.distance.toFixed(0)} nm` }}</input-display>
        </div>
        <div>
            <input-display :success="this.hasWon"><span v-html="getBearingEmoji(g)"></span></input-display>
        </div>
        <div>
            <input-display :success="this.hasWon">{{ `${parseInt(g.percent).toFixed(0)}%` }}</input-display>
        </div>
    </div>
    <div v-if="this.checkingAnswer" key="answer-loading" class="grid items-center mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2 h-10">
        <div class="col-span-2 md:col-span-1">
            <input-display><spinner-component class="py-2" /></input-display>

        </div>
        <div class="col-span-2 md:col-span-1">
            <input-display><spinner-component class="py-2" /></input-display>
        </div>
        <div class="text-center content-center ">
            <input-display><spinner-component class="py-2" /></input-display>
        </div>
        <div class="text-center content-center ">
            <input-display><spinner-component class="py-2" /></input-display>
        </div>
    </div>
    <div v-for="x in remainingLength" :key="x" class="grid mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2 h-10">
        <div class="col-span-2 md:col-span-1 h-full">
            <input-display />
        </div>
        <div class="col-span-2 md:col-span-1 h-full">
            <input-display />
        </div>
        <div class="h-full">
            <input-display />
        </div>
        <div class="h-full">
            <input-display />
        </div>
    </div>
</template>

<script>

import InputDisplay from '@/Shared/InputDisplay'
import SpinnerComponent from '@/Shared/Spinner';

export default {
    name: 'display-guesses',
    components: {
        InputDisplay,
        SpinnerComponent
    },
    props: {
        guesses: {
            type: Array,
            default: []
        },
        hasWon: {
            type: Boolean,
            default: false
        },
        checkingAnswer: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        guessValue() {
            if(this.value === undefined) {
                return '';
            }
            if(this.value.hasOwnProperty('guess')) {
                return `${this.value.guess} (${this.value.distance.toFixed(0)}nm) ${this.getBearingEmoji(this.value.bearing)}`;
            } else {
                return '';
            }
        },
        remainingLength() {
            if(this.checkingAnswer) {
                return 5 - this.guesses.length;
            }
            return 6 - this.guesses.length;
        }
    },
    methods: {
        getBearingEmoji(answer) {
            if(answer.status) {
                return '&#127881';
            }
            if(answer.bearing <= 30) {
                return '&#x02191';
            } else if(answer.bearing > 30 && answer.bearing <= 75) {
                return '&#x02197';
            } else if(answer.bearing > 75 && answer.bearing <= 120) {
                return '&#x02192;';
            } else if(answer.bearing > 120 && answer.bearing <= 165) {
                return '&#x02198';
            } else if(answer.bearing > 165 && answer.bearing <= 210) {
                return '&#x02193';
            } else if(answer.bearing > 210 && answer.bearing <= 255) {
                return '&#x02199';
            } else if(answer.bearing > 255 && answer.bearing <= 300) {
                return '&#x02190';
            } else {
                return '&#x02196';
            }
        }
    }
}
</script>
