<template>
    <div class="grid grid-cols-1 mt-0 md:mt-10 p-5 bg-gray-100">
      <div class="flex py-0 md:py-10">
          <div>
            <h1 class="text-3xl uppercase">About 🚩Flagle</h1>
            <p class="py-5">Flagle is a guessing game which presents the user with a country's flag, and gives them six tries to guess what country it belongs to. If an incorrect guess is given, you will receive the proximity of the correct country based on the incorrectly guessed country. Get the country correct within six tries, and you win! See how long you can keep your streak going!</p>
            <p class="py-3">Flagle was inspired by <a href="https://www.nytimes.com/games/wordle/index.html" class="text-blue-600" target="_blank">Wordle</a> and <a href="https://worldle.teuteuf.fr/" class="text-blue-600">Wor<strong>l</strong>dle</a>. It was developed to help me learn Vue.js, Inertia.js, and Tailwindcss better, and is not (nor is it intended to be) perfect. Special thanks to the developers of the following libraries:</p>
            <ul class="ml-5 list-disc">
                <li>Fuse.js</li>
                <li>vuex-persist</li>
                <li>flagpedia.net</li>
            </ul>
            <p class="py-3">Questions? Comments? Concerns? Reach out to <a href="https://github.com/andydeforest" class="text-blue-600" target="_blank">@andydeforest</a> on GitHub.</p>
          </div>
      </div>
    </div>
</template>

<script>

import Layout from '@/Shared/Layout'

export default {
    name: 'about-page',
    layout: Layout
}
</script>
