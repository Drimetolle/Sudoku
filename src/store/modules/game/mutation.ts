import { MutationTypes } from "@/store/modules/game/mutuations-types";
import { State } from "@/store/modules/game/state";
import { nullOrNumber } from "@/types/CellData";
import { MutationTree } from "vuex";

export type Mutations<S = State> = {
  [MutationTypes.SET_SELECTED_NUMBER](state: S, num: nullOrNumber): void;
  [MutationTypes.TWROW_FOCUS](state: S): void;
  [MutationTypes.TOGGLE_PENCIL_MODE](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_SELECTED_NUMBER](state, num) {
    state.selectedElement = num;
    state.selected = true;
  },
  [MutationTypes.TWROW_FOCUS](state) {
    state.selected = false;
  },
  [MutationTypes.TOGGLE_PENCIL_MODE](state) {
    state.penciled = !state.penciled;
  }
};

// export const mutations: MutationTree<State> & Mutations = {

//   // [MutationTypes.SET_SELECTED_NUMBER](state: Store, num: nullOrNumber) {
//   //   state.state.selectedElement = num;
//   //   state.selected = true;
//   // },
//   // throwFocus(state: Store) {
//   //   state.selected = false;
//   // },
//   // togglePencilMode(state: Store) {
//   //   state.penciled = !state.penciled;
//   // }
// };
