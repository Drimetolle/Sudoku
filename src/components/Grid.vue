<template>
  <div class="container">
    <Cell
      v-for="(cell, i) in puzzle.cells"
      :key="i"
      @click="inputNumber(cell)"
      @mouseenter="searchNumbers(cell.number)"
    >
      {{ cell.number }}
    </Cell>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Puzzle from "@/game-rules/Puzzle";
import Cell from "@/components/Cell.vue";
import CellData from "@/types/CellData";

@Component({
  computed: {
    ...mapGetters(["getSelectedNumber", "elementIsFocused"])
  },
  components: {
    Cell
  }
})
export default class Grid extends Vue {
  private puzzle = new Puzzle();

  private getSelectedNumber!: number | null;
  private elementIsFocused!: boolean;

  inputNumber(cell: CellData): void {
    if (!cell.isReadOnly && this.elementIsFocused)
      cell.number = this.getSelectedNumber;
  }

  searchNumbers(num: number | null): void {
    if (num === null) return;
  }

  validate(): boolean {
    return this.puzzle.validatePuzzle();
  }
}
</script>

<style lang="scss">
.container div {
  background-color: whitesmoke;
}

.container {
  --columns: 9;
  --content-width: 80vh;
  --gutter: 1px;
  --row-size: calc(
    (var(--content-width) - (var(--gutter) * (var(--columns) - 1))) /
      var(--columns)
  );
  display: grid;
  max-width: var(--content-width);
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-auto-rows: var(--row-size);
  grid-column-gap: var(--gutter);
  grid-row-gap: var(--gutter);
}
</style>
