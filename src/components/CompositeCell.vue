<template>
  <p class="unselectable">{{ generateCell(drafts) }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    drafts: {
      type: Object as PropType<Set<number>>
    }
  },
  methods: {
    generateCell(a: Set<number>): string {
      return [...a].join(" ");
    }
  }
});
</script>

<style scoped lang="scss">
@import "~@/styles/_unselectable.scss";
</style>
