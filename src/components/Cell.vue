<template>
  <div @click="() => $emit('click')" @mouseenter="() => $emit('mouseenter')">
    <div class="cell">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Cell extends Vue {}
</script>

<style scoped lang="scss">
.cell {
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}

.cell:hover {
  background-color: aqua;
  border-radius: 50%;
}
</style>
