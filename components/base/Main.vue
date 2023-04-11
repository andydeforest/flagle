<template>
  <main id="content">
    <slot />
  </main>
</template>

<style>
#content {
  min-height: calc(100vh - var(--base-header-height));
  background-color: #ddd;
}

@media (prefers-color-scheme: dark) {
  #content {
      background-color: var(--dark-mode-bg);
  }
}
</style>
