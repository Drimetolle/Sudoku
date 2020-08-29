<template>
  <div
    class="ck-button"
    v-if="isSelectable"
    @click.prevent="$emit('click', $event)"
  >
    <label><input type="checkbox"/><slot /></label>
  </div>
  <button v-else @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Grid extends Vue {
  @Prop(Boolean) readonly isSelectable: boolean | undefined;
}
</script>

<style lang="scss">
@import "@/styles/_constants.scss";
$margin-button: 4px;
$button-width: 64px;
$button-height: 32px;

%button-hover {
  background-color: #2196f3;
  color: $font-color;
}

button {
  width: $button-width;
  height: $button-height;
  border: transparent;
  background-color: #fff;
  border-radius: 50% / 100%;
  cursor: pointer;
  margin: $margin-button;
}

button:focus {
  outline: 0;
}

.ck-button {
  overflow: auto;
  display: inline-block;
  margin: $margin-button;
  position: relative;
  width: $button-width;
  height: $button-height;
}

.ck-button label {
  float: left;
  cursor: pointer;
}

.ck-button label span {
  border-radius: 50% / 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.ck-button label input {
  position: absolute;
  top: -20px;
}

button:hover {
  background-color: #2196f3;
}

button:hover i {
  color: $font-color !important;
}

button:hover span {
  color: $font-color !important;
}

.ck-button input:hover + span {
  @extend %button-hover;
}

.ck-button input:checked + span {
  background-color: #2196f3;
  color: $font-color;
}

.ck-button input:checked:hover + span {
  @extend %button-hover;
}
</style>
