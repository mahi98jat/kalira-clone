import create from "zustand"
import { Action, Sorts, State } from "./types"

export const useAppStore = create<State & Action, []>((set) => ({
  filters: {
    sort: Sorts.HIGHTOLOW,
    febric: "",
    supplier: "",
    sareeMall: false,
    sareeShop: false,
  },
  setFilters: (val) => set({ filters: val }),
}))
