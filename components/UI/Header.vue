<template>
  <header class="ui-header">
    <div class="ui-header__logo">
      <NuxtLink to="/">
        <img src="/images/icon.png" alt="Flagle logo">
      </NuxtLink>
    </div>
    <div class="ui-header__nav">
      <ul>
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss">
.ui-header {
  background-color: var(--flagle-blue);
  display: flex;
  flex-direction: row;
  padding: 0 var(--base-container-margin);
  height: var(--base-header-height);
  align-items: center;

  &__logo {
    img {
      max-height: calc(var(--base-header-height) * 0.75);
    }
  }

  &__nav {
    display: none;
    font-size: 2rem;
    font-family: var(--heading-font-family);
    flex-grow: 1;

    @include breakpoint(medium) {
      display: flex;
      justify-content: flex-end;
    }

    ul {
      padding: 0;
      display: flex;
      gap: var(--base-gap);

      li {
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
