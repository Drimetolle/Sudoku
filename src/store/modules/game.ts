class Game {
  selectedElement: null | number;
  selected: boolean;
  penciled: boolean;

  constructor() {
    this.selectedElement = null;
    this.selected = false;
    this.penciled = false;
  }
}

const getters = {
  getSelectedNumber(state: Game): null | number {
    return state.selectedElement;
  },
  elementIsFocused(state: Game): boolean {
    return state.selected;
  },
  getPencilMode(state: Game): boolean {
    return state.penciled;
  }
};

const actions = {};

const mutations = {
  setSelectedNumber(state: Game, num: null | number) {
    state.selectedElement = num;
    state.selected = true;
  },
  throwFocus(state: Game) {
    state.selected = false;
  },
  togglePencilMode(state: Game) {
    state.penciled = !state.penciled;
  }
};

export default {
  state: new Game(),
  getters,
  actions,
  mutations
};
