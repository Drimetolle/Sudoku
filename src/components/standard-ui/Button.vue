<template>
  <div class="ck-button" v-if="isSelectable">
    <label><input type="checkbox"/><slot /></label>
  </div>
  <button v-else @click="() => $emit('click', e)">
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
button {
  padding: 10px 20px;
  border: transparent;
  color: #333;
  background-color: #fff;
  border-radius: 50% / 100%;
  font-size: 14px;
  cursor: pointer;
}

.ck-button {
  margin: 4px;
  border-radius: 4px;
  overflow: auto;
  display: inline-block;
}

.ck-button label {
  float: left;
  width: 4em;
}

.ck-button label span {
  text-align: center;
  padding: 3px 0px;
  display: block;
  border-radius: 4px;
}

.ck-button label input {
  position: absolute;
  top: -20px;
}

.ck-button input:hover + span {
  background-color: #2196f3;
}

.ck-button input:checked + span {
  background-color: #2196f3;
  color: #fff;
}

.ck-button input:checked:hover + span {
  background-color: #2196f3;
  color: #fff;
}
</style>
