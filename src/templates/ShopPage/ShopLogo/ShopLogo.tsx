import React from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

import { WrapLogoSt, WrapAddressSt, TitleSt, SpanSt } from "./ShopLogo.css"

interface IshopInfo {
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
  shopInfo: IshopInfo
}

const ShopLogo: React.FC<IshopLogoProps> = ({ shopInfo }) => {
  // const image = getImage(shopinfo.logo) as IGatsbyImageData
  const { shopName, address, email, phone, street, cityCode, city } = shopInfo
  return (
    <WrapLogoSt>
      <WrapAddressSt>
        <TitleSt> {shopName} </TitleSt>
        <SpanSt>{address}</SpanSt>
      </WrapAddressSt>
      {shopInfo?.logo ? (
        <GatsbyImage
          image={getImage(shopInfo.logo) as IGatsbyImageData}
          alt="Image"
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
