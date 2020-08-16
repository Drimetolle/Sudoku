<template>
  <div
    class="container"
    @click="() => $emit('click')"
    @mouseenter="() => $emit('mouseenter')"
    @mouseleave="() => $emit('mouseleave')"
  >
    <div
      :class="{
        hover: isHover,
        error: isError,
        const: isReadOnly,
        cell: !isReadOnly
      }"
    >
      <slot v-if="simpleValue" />
      <CompositeCell class="composite" :drafts="drafts" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CompositeCell from "@/components/CompositeCell.vue";

@Component({
  components: {
    CompositeCell
  }
})
export default class Cell extends Vue {
  @Prop(Boolean) readonly isHover: boolean | undefined;
  @Prop(Boolean) readonly isError: boolean | undefined;
  @Prop(Boolean) readonly isReadOnly: boolean | undefined;
  @Prop(Set) readonly drafts: Set<number> | undefined;

  get simpleValue(): boolean {
    if (this.drafts === undefined) return true;
    else if (this.drafts.size == 0) return true;
    else return false;
  }
}
</script>

<style scoped lang="scss">
%base-cell {
  --width: 80%;
  --height: 80%;
  height: var(--height);
  width: var(--width);
  line-height: convert(var(--height), percent, px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  cursor: pointer;
  font-size: 2em;
  color: #727272;
}
%circle-cell {
  @extend %base-cell;
  border-radius: 50%;
}

.hover {
  @extend %circle-cell;
  background-color: #a7b4bb !important;
  color: #fff !important;
}

.error {
  @extend %circle-cell;
  background-color: #d76d6d !important;
  color: #fff;
}

.const {
  @extend %circle-cell;
  background-color: #e7e7e7;
  color: #9e9e9e;
  cursor: default;
}

.cell {
  @extend %base-cell;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.composite {
  font-size: 0.45em;
  width: 80%;
  background: transparent;
}
</style>
