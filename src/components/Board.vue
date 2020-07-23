<template>
  <div>
    <Grid ref="grid" />
    <ControlPanel />
    <button @click="validate()">validate</button>
    <div v-if="valid">Puzzle valid!</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grid from "@/components/Grid.vue";
import ControlPanel from "@/components/ControlPanel.vue";

@Component({
  components: {
    Grid,
    ControlPanel
  }
})
export default class Board extends Vue {
  private valid = false;

  validate() {
    this.valid = (this.$refs.grid as Grid).validate();
  }
}
</script>
