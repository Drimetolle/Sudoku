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
@import "@/styles/_constants.scss";

%base-cell {
  $width: 80%;
  $height: 80%;
  height: $height;
  width: $width;
  line-height: convert($height, percent, px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  cursor: pointer;
  font-size: 2em;
  color: $font-color-entered-number;
}

%circle-cell {
  @extend %base-cell;
  border-radius: 50%;
}

.hover {
  @extend %circle-cell;
  background-color: $hover-color !important;
  color: $font-color !important;
}

.error {
  @extend %circle-cell;
  background-color: $error-cell-background-color !important;
  color: $font-color;
}

.const {
  @extend %circle-cell;
  background-color: $const-cell-background-color;
  color: $const-cell-font-color;
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
  text-align: center;
}
</style>
