<template>
  <div id="app">
    <Board></Board>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/Board.vue";

export default defineComponent({
  name: "App",
  components: {
    Board
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 10px;
}
</style>
