import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ArrowBack, FavoriteBorderOutlined } from "@mui/icons-material"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { AppBar, BottomNavigation, Button, Paper, Typography } from "@mui/material"
import { ProductDetails } from "interface"
import { GetWindowDimensions } from "utils/helpers"
import { collections } from "../../data/collection"
import "./index.css"

export const Details = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { width } = GetWindowDimensions()

  const [productDetails, setProductDetails] = useState<ProductDetails>()

  useEffect(() => {
    setProductDetails(collections.find((product) => product.id === Number(id)))
  }, [])

  function getImageSource() {
    if (productDetails) return getImageSize(width) === "jpeg" ? productDetails.primaryImage.jpegImages.mImage : productDetails.primaryImage.webpImages.lImage
    return ""
  }

  function getImageSize(width: number) {
    return width <= 768 ? "jpeg" : "web"
  }

  const navigateBack = () => {
    navigate(`/`)
  }

  return productDetails ? (
    <div className="root">
      <AppBar variant="elevation" color="inherit">
        <div className="app-bar">
          <Button variant="text" onClick={navigateBack} color="inherit">
            <ArrowBack />
          </Button>
          <Typography color="secondary" fontWeight={600}>
            {productDetails?.name}
          </Typography>
        </div>
      </AppBar>
      <div className="container">
        <div className="image-container">
          <img src={getImageSource()} />
        </div>
        <div className="details-container">
          <div>
            <Typography color="CaptionText" fontWeight={500}>
              {productDetails.name}
            </Typography>
            <Typography color="GrayText">{productDetails.blouseFabric}</Typography>
          </div>
          <div className="prizing-section">
            <Typography fontWeight={500}>Rs. {productDetails.listingPrice}</Typography>
            <Typography color="GrayText" fontSize={14} style={{ textDecoration: "line-through" }}>
              Rs. {productDetails.mrp}
            </Typography>
            <Typography color="brown" fontSize={14}>{`(${productDetails.discount}% OFF)`}</Typography>
          </div>
          <div>{productDetails.isAvailable && productDetails.availableQty < 10 ? <Typography color=""> Only Few Left!</Typography> : <Typography>Available</Typography>}</div>

          {width > 768 ? (
            <div className="button-group">
              <Button variant="outlined" color="secondary" startIcon={<FavoriteBorderOutlined />}>
                WISHLIST
              </Button>
              <Button variant="contained" color="primary" startIcon={<ShoppingBagIcon />}>
                ADD TO BAG
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {width <= 768 ? (
        <BottomNavigation className="bottom-navigation">
          <Button variant="outlined" color="secondary" size="large" startIcon={<FavoriteBorderOutlined />}>
            WISHLIST
          </Button>
          <Button variant="contained" color="primary" size="large" startIcon={<ShoppingBagIcon />}>
            ADD TO BAG
          </Button>
        </BottomNavigation>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div>Loading ...</div>
  )
}
