<template>
  <div class="container">
    <div v-for="a in rows * columns" :key="a">
      {{ puzzle[a] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { makepuzzle } from "sudoku";

@Component
export default class Grid extends Vue {
  private rows = 9;
  private columns = 9;
  private puzzle = null;

  created() {
    this.puzzle = makepuzzle();
    console.log(this.puzzle);
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
