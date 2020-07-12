<template>
  <div class="control-container">
    <div
      class="element"
      :class="{ selected: isSelected(el) }"
      v-for="el in elements"
      :key="el"
      @click="selectElement(el)"
    >
      {{ el }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

type SelectedElement = null | number | string;

@Component({})
export default class ControlPanel extends Vue {
  private elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, "x"];
  private selected: SelectedElement = null;

  selectElement(el: number | string): void {
    if (this.selected === el) {
      this.selected = null;
    } else {
      this.selected = el;
    }
    console.log(this.selected);
  }

  isSelected(el: SelectedElement): boolean {
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
