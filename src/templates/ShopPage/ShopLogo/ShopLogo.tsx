import React from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

import { WrapLogoSt, WrapAddressSt, TitleSt, SpanSt } from "./ShopLogo.styles"
import { IShopInfo } from "src/store/shop/shop.types"

interface IShopInfoContenful {
  email: string
  address: string
  phone: string
  logo: IGatsbyImageData
  shopId: string
  shopName: string
  street?: string
  cityCode?: string
  city?: string
}
interface IshopLogoProps {
  shopInfoContenful?: IShopInfoContenful
  shopInfoMongoDB?: IShopInfo
}

const ShopLogo: React.FC<IshopLogoProps> = ({
  shopInfoContenful,
  shopInfoMongoDB,
}) => {
  // const image = getImage(shopinfo.logo) as IGatsbyImageData
  const { shopName, address, email, phone, street, cityCode, city } = {
    ...shopInfoContenful,
    ...shopInfoMongoDB,
  }
  return (
    <WrapLogoSt>
      <WrapAddressSt>
        <TitleSt> {shopName} </TitleSt>
        <SpanSt>{address}</SpanSt>
      </WrapAddressSt>
      {shopInfoContenful?.logo ? (
        <GatsbyImage
          image={getImage(shopInfoContenful.logo) as IGatsbyImageData}
          alt="bookable24.de Online Booking System"
        />
      ) : (
        <>
          <SpanSt>{`${street} ${cityCode} ${city}`}</SpanSt>
        </>
      )}
    </WrapLogoSt>
  )
}

export default ShopLogo
