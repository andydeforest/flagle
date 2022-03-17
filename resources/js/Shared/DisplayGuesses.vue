<template>
    <div v-for="(g, x) in this.guesses" :key="x" class="grid mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2">
        <div class="col-span-2 md:col-span-1">
            <input-display :value="g.guess" :success="this.hasWon" />
        </div>
        <div class="col-span-2 md:col-span-1">
            <input-display :value="`${g.distance.toFixed(0)} nm`" :success="this.hasWon" />
        </div>
        <div>
            <input-display :value="`${getBearingEmoji(g)}`" :success="this.hasWon" />
        </div>
        <div>
            <input-display :value="`${parseInt(g.percent).toFixed(0)}%`" :success="this.hasWon" />
        </div>
    </div>
    <div v-if="this.checkingAnswer" key="answer-loading" class="grid items-center mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2">
        <div class="col-span-2 md:col-span-1 text-center content-center bg-gray-500 border border-solid border-gray-900 rounded">
            <spinner-component :height="42" class="py-2" />
        </div>
        <div class="col-span-2 md:col-span-1 text-center content-center bg-gray-500 border border-solid border-gray-900 rounded">
            <spinner-component :height="42" class="py-2" />
        </div>
        <div class="text-center content-center bg-gray-500 border border-solid border-gray-900 rounded">
            <spinner-component :height="42" class="py-2" />
        </div>
        <div class="text-center content-center bg-gray-500 border border-solid border-gray-900 rounded">
            <spinner-component :height="42" class="py-2" />
        </div>
    </div>
    <div v-for="x in remainingLength" :key="x" class="grid mt-3 xl:mt-5 grid-cols-6 md:grid-cols-4 gap-2">
        <div class="col-span-2 md:col-span-1">
            <input-display value="" />
        </div>
        <div class="col-span-2 md:col-span-1">
            <input-display value="" />
        </div>
        <div>
            <input-display value="" />
        </div>
        <div>
            <input-display value="" />
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
        },
        spinnerHeight() {
            if(document.querySelector('.answer-input') !== null) {
                return document.querySelector('.answer-input').offsetHeight;
            }
            return 0;
        }
    },
    methods: {
        getBearingEmoji(answer) {
            if(answer.status) {
                return '🎉';
            }
            if(answer.bearing <= 30) {
                return '⬆';
            } else if(answer.bearing > 30 && answer.bearing <= 75) {
                return '↗';
            } else if(answer.bearing > 75 && answer.bearing <= 120) {
                return '➡';
            } else if(answer.bearing > 120 && answer.bearing <= 165) {
                return '↘';
            } else if(answer.bearing > 165 && answer.bearing <= 210) {
                return '⬇';
            } else if(answer.bearing > 210 && answer.bearing <= 255) {
                return '↙';
            } else if(answer.bearing > 255 && answer.bearing <= 300) {
                return '⬅';
            } else {
                return '↖';
            }
        }
    }
}
</script>
