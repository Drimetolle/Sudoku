<template>
  <div
    :class="{
      pressed: isPressed
    }"
    class="sw-button unselectable"
    @click="click($event)"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => {
    return {
      isPressed: false
    };
  },
  methods: {
    click() {
      this.isPressed = !this.isPressed;
    }
  }
});
</script>

<style lang="scss">
@import "~@/styles/_constants.scss";
@import "~@/styles/_buttons.scss";
@import "~@/styles/_unselectable.scss";

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
  background-color: $background-color-for-ui;
  & span {
    color: $font-color !important;
  }
  & i {
    color: $font-color !important;
  }
}
</style>
