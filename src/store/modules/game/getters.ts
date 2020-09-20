import { GetterTree } from "vuex";
import { nullOrNumber } from "@/types/CellData";
import { State } from "@/store/modules/game/state";

export type Getters = {
  getSelectedNumber(state: State): nullOrNumber;
  elementIsFocused(state: State): boolean;
  getPencilMode(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  getSelectedNumber: state => {
    return state.selectedElement;
  },
  elementIsFocused: state => {
    return state.selected;
  },
  getPencilMode: state => {
    return state.penciled;
  }
};
