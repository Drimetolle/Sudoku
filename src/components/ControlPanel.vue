<template>
  <div class="control-container">
    <div
      class="element"
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
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";
import { KeyboardKeys } from "@/types/Keys";

type SelectedElement = {
  view: string;
  value: null | number;
};

@Component({
  methods: {
    ...mapMutations(["setSelectedNumber", "throwFocus"])
  }
})
export default class ControlPanel extends Vue {
  private elements: Array<SelectedElement> = [
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
      view: "x",
      value: null
    }
  ];
  private selected: null | SelectedElement = null;

  private setSelectedNumber!: (num: number | null) => void;
  private throwFocus!: () => void;

  created() {
    window.addEventListener("keydown", this.keyHandler);
  }
  destroyed() {
    window.removeEventListener("keydown", this.keyHandler);
  }

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
  }

  selectElementOnClick(el: SelectedElement): void {
    if (this.selected === el) {
      this.selected = null;
      this.setSelectedNumber(null);
      this.throwFocus();
    } else {
      this.selected = el;
      this.setSelectedNumber(this.selected.value);
    }
  }

  elementIsSelected(el: SelectedElement): boolean {
    return this.selected === el;
  }
}
</script>

<style scoped lang="scss">
.control-container {
  display: grid;
  grid-template-columns: repeat(5, 0.7fr);
  grid-gap: 1px;
  margin: 15px 0;
}
.element {
  cursor: pointer;
  background-color: #d5d5d5d5;
}
.selected {
  background-color: aqua;
}
</style>
