<template>
  <section
    :class="classObject"
    :data-section-background="background"
  >
    <slot v-if="noContainer" />
    <div
      v-else
      class="container"
    >
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    noContainer: Boolean,
    background: String,
    includeGaps: Boolean,
    sectionRowGap: {
      type: String,
      default: 'base-gap'
    }
  },
  data() {
    return {
      hasClass: true
    };
  },
  computed: {
    classObject() {
      return {
        'base-section': !this.hasClass,
        'include-gaps': this.includeGaps || !this.hasClass
      };
    }
  },
  mounted() {
    this.hasClass = this.$el.className !== '';
    if (this.includeGaps || !this.hasClass) {
      this.$el.style.setProperty('--section-row-gap', `var(--${this.sectionRowGap})`);
    }
  }
};
</script>

<style lang="scss">
.container {
  position: relative;
  margin: 0 var(--base-container-margin);
  padding: var(--base-container-padding) 0;
}

.include-gaps {
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--section-row-gap);
  }
}
</style>
