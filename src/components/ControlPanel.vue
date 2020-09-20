<template>
  <div class="control-container">
    <div
      class="element unselectable"
      :class="{ selected: elementIsSelected(el) }"
      v-for="el in elements"
      :key="el.view"
      @click="selectElementOnClick(el)"
    >
      {{ el.view }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { KeyboardKeys } from "@/types/Keys";
import { MutationTypes } from "@/store/modules/game/mutuations-types";

type SelectedElement = {
  view: string;
  value: null | number;
};

interface ControlPanel {
  elements: Array<SelectedElement>;
  selected: null | SelectedElement;
}

export default defineComponent({
  data() {
    return {
      elements: [
        {
          view: "1",
          value: 1
        },
        {
          view: "2",
          value: 2
        },
        {
          view: "3",
          value: 3
        },
        {
          view: "4",
          value: 4
        },
        {
          view: "5",
          value: 5
        },
        {
          view: "6",
          value: 6
        },
        {
          view: "7",
          value: 7
        },
        {
          view: "8",
          value: 8
        },
        {
          view: "9",
          value: 9
        },
        {
          view: "X",
          value: null
        }
      ],
      selected: null
    } as ControlPanel;
  },
  created() {
    window.addEventListener("keydown", this.keyHandler);
  },
  unmounted() {
    window.removeEventListener("keydown", this.keyHandler);
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyHandler(event: any) {
      if (event.keyCode == KeyboardKeys.one) {
        this.selectElementOnClick(this.elements[0]);
      }
      if (event.keyCode == KeyboardKeys.two) {
        this.selectElementOnClick(this.elements[1]);
      }
      if (event.keyCode == 51) {
        this.selectElementOnClick(this.elements[2]);
      }
      if (event.keyCode == 52) {
        this.selectElementOnClick(this.elements[3]);
      }
      if (event.keyCode == 53) {
        this.selectElementOnClick(this.elements[4]);
      }
      if (event.keyCode == 54) {
        this.selectElementOnClick(this.elements[5]);
      }
      if (event.keyCode == 55) {
        this.selectElementOnClick(this.elements[6]);
      }
      if (event.keyCode == 56) {
        this.selectElementOnClick(this.elements[7]);
      }
      if (event.keyCode == 57) {
        this.selectElementOnClick(this.elements[8]);
      }
      if (event.keyCode == KeyboardKeys.x) {
        this.selectElementOnClick(this.elements[9]);
      }
      if (event.keyCode == KeyboardKeys.del) {
        this.selectElementOnClick(this.elements[9]);
      }
    },

    selectElementOnClick(el: SelectedElement): void {
      if (this.selected === el) {
        this.selected = null;
        this.$store.commit(MutationTypes.SET_SELECTED_NUMBER, null);
        this.$store.commit(MutationTypes.TWROW_FOCUS, undefined);
      } else {
        this.selected = el;
        this.$store.commit(
          MutationTypes.SET_SELECTED_NUMBER,
          this.selected.value
        );
      }
    },

    elementIsSelected(el: SelectedElement): boolean {
      return this.selected === el;
    }
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/_constants.scss";
@import "@/styles/_board.scss";
@import "@/styles/_unselectable.scss";

.control-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  padding: 20px 0px;
}

.control-container div::before {
  content: "";
  padding-bottom: 100%;
  vertical-align: top;
}

.element {
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid $background-color-selected-button;
  color: $color-selected-button;
  height: 95%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
}

.selected {
  background-color: $background-color-selected-button;
}
</style>
