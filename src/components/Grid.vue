<template>
  <div class="container">
    <Cell
      v-for="(cell, i) in puzzle.cells"
      :key="i"
      :isHover="indexOnHover(i)"
      :isError="indexOnError(i)"
      @click="inputNumber(cell)"
      @mouseenter="searchNumbers(cell.number)"
      @mouseleave="clearHover()"
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
  private hoveredNumberIndexes = new Array<number>();
  private errorNumberIndexes = new Array<number>();

  private getSelectedNumber!: number | null;
  private elementIsFocused!: boolean;

  inputNumber(cell: CellData): void {
    if (!cell.isReadOnly && this.elementIsFocused)
      cell.number = this.getSelectedNumber;
  }

  getAllIndexes(arr: Array<number | null>, val: number) {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }

  searchNumbers(num: number | null): void {
    if (num === null) return;

    const indexes = this.getAllIndexes(
      this.puzzle.cells.map(el => el.number),
      num
    );

    this.hoveredNumberIndexes = indexes;
  }

  validate(): boolean {
    this.errorNumberIndexes = this.puzzle.validatePuzzle();
    return this.errorNumberIndexes.length == 0;
  }

  indexOnHover(i: number): boolean {
    if (this.hoveredNumberIndexes.find(el => el === i) === i) return true;
    return false;
  }

  indexOnError(i: number): boolean {
    if (this.errorNumberIndexes.find(el => el === i) === i) return true;
    return false;
  }

  clearHover(): void {
    this.hoveredNumberIndexes = [];
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
