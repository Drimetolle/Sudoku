<template>
  <div
    :class="{
      pressed: isPressed
    }"
    class="sw-button"
    @click="click($event)"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SwitchButton extends Vue {
  private isPressed = false;

  click(event: unknown) {
    this.isPressed = !this.isPressed;
    this.$emit("click", event);
  }
}
</script>

<style lang="scss">
@import "@/styles/_constants.scss";
@import "@/styles/_buttons.scss";

.sw-button {
  @extend %base-button;
  position: relative;
}

%sw-button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.sw-button span {
  @extend %sw-button-content;
}

.sw-button i {
  @extend %sw-button-content;
}

.sw-button:hover {
  @extend %button-hover;
}

.pressed {
  background-color: #2196f3;
  & span {
    color: $font-color !important;
  }
  & i {
    color: $font-color !important;
  }
}
</style>
