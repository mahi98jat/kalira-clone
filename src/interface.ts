export interface ProductDetails {
  id: number
  slug: string
  code: string
  productId: number
  name: string
  description: string
  blouseAttached: boolean
  blouseFabric: string
  sareeFabric: string
  mrp: number
  listingPrice: number
  discount: number
  isActive: boolean
  isAvailable: boolean
  supplierId: number
  supplierName: string
  availableQty: number
  primaryImage: {
    jpegImages: ImageInterface
    webpImages: ImageInterface
  }
}

export interface ImageInterface {
  lImage: string
  mImage: string
  sImage: string
  xsImage: string
}
