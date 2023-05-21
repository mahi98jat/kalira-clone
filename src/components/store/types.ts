export type State = {
  filters: FilterTypes
}

export type Action = {
  setFilters: (val: FilterTypes) => void
}

export type FilterTypes = {
  sort: Sorts
  febric: string
  supplier: string
  sareeMall: boolean
  sareeShop: boolean
}

export enum Sorts {
  HIGHTOLOW = "High To Low",
  LOWTOHIGH = "Low To High",
}
