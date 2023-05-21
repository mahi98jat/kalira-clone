import React, { FC, useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { ProductDetails } from "interface"
import { GetWindowDimensions } from "utils/helpers"
import "./index.css"

type ProductCardProps = {
  data: ProductDetails
  onClick: (productId: number) => void
}
const ProductCard: FC<ProductCardProps> = ({ data, onClick }) => {
  const { width } = GetWindowDimensions()

  function getImageSource() {
    return imageSize(width) === "sm" ? data.primaryImage.jpegImages.sImage : imageSize(width) === "md" ? data.primaryImage.jpegImages.mImage : data.primaryImage.webpImages.mImage
  }

  function imageSize(width: number) {
    if (width <= 768) {
      return "sm"
    } else if (width <= 1080) {
      return "md"
    } else {
      return "lg"
    }
  }

  return (
    <div className="grid-item" onClick={() => onClick(data.id)}>
      <div className="image-conatainer">
        <img src={getImageSource()} />
      </div>
      <div>
        <Typography color="CaptionText" fontWeight={500}>
          {data.name}
        </Typography>
        <Typography color="GrayText">{data.blouseFabric}</Typography>
      </div>
      <div className="prizing-section">
        <Typography fontWeight={500}>Rs. {data.listingPrice}</Typography>
        <Typography color="GrayText" fontSize={14} style={{ textDecoration: "line-through" }}>
          Rs. {data.mrp}
        </Typography>
        <Typography color="brown" fontSize={14}>{`(${data.discount}% OFF)`}</Typography>
      </div>
      <div>{data.isAvailable && data.availableQty < 10 ? <Typography color="brown"> Only Few Left!</Typography> : <Typography color="green">Available</Typography>}</div>
    </div>
  )
}

export default ProductCard
