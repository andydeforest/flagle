<template>
  <BaseSection
    class="about-section"
    no-container
  >
    <h1>
      🚩About Flagle
    </h1>
    <p>
      Flagle is a guessing game which presents the user with a country's flag, and gives them six tries to guess what country it belongs to. If an incorrect guess is given, you will receive the proximity of the correct country based on the incorrectly guessed country. Get the country correct within six tries, and you win! See how long you can keep your streak going!
    </p>
    <p>
      Flagle was inspired by <a
        href="https://www.nytimes.com/games/wordle/index.html"
        target="_blank"
      >Wordle</a> and <a
        href="https://worldle.teuteuf.fr/"
        target="_blank"
      >Worldle</a>. It was developed purely as a hobby project, and is not (nor is it intended to be) perfect. Special thanks to the developers of the following libraries:
    </p>
    <ul>
      <li>Fuse.js</li>
      <li>flagpedia.net</li>
    </ul>
    <p>
      Questions? Comments? Concerns? Reach out to <a
        href="https://github.com/andydeforest"
        target="_blank"
      >@andydeforest</a> on GitHub.
    </p>
  </BaseSection>
</template>

<style lang="scss">
.about-section {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: var(--base-container-padding) var(--base-container-margin);
  padding: var(--base-container-padding);

  a {
    color: var(--flagle-blue);
    text-decoration: underline;
  }

  h1 {
    margin-bottom: 2rem;
  }

  p {
    margin: 0.5rem 0;
  }

  ul {
    margin-left: var(--base-container-padding);
    list-style: disc;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
    background-color: var(--dark-mode-light);

    h1 {
      color: #fff;
    }

    a {
      color: #ccc;
    }
  }
}
</style>
