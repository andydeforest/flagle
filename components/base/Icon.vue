<template>
  <font-awesome-icon :icon="icon" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
