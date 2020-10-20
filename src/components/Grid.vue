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
import Cell from "@/components/Cell.vue";
import CellData, { nullOrNumber } from "@/types/CellData";
import * as R from "ramda";
import Puzzle from "@/game-rules/Puzzle";
import ActionQueue, { Action, ActionType } from "@/game-rules/ActionQueue";

export interface GridRefsMethods {
  reset(): void;
  validate(): boolean;
  undo(): void;
}

export default defineComponent({
  data() {
    return {
      puzzle: new Puzzle(),
      actionQueue: new ActionQueue(),
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

    inputRouter(cell: CellData, index: number): void {
      if (this.$store.getters.getPencilMode) {
        this.inputNumberWithPencil(cell, index);
      } else {
        this.inputNumber(cell, index);
      }
    },

    inputNumber(cell: CellData, index: number): void {
      if (cell.isReadOnly) return;
      if (!this.$store.getters.elementIsFocused) return;

      const value = cell.number;

      if (cell.number == this.$store.getters.getSelectedNumber) {
        cell.number = null;
      } else {
        cell.number = this.$store.getters.getSelectedNumber;
        cell.draftNumbers = new Set();
      }
      this.actionQueue.push(
        new Action(
          this.$store.getters.getSelectedNumber,
          value,
          index,
          ActionType.value
        )
      );
      this.removeIndexOfArrays(index);
    },

    inputNumberWithPencil(cell: CellData, index: number): void {
      if (cell.isReadOnly) return;
      if (!this.$store.getters.elementIsFocused) return;

      const value = cell.number;

      if (typeof this.$store.getters.getSelectedNumber == "number") {
        this.inputUniqueNumber(cell, this.$store.getters.getSelectedNumber);
        cell.number = null;
      } else cell.draftNumbers = new Set();
      this.actionQueue.push(
        new Action(
          this.$store.getters.getSelectedNumber,
          value,
          index,
          ActionType.draft
        )
      );
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

    getAllIndexes(arr: Array<nullOrNumber>, val: number) {
      const indexes = [];
      let i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
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

    indexOnError(i: number): boolean {
      if (this.errorNumberIndexes.find(el => el === i) === i) return true;
      return false;
    },

    clearHover(): void {
      this.hoveredNumberIndexes = [];
    },

    undo(): void {
      const cell = this.actionQueue.pop();

      if (!cell) {
        return;
      }

      if (cell.type === ActionType.value) {
        this.puzzle.cells[cell.index].number = cell.previousValue;
        this.puzzle.cells.splice(cell.index, 1, this.puzzle.cells[cell.index]);
      } else if (cell.type === ActionType.draft) {
        const element = this.puzzle.cells[cell.index];

        if (cell.value) {
          element.draftNumbers?.delete(cell.value);
          this.puzzle.cells.splice(cell.index, 1, element);
        }
      }
    }
  },
  components: {
    Cell
  }
});
</script>

<style lang="scss">
@import "@/styles/_board.scss";
@import "@/styles/_constants.scss";

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
