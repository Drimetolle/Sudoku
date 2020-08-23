<template>
  <div>{{ gen(drafts) }}</div>
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

<style scoped lang="scss"></style>
