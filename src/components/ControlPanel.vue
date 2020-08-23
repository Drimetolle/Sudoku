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
import { nullOrNumber } from "@/types/CellData";

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
      view: "X",
      value: null
    }
  ];
  private selected: null | SelectedElement = null;

  private setSelectedNumber!: (num: nullOrNumber) => void;
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
  --columns: 10;
  --content-width: 80vh;
  --gutter: 17px;
  --row-size: calc(
    (var(--content-width) - (var(--gutter) * (var(--columns) - 1))) /
      var(--columns)
  );
  display: grid;
  max-width: var(--content-width);
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-auto-rows: var(--row-size);
  grid-column-gap: var(--gutter);
  grid-row-gap: var(--gutter);
  margin: 15px auto;
  font-size: 2em;
}
.element {
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #dcdcdc;
  color: #727272;
  height: 95%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.selected {
  background-color: #dcdcdc;
}
</style>
