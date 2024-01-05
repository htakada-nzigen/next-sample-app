import Link from 'next/link'
import { Fragment } from 'react'
import ProductCard from '@/components/organisms/ProductCard'
import ProductCardList from '@/components/organisms/ProductCardList'
import useSearch from '@/services/products/use-search'
import { ApiContext, Product } from '@/types'

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface UserProductCardListContainerProps {
  userId: number
  products?: Product[]
}

const UserProductCardListContainer = ({
  userId,
  products,
}: UserProductCardListContainerProps) => {
  const { products: userProducts } = useSearch(context, {
    userId,
    initial: products,
  })

  return (
    <ProductCardList numberPerRow={6} numberPerRowForMobile={2}>
      {userProducts.map((product) => (
        <Fragment key={product.id}>
          <Link href={`/products/${product.id}`} passHref>
            <ProductCard
              variant="small"
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Link>
        </Fragment>
      ))}
    </ProductCardList>
  )
}

export default UserProductCardListContainer
