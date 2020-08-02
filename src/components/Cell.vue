<template>
  <div
    @click="() => $emit('click')"
    @mouseenter="() => $emit('mouseenter')"
    @mouseleave="() => $emit('mouseleave')"
  >
    <div :class="{ hover: isHover }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Cell extends Vue {
  @Prop(Boolean) isHover: boolean | undefined;
}
</script>

<style scoped lang="scss">
.cell {
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}

.hover {
  background-color: aqua;
  border-radius: 50%;
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}
</style>
