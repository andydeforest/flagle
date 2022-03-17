<template>
    <div class="mt-2 md:mt-0">
        <win-streak />
        <div class="relative">
            <flag-component :loading="loading" :img-src="imgSrc" />
            <display-answer v-if="completed" key="answer-result" :has-won="this.won" :answer="finalAnswer"  />
        </div>
        <div class="mx-5 md:mx-0">
            <button class="bg-gray-700 text-white w-full my-2 md:my-5 py-3 mx-auto rounded-md text-1xl font-medium hover:bg-gray-500 transition duration-300" @click="resetGame">Restart Game</button>
            <display-guesses :checking-answer="checkingAnswer" :guesses="guesses" :has-won="won" />
            <typeahead-component :checking-answer="checkingAnswer" :completed="completed" :list="countries" @handleGuess="handleGuess" />
        </div>
    </div>
</template>

<script>

import Layout from '@/Shared/Layout'
import FlagComponent from '@/Shared/Flag'
import TypeaheadComponent from '@/Shared/Typeahead'
import DisplayGuesses from '@/Shared/DisplayGuesses'
import DisplayAnswer from '@/Shared/DisplayAnswer'
import WinStreak from '@/Shared/WinStreak'
import axios from 'axios'

export default {
    layout: Layout,
    name: 'game-page',
    components: {
        FlagComponent,
        TypeaheadComponent,
        DisplayGuesses,
        DisplayAnswer,
        WinStreak
    },
    data() {
        return {
            loading: true,
            checkingAnswer: false,
            finalAnswer: '',
            completed: false,
            won: false,
            answer: null,
            imgSrc: '',
            countries: [],
            guesses: [],
        }
    },
    beforeMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    },
    mounted() {
        this.generateCountry();
        // on window refresh, this will reset victory counter if the user did not just win
        window.addEventListener('beforeunload', this.resetGame);
    },
    unmounted() {
        document.removeEventListener('keydown', this.handleKeyDown)
    },
    methods: {
        handleKeyDown(e) {
            if(e.code === 'Space' && this.completed) {
                this.resetGame();
            }
        },
        generateCountry() {
            // grab our recents to send to the server
            axios.post('/api/country', {avoid: this.$store.state.RecentCountries.countries}).then(response => {
                this.imgSrc = response.data.flag_url;
                this.answer = response.data.country_id;
                this.countries = response.data.country_list;
                this.loading = false;
                // we have filtered all countries, reset the filter
                if(response.data.reset_flag) {
                    this.$store.dispatch('resetCountries');
                }
                // if recentCountries was not found, create the array, otherwise push the new record
                this.$store.dispatch('addCountry', response.data.country_id);
            });
        },
        outcome(status, country) {
            this.completed = true;
            // scroll to top
            window.scrollTo(0,0);
            if(country !== null) {
                this.finalAnswer = country.name;
            }
            if(status) {
                this.won = true;
                this.$store.dispatch('incrementVictories');
            } else {
                // user lost
                this.$store.dispatch('resetVictories');
            }
        },
        resetGame() {
            // reset our streak counter if the user was not victorious or made an attempt at a new game, but did not finish
            if(!this.won && this.guesses.length > 0) {
                this.$store.dispatch('resetVictories');
            }
            this.guesses = [];
            this.won = false;
            this.lost = false;
            this.completed = false;
            this.finalAnswer = '';
            this.generateCountry();
        },
        handleGuess(guess) {
            this.checkingAnswer = true;
            axios.post('/api/guess', {guess, answer: this.answer, attempt: this.guesses.length + 1}).then(response => {
                this.guesses.push(response.data);
                this.checkingAnswer = false;
                if(response.data.status) {
                    this.outcome(true, response.data.country);
                } else if(this.guesses.length === 6) {
                    this.outcome(false, response.data.country);
                }
            });
        }
    }
}
</script>
