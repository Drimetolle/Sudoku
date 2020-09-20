import { nullOrNumber } from "@/types/CellData";

export const state = {
  selectedElement: null,
  selected: false,
  penciled: false
} as {
  selectedElement: nullOrNumber;
  selected: boolean;
  penciled: boolean;
};

export type State = typeof state;
