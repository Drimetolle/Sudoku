<template>
  <div>
    <div class="container">
      <Cell
        v-for="(cell, i) in puzzle.cells"
        :key="i"
        :isHover="indexOnHover(i)"
        :isError="indexOnError(i)"
        :isReadOnly="cell.isReadOnly"
        :drafts="cell.draftNumbers"
        @click="inputRouter(cell, i)"
        @mouseenter="searchNumbers(cell.number)"
        @mouseleave="clearHover()"
      >
        {{ cell.number }}
      </Cell>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Puzzle from "@/game-rules/Puzzle";
import Cell from "@/components/Cell.vue";
import CellData, { nullOrNumber } from "@/types/CellData";
import * as R from "ramda";

@Component({
  computed: {
    ...mapGetters(["getSelectedNumber", "elementIsFocused", "getPencilMode"])
  },
  components: {
    Cell
  }
})
export default class Grid extends Vue {
  private puzzle = new Puzzle();
  private hoveredNumberIndexes = new Array<number>();
  private errorNumberIndexes = new Array<number>();

  private getSelectedNumber!: nullOrNumber;
  private elementIsFocused!: boolean;
  private getPencilMode!: boolean;

  private removeIndexOfArrays(index: number) {
    this.hoveredNumberIndexes = R.reject(
      el => el == index,
      this.errorNumberIndexes
    );
    this.errorNumberIndexes = R.reject(
      el => el == index,
      this.errorNumberIndexes
    );
  }

  hoverRouter(index: number): void {
    if (this.getPencilMode) this.indexOnHoverWithPencil(index);
    else this.indexOnHover(index);
  }

  errorRouter(index: number): void {
    if (this.getPencilMode) this.indexOnErrorWithPencil(index);
    else this.indexOnError(index);
  }

  inputRouter(cell: CellData, index: number): void {
    if (this.getPencilMode) this.inputNumberWithPencil(cell, index);
    else this.inputNumber(cell, index);
  }

  inputNumber(cell: CellData, index: number): void {
    if (cell.isReadOnly) return;
    if (!this.elementIsFocused) return;

    if (cell.number == this.getSelectedNumber) cell.number = null;
    else {
      cell.number = this.getSelectedNumber;
      cell.draftNumbers = new Set();
    }
    this.removeIndexOfArrays(index);
  }

  inputNumberWithPencil(cell: CellData, index: number): void {
    if (cell.isReadOnly) return;
    if (!this.elementIsFocused) return;

    if (typeof this.getSelectedNumber == "number") {
      this.inputUniqueNumber(cell, this.getSelectedNumber);
      cell.number = null;
    } else cell.draftNumbers = new Set();
    this.removeIndexOfArrays(index);
  }

  private inputUniqueNumber(cell: CellData, value: number): void {
    if (cell.draftNumbers?.has(value)) {
      cell.draftNumbers?.delete(value);
      cell.draftNumbers = new Set(cell.draftNumbers);
    } else if (cell.draftNumbers !== undefined) {
      cell.draftNumbers = new Set([...cell.draftNumbers?.add(value)].sort());
    }
  }

  getAllIndexes(arr: Array<nullOrNumber>, val: number) {
    const indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }

  searchNumbers(num: nullOrNumber): void {
    if (num === null) return;

    const indexes = this.getAllIndexes(
      this.puzzle.cells.map(el => el.number),
      num
    );

    const draftIndexes = this.puzzle.cells
      .map((el, i) => (el.draftNumbers?.has(num) ? i : Infinity))
      .filter(el => el !== Infinity);

    this.hoveredNumberIndexes = [...indexes, ...draftIndexes];
  }

  validate(): boolean {
    this.errorNumberIndexes = this.puzzle.validatePuzzle();
    return this.errorNumberIndexes.length == 0;
  }

  reset(): void {
    this.errorNumberIndexes = [];
    this.hoveredNumberIndexes = [];
    this.puzzle.resetPuzzle();
  }

  indexOnHover(i: number): boolean {
    if (this.hoveredNumberIndexes.find(el => el === i) === i) return true;
    return false;
  }

  indexOnHoverWithPencil(i: number): boolean {
    if (this.hoveredNumberIndexes.find(el => el === i) === i) return true;
    return false;
  }

  indexOnError(i: number): boolean {
    if (this.errorNumberIndexes.find(el => el === i) === i) return true;
    return false;
  }

  indexOnErrorWithPencil(i: number): boolean {
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
