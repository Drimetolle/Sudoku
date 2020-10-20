<template>
  <div class="board">
    <Grid ref="grid" />
    <ControlPanel />
    <div class="center-block-flex">
      <Button @click="validate()">
        <i class="material-icons gray">
          done_all
        </i>
      </Button>
      <SwitchButton @click="pencilToggle()">
        <i class="material-icons gray">
          create
        </i>
      </SwitchButton>
      <Button @click="resetPuzzle()">
        <i class="material-icons gray">
          replay
        </i>
      </Button>
      <Button @click="undo()">
        <i class="material-icons gray">
          undo
        </i>
      </Button>
    </div>
    <div class="center-block-flex">
      <div v-if="valid">Puzzle valid!</div>
      <div v-if="isValid">Puzzle invalid!</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Grid, { GridRefsMethods } from "@/components/Grid.vue";
import ControlPanel from "@/components/ControlPanel.vue";
import Button from "@/components/standard-ui/Button.vue";
import SwitchButton from "@/components/standard-ui/SwitchButton.vue";
import { MutationTypes } from "@/store/modules/game/mutuations-types";

interface Board {
  valid: null | boolean;
}

export default defineComponent({
  data() {
    return {
      valid: null
    } as Board;
  },
  computed: {
    isValid(): boolean {
      if (this.valid === null) return false;
      else return !this.valid;
    }
  },
  methods: {
    resetPuzzle(): void {
      (this.$refs.grid as GridRefsMethods).reset();
    },
    validate() {
      this.valid = (this.$refs.grid as GridRefsMethods).validate();
    },
    pencilToggle() {
      this.$store.commit(MutationTypes.TOGGLE_PENCIL_MODE);
    },
    undo() {}
  },
  components: {
    Grid,
    ControlPanel,
    Button,
    SwitchButton
  }
});
</script>

<style lang="scss">
@import "@/styles/_constants.scss";

.center-block-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.material-icons.gray {
  color: $color-selected-button;
}

.board {
  margin: 0 auto;
  max-width: 60em;
}
</style>
