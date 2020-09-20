import { createStore, Store as VuexStore, CommitOptions } from "vuex";
import { State, state } from "@/store/modules/game/state";
import { Getters, getters } from "@/store/modules/game/getters";
import { Mutations, mutations } from "@/store/modules/game/mutation";

export const store = createStore({
  state,
  getters,
  mutations
});

export type Store = Omit<VuexStore<State>, "getters" | "commit"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
