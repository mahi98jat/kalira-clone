import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AppBar, Button, Drawer, Typography } from "@mui/material"
import { collections } from "../../data/collection"
import ProductCard from "components/ProductCard"
import SwapVertIcon from "@mui/icons-material/SwapVert"
import TuneIcon from "@mui/icons-material/Tune"
import { Sorts, useAppStore } from "components/store"
import SelectInput from "components/SelectInput"
import { ProductDetails } from "interface"
import CheckBoxInput from "components/CheckBoxInput"
import { GetWindowDimensions } from "utils/helpers"
import logo from "../../icons/icon-72x72.png"
import "./index.css"

const sortOptions = ["Low To High", "High To Low"]
type DrawerType = "Sort" | "Filter" | undefined

export const Home = () => {
  const { width } = GetWindowDimensions()
  const navigate = useNavigate()
  const [febrics, setFebrics] = useState<string[]>([])
  const [suppliers, setSupplier] = useState<string[]>([])
  const [openDrawer, setOpenDrawer] = useState<DrawerType>()

  const [products, setProducts] = useState<ProductDetails[]>()
  const [filters, setFilters] = useAppStore((state) => [state.filters, state.setFilters])

  useEffect(() => {
    intialSetters()
  }, [])

  function intialSetters() {
    const availFebrics: string[] = []
    const availSupplier: string[] = []
    collections.forEach((el) => {
      availFebrics.push(el.sareeFabric)
      availSupplier.push(el.supplierName)
    })

    const febricSet = new Set(availFebrics)
    const supplierSet = new Set(availSupplier)

    const uniqueFeb = Array.from(febricSet)
    const uniqueSup = Array.from(supplierSet)
    setFebrics(uniqueFeb)
    setSupplier(uniqueSup)
    setFilters({ ...filters, febric: uniqueFeb[0], supplier: uniqueSup[0] })
  }

  useEffect(() => {
    let list = collections
    if (filters.sort === Sorts.HIGHTOLOW) {
      list = list.sort((a, b) => b.listingPrice - a.listingPrice)
    } else {
      list = list.sort((a, b) => a.listingPrice - b.listingPrice)
    }

    setProducts(list.filter((el) => el.sareeFabric === filters.febric || el.blouseFabric === filters.febric || el.supplierName === filters.supplier))
  }, [filters])

  const navigateToDetails = (productId: number) => {
    navigate(`/details/${productId}`)
  }

  const Products = products && products.map((product) => <ProductCard onClick={() => navigateToDetails(product.id)} data={product} />)

  function handleFilterChange(name: string, value: string | boolean) {
    setFilters({ ...filters, [name]: value })
  }

  return (
    <>
      <AppBar color="inherit">
        <div className="icon-container">
          <img src={logo} />
        </div>

        {width > 768 ? (
          <div className="filters-container">
            <div>
              <SelectInput name="febric" label="Febric" options={febrics} value={filters.febric} changeController={handleFilterChange} />
              <SelectInput name="supplier" label="Supplier" options={suppliers} value={filters.supplier} changeController={handleFilterChange} />
              <CheckBoxInput name="sareeMall" label="Saree Mall" value={filters.sareeMall} changeHandler={handleFilterChange} />
              <CheckBoxInput name="sareeShop" label="Saree Shop" value={filters.sareeShop} changeHandler={handleFilterChange} />
            </div>
            <div>
              <SelectInput name="sort" label="Sort by" options={sortOptions} value={filters.sort} changeController={handleFilterChange} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </AppBar>
      <div className="layout">
        <div className="grid-container">{Products}</div>
        <div className="filter-drawer">
          <div className="button-container">
            <Button onClick={() => setOpenDrawer("Sort")} startIcon={<SwapVertIcon />}>
              Sort
            </Button>
            <Drawer anchor="right" open={openDrawer && openDrawer === "Filter"} onClose={() => setOpenDrawer(undefined)}>
              <div className="drawer-filters">
                <Typography fontWeight={500}>Filters :</Typography>
                <SelectInput name="febric" label="Febric" options={febrics} value={filters.febric} changeController={handleFilterChange} />
                <SelectInput name="supplier" label="Supplier" options={suppliers} value={filters.supplier} changeController={handleFilterChange} />
                <CheckBoxInput name="sareeMall" label="Saree Mall" value={filters.sareeMall} changeHandler={handleFilterChange} />
                <CheckBoxInput name="sareeShop" label="Saree Shop" value={filters.sareeShop} changeHandler={handleFilterChange} />
              </div>
            </Drawer>
          </div>
          <div className="divider"></div>
          <div className="button-container">
            <Button onClick={() => setOpenDrawer("Filter")} startIcon={<TuneIcon />}>
              Filter
            </Button>
            <Drawer anchor="right" open={openDrawer && openDrawer === "Sort"} onClose={() => setOpenDrawer(undefined)}>
              <div className="drawer-filters">
                <SelectInput name="sort" label="Sort by" options={sortOptions} value={filters.sort} changeController={handleFilterChange} />
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  )
}
