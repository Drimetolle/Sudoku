<template>
  <button class="unselectable" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss">
@import "@/styles/_constants.scss";
@import "@/styles/_buttons.scss";
@import "@/styles/_unselectable.scss";

button {
  @extend %base-button;
}

button:focus {
  outline: 0;
}

button:hover {
  @extend %button-hover;
}
</style>
