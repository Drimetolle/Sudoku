<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Puzzle from "@/game-rules/Puzzle";
import Cell from "@/components/Cell.vue";
import CellData, { nullOrNumber } from "@/types/CellData";
import * as R from "ramda";

export interface GridRefsMethods {
  reset(): void;
  validate(): boolean;
}

export default defineComponent({
  data() {
    return {
      puzzle: new Puzzle(),
      hoveredNumberIndexes: new Array<number>(),
      errorNumberIndexes: new Array<number>()
    };
  },
  methods: {
    removeIndexOfArrays(index: number) {
      this.hoveredNumberIndexes = R.reject(
        el => el == index,
        this.errorNumberIndexes
      );
      this.errorNumberIndexes = R.reject(
        el => el == index,
        this.errorNumberIndexes
      );
    },

    hoverRouter(index: number): void {
      if (this.$store.getters.getPencilMode) this.indexOnHoverWithPencil(index);
      else this.indexOnHover(index);
    },

    errorRouter(index: number): void {
      if (this.$store.getters.getPencilMode) this.indexOnErrorWithPencil(index);
      else this.indexOnError(index);
    },

    inputRouter(cell: CellData, index: number): void {
      if (this.$store.getters.getPencilMode)
        this.inputNumberWithPencil(cell, index);
      else this.inputNumber(cell, index);
    },

    inputNumber(cell: CellData, index: number): void {
      if (cell.isReadOnly) return;
      if (!this.$store.getters.elementIsFocused) return;

      if (cell.number == this.$store.getters.getSelectedNumber)
        cell.number = null;
      else {
        cell.number = this.$store.getters.getSelectedNumber;
        cell.draftNumbers = new Set();
      }
      this.removeIndexOfArrays(index);
    },

    inputNumberWithPencil(cell: CellData, index: number): void {
      if (cell.isReadOnly) return;
      if (!this.$store.getters.elementIsFocused) return;

      if (typeof this.$store.getters.getSelectedNumber == "number") {
        this.inputUniqueNumber(cell, this.$store.getters.getSelectedNumber);
        cell.number = null;
      } else cell.draftNumbers = new Set();
      this.removeIndexOfArrays(index);
    },

    inputUniqueNumber(cell: CellData, value: number): void {
      if (cell.draftNumbers?.has(value)) {
        cell.draftNumbers?.delete(value);
        cell.draftNumbers = new Set(cell.draftNumbers);
      } else if (cell.draftNumbers !== undefined) {
        cell.draftNumbers = new Set([...cell.draftNumbers?.add(value)].sort());
      }
    },

    getAllIndexes(arr: Array<nullOrNumber>, val: number) {
      const indexes = [];
      let i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
    },

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
    },

    validate(): boolean {
      this.errorNumberIndexes = this.puzzle.validatePuzzle();
      return this.errorNumberIndexes.length == 0;
    },

    reset(): void {
      this.errorNumberIndexes = [];
      this.hoveredNumberIndexes = [];
      this.puzzle.resetPuzzle();
    },

    indexOnHover(i: number): boolean {
      if (this.hoveredNumberIndexes.find(el => el === i) === i) return true;
      return false;
    },

    indexOnHoverWithPencil(i: number): boolean {
      if (this.hoveredNumberIndexes.find(el => el === i) === i) return true;
      return false;
    },

    indexOnError(i: number): boolean {
      if (this.errorNumberIndexes.find(el => el === i) === i) return true;
      return false;
    },

    indexOnErrorWithPencil(i: number): boolean {
      if (this.errorNumberIndexes.find(el => el === i) === i) return true;
      return false;
    },

    clearHover(): void {
      this.hoveredNumberIndexes = [];
    }
  },
  components: {
    Cell
  }
});
</script>

<style lang="scss">
@import "@/styles/_board.scss";

.container div {
  background-color: whitesmoke;
}

.container {
  display: grid;
  $columns: 9;
  $gutter: 1px;
  grid-template-columns: repeat($columns, 1fr);
  grid-gap: $gutter;
}

.container div::before {
  content: "";
  padding-bottom: 100%;
  vertical-align: top;
}
</style>
