<template>
  <div
    @click="() => $emit('click')"
    @mouseenter="() => $emit('mouseenter')"
    @mouseleave="() => $emit('mouseleave')"
  >
    <div :class="{ hover: isHover, error: isError, const: isReadOnly }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Cell extends Vue {
  @Prop(Boolean) readonly isHover: boolean | undefined;
  @Prop(Boolean) readonly isError: boolean | undefined;
  @Prop(Boolean) readonly isReadOnly: boolean | undefined;
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
  background-color: aqua !important;
  border-radius: 50%;
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}

.error {
  background-color: red !important;
  border-radius: 50%;
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}

.const {
  background-color: #d5d5d5d5;
  border-radius: 50%;
  --height: 100%;
  height: var(--height);
  line-height: convert(var(--height), percent, px);
  text-align: center;
}
</style>
