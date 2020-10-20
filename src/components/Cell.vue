<template>
  <div class="container">
    <div
      :class="{
        hover: isHover,
        error: isError,
        const: isReadOnly,
        cell: !isReadOnly
      }"
      class="unselectable"
    >
      <slot v-if="simpleValue" />
      <CompositeCell class="composite" :drafts="drafts" v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CompositeCell from "@/components/CompositeCell.vue";

export default defineComponent({
  props: {
    isHover: {
      type: Boolean
    },
    isError: {
      type: Boolean
    },
    isReadOnly: {
      type: Boolean
    },
    drafts: {
      type: Object as PropType<Set<number>>
    }
  },
  computed: {
    simpleValue(): boolean {
      if (this.drafts === undefined) return true;
      else if (this.drafts.size == 0) return true;
      else return false;
    }
  },
  components: {
    CompositeCell
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/_constants.scss";
@import "@/styles/_unselectable.scss";

%base-cell {
  height: 80%;
  width: 80%;
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

@media (max-width: 900px) {
  .composite {
    font-size: 0.31em;
  }
}
</style>
