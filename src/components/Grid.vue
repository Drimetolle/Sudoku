<template>
  <div class="container">
    <div v-for="(cell, i) in puzzle" :key="i" @click="inputNumber(cell)">
      {{ cell.number }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { generatePuzzle } from "@/utils/sudoku-generator";
import Cell from "@/components/Cell.vue";
import CellData from "@/types/CellData";

@Component({
  computed: {
    ...mapGetters(["getSelectedNumber"])
  },
  components: {
    Cell
  }
})
export default class Grid extends Vue {
  private puzzle = new Array<CellData>();

  private getSelectedNumber!: number | null;

  created() {
    this.puzzle = generatePuzzle();
  }

  inputNumber(cell: CellData): void {
    if (!cell.isReadOnly) cell.number = this.getSelectedNumber;
  }
}
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 1px;
  width: calc(100vh / 2);
}
.container div {
  background-color: red;
  text-align: center;
}

.container div::before {
  content: "";
  padding-bottom: 100%;
  display: inline-block;
  vertical-align: middle;
}
</style>
