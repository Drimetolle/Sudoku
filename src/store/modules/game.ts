class Game {
  selected: null | number;

  constructor() {
    this.selected = null;
  }
}

const getters = {
  getSelectedNumber(state: Game): null | number {
    return state.selected;
  }
};

const actions = {};

const mutations = {
  setSelectedNumber(state: Game, num: number) {
    state.selected = num;
  }
};

export default {
  state: new Game(),
  getters,
  actions,
  mutations
};
