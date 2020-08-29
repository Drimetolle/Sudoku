<template>
  <button class="a" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss">
@import "@/styles/_constants.scss";
@import "@/styles/_buttons.scss";

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
