<template>
  <div class="container">
    <Cell
      v-for="(cell, i) in puzzleManager.puzzle.cells"
      :key="i"
      :isHover="cell.isHovered"
      :isError="cell.isErrored"
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
import { defineComponent, reactive } from "vue";
import Cell from "@/components/Cell.vue";
import CellData, { nullOrNumber } from "@/types/CellData";
import Puzzle from "@/game-rules/Puzzle";
import PuzzleManager from "@/game-rules/Operation/PuzzleManager";
import {
  SetDraftCommand,
  SetValueCommand
} from "@/game-rules/Operation/Command";

export interface GridRefsMethods {
  reset(): void;
  validate(): boolean;
  undo(): void;
}

export default defineComponent({
  setup() {
    const puzzle = reactive(new Puzzle());
    const puzzleManager = new PuzzleManager(puzzle as Puzzle);
    return {
      puzzleManager
    };
  },
  methods: {
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

      this.puzzleManager.executeCommand(
        cell,
        new SetValueCommand(this.$store.getters.getSelectedNumber, index)
      );
    },

    inputNumberWithPencil(cell: CellData, index: number): void {
      if (cell.isReadOnly) return;
      if (!this.$store.getters.elementIsFocused) return;

      this.puzzleManager.executeCommand(
        cell,
        new SetDraftCommand(this.$store.getters.getSelectedNumber, index)
      );
    },

    searchNumbers(num: nullOrNumber): void {
      if (num === null) return;

      const indexes = this.getAllIndexes(
        this.puzzleManager.puzzle.cells.map(el => el.number),
        num
      );

      const draftIndexes = this.puzzleManager.puzzle.cells
        .map((el, i) => (el.draftNumbers?.has(num) ? i : Infinity))
        .filter(el => el !== Infinity);

      [...indexes, ...draftIndexes].forEach(
        _ => (this.puzzleManager.puzzle.cells[_].isHovered = true)
      );
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
      const result = this.puzzleManager.puzzle.validatePuzzle();

      result.forEach(
        _ => (this.puzzleManager.puzzle.cells[_].isErrored = true)
      );

      return result.length == 0;
    },

    reset(): void {
      this.puzzleManager.puzzle.resetPuzzle();
    },

    clearHover(): void {
      for (let i = 0; i < this.puzzleManager.puzzle.cells.length; i++) {
        this.puzzleManager.puzzle.cells[i].isHovered = false;
      }
    },

    undo(): void {
      this.puzzleManager.undo();
    }
  },
  components: {
    Cell
  }
});
</script>

<style lang="scss">
@import "~@/styles/_board.scss";
@import "~@/styles/_constants.scss";

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
