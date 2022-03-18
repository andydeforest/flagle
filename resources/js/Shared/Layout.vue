<template>
    <div class="min-h-full">
        <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-800">
            <div class="container md:px-5 px-2 mx-auto flex flex-wrap items-center justify-between">
                <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                    <span class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                        <img class="inline mr-1 md:mr-3" src="/images/icon.png" alt="Flagle icon" title="Flagle" />
                    </span>
                    <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
                <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center w-full md:w-auto">
                    <ul class="flex flex-col lg:flex-row list-none ml-auto w-full">
                        <li class="nav-item text-center">
                            <Link href="/" class="px-3 py-2 md:flex text-xs uppercase font-bold leading-snug text-white hover:opacity-75">Game</Link>
                        </li>
                        <li class="nav-item text-center">
                            <Link href="/about" class="px-3 py-2 md:flex text-xs uppercase font-bold leading-snug text-white hover:opacity-75">About</Link>
                        </li>
                        <li class="nav-item text-center">
                            <a href="https://github.com/andydeforest/flagle" class="px-3 py-2 md:flex text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main>
            <div class="max-w-7xl mx-auto md:py-6 sm:p-6 lg:px-8">
                <slot />
            </div>
        </main>
    </div>
</template>

<script>

import { Link } from '@inertiajs/inertia-vue3'
import WinStreak from '@/Shared/WinStreak'

export default {
    components: {
        Link,
        WinStreak
    },
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        toggleNavbar: function(){
            this.showMenu = !this.showMenu;
        }
    }
}
</script>
