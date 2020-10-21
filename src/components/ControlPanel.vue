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
import { defineComponent, ref } from "vue";
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
  setup() {
    const selected = ref<null | SelectedElement>(null);
    return {
      selected
    };
  },
  data: () => {
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
      ]
    };
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
      if (event.key >= 1 && event.key <= 9) {
        this.selectElementOnClick(this.elements[event.key - 1]);
      }
      if (event.key == KeyboardKeys.x) {
        this.selectElementOnClick(this.elements[9]);
      }
      if (event.key == KeyboardKeys.del) {
        this.selectElementOnClick(this.elements[9]);
      }
    },

    selectElementOnClick(el: SelectedElement): void {
      if (this.selected === el) {
        this.selected = null;
        this.$store.commit(MutationTypes.SET_SELECTED_NUMBER, this.selected);
        this.$store.commit(MutationTypes.TWROW_FOCUS);
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
@import "~@/styles/_constants.scss";
@import "~@/styles/_board.scss";
@import "~@/styles/_unselectable.scss";

.control-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  padding: 20px 0;
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
