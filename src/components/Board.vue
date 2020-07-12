<template>
  <div>
    <Grid />
    <ControlPanel />
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
export default class Board extends Vue {}
</script>
