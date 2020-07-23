class Game {
  selectedElement: null | number;
  selected: boolean;

  constructor() {
    this.selectedElement = null;
    this.selected = false;
  }
}

const getters = {
  getSelectedNumber(state: Game): null | number {
    return state.selectedElement;
  },
  elementIsFocused(state: Game): boolean {
    return state.selected;
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
  }
};

export default {
  state: new Game(),
  getters,
  actions,
  mutations
};
