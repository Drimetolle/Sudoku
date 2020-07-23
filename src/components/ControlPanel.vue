<template>
  <div class="control-container">
    <div
      class="element"
      :class="{ selected: elementIsSelected(el) }"
      v-for="el in elements"
      :key="el.view"
      @click="selectElement(el)"
    >
      {{ el.view }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

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

  selectElement(el: SelectedElement): void {
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

<style lang="scss" scoped>
.control-container {
  display: grid;
  grid-template-columns: repeat(5, 0.7fr);
  grid-gap: 1px;
  width: calc(100vh / 2);
}
.element {
  cursor: pointer;
}
.selected {
  background-color: aqua;
}
</style>
