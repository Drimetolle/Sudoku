<template>
  <p class="unselectable">{{ gen(drafts) }}</p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CompositeCell extends Vue {
  @Prop(Set) readonly drafts: Set<number> | undefined;

  gen(a: Set<number>): string {
    return [...a].join(" ");
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/_unselectable.scss";
</style>
