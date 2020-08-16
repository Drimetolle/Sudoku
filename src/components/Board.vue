<template>
  <div class="board">
    <Grid ref="grid" />
    <ControlPanel />
    <button @click="validate()">validate</button>
    <button @click="pencilToggle()">pencil</button>
    <div v-if="valid">Puzzle valid!</div>
    <div v-if="isValid">Puzzle invalid!</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grid from "@/components/Grid.vue";
import ControlPanel from "@/components/ControlPanel.vue";
import { mapMutations, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["getPencilMode"])
  },
  methods: {
    ...mapMutations(["togglePencilMode"])
  },
  components: {
    Grid,
    ControlPanel
  }
})
export default class Board extends Vue {
  private valid: boolean | null = null;

  private togglePencilMode!: () => void;
  private getPencilMode!: boolean;

  validate() {
    this.valid = (this.$refs.grid as Grid).validate();
  }

  pencilToggle() {
    this.togglePencilMode();
  }

  get isValid(): boolean {
    if (this.valid === null) return false;
    else return !this.valid;
  }
}
</script>

<style lang="scss">
.board {
  --width: 80vh;
  margin: 0 auto;
  width: var(--width);
}
</style>
