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
        <li>
          <NuxtLink to="/about">
            About
          </NuxtLink>
        </li>
        <li>
          <a href="https://github.com/andydeforest/flagle" target="_blank">
            <BaseIcon icon="fab fa-github" />
          </a>
        </li>
        <li>
          <UIUnitToggle />
        </li>
      </ul>
    </div>
    <div class="ui-header__mobile">
      <button @click="menuOpen = !menuOpen">
        <BaseIcon :icon="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" />
      </button>
    </div>
    <transition name="menu-slide">
      <UIMobileMenu v-if="menuOpen" @hide-menu="hideMenu" />
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  watch: {
    menuOpen(isOpen) {
      const bodyClass = 'menu-open';
      if (isOpen) {
        document.body.classList.add(bodyClass);
      } else {
        document.body.classList.remove(bodyClass);
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.hideMenu);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.hideMenu);
  },
  methods: {
    hideMenu() {
      this.menuOpen = false;
    }
  }
};
</script>

<style lang="scss">
body.menu-open {
  overflow: hidden;
}

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

  &__mobile {
    display: flex;
    color: #fff;
    flex-grow: 1;
    justify-content: flex-end;
    font-size: 3rem;

    @include breakpoint(medium) {
      display: none;
    }
  }
}
</style>
