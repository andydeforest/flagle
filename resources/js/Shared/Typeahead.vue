<template>
    <div class="mt-10">
        <div class="relative">
            <div v-if="results.length > 0 && showSelections" key="result-container" ref="container" id="scrollcontainer" class="absolute bottom-10 overflow-y-auto max-h-72 w-full mx-auto bg-gray-200 shadow-lg border-x border-t border-solid border-gray-700">
                <div v-for="(result, x) in results" :key="x" :class="{'bg-gray-400 selected-scroll': x === selectedIndex}" class="flex items-center gap-4 p-4 cursor-pointer" @mouseover="selectedIndex = x" @click="select(result.item)">
                    <div class="flex flex-col">
                        <strong class="text-gray-800 text-lg font-medium">{{ result.item }}</strong>
                    </div>
                </div>
            </div>
            <input type="text" id="focusinput" ref="focusinput" :disabled="this.checkingAnswer || this.completed" autofocus autocomplete="false" :placeholder="placeholder" v-model="input" @input="search" class="relative form-control block h-10 w-full px-3 mb-5 py-1.5 text-xs md:text-lg font-bold md:font-extrabold bg-clip-padding border border-solid border-gray-700 rounded transition ease-in-out m-0 bg-gray-50 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
        </div>
    </div>
</template>

<script>

import Fuse from 'fuse.js'

export default {
    emits: ['handleGuess'],
    name: 'typeahead-component',
    props: {
        list: {
            type: Array,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        checkingAnswer: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            fuseOpts: {threshold: 0.2, minMatchCharLength: 2, ignoreLocation: true},
            fuse: null,
            input: '',
            showSelections: false,
            selectedIndex: 0,
            results: [],
        }
    },
    computed: {
        placeholder() {
            if(this.checkingAnswer) {
                return 'Checking answer...';
            } else if(this.completed) {
                return `Click 'Restart Game' or press the space bar to play again`;
            } else {
                return 'Type a country name here...';
            }
        }
    },
    watch: {
        list(newList) {
            this.fuse = new Fuse(newList, this.fuseOpts);
        },
        completed(newStatus, oldStatus) {
            this.input = '';
            if(oldStatus && !newStatus) {
                // just switched from completed to incompleted, indicating a new game, so refocus
                // a little hack-ish, but we need to wait for the input to be re-enabled
                setTimeout(() => {
                    this.focusinput();
                }, 100)
            } else {
                // just switched from incomplete to complete, indicating the game has finished, clear selection
                this.results = [];
                this.selectedIndex = 0;
            }
        }
    },
    beforeMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    },
    unmounted() {
        document.removeEventListener('keydown', this.handleKeyDown)
    },
    methods: {
        focusinput() {
            setTimeout(() => {
                // Await some UI events before we attempt to focus the input
                this.$refs.focusinput.focus();
            }, 200);
        },
        handleSearchScroll(px) {
            const container = this.$refs.container;
            if(container !== undefined && container !== null) {
                container.scrollTop += px;
            }
        },
        handleKeyDown(e) {
            let y = 0;
            const highlighted = document.querySelector('.selected-scroll');
            if(highlighted !== null) {
                y = highlighted.offsetHeight / 2;
            }
            if(e.key === 'ArrowDown') {
                e.preventDefault();
                if(this.selectedIndex + 1 <= this.results.length - 1) {
                    this.selectedIndex++;
                    this.handleSearchScroll(y)
                }
            } else if(e.key === 'ArrowUp') {
                e.preventDefault();
                if(this.selectedIndex - 1 >= 0) {
                    this.selectedIndex--;
                    this.handleSearchScroll(y - y * 2)
                }
            } else if((e.key === 'Enter' || e.key === 'Tab')) {
                e.preventDefault();
                // We only want to use the enter and tab keys to select if it is a valid selection, and the selections are being shown
                if(this.results[this.selectedIndex] !== undefined && this.showSelections) {
                    this.select(this.results[this.selectedIndex].item);
                }
            }
        },
        search(e) {
            this.showSelections = true;
            this.results = this.fuse.search(e.target.value);
            this.selectedIndex = 0;
            // scroll to bottom
        },
        select(selection) {
            this.showSelections = false;
            this.input = '';
            this.$emit('handleGuess', selection);
            this.focusinput();
        }
    }
}
</script>
