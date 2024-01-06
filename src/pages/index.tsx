import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Text from '@/components/atoms/Text'
import Box from '@/components/layout/Box'
import Flex from '@/components/layout/Flex'
import ProductCard from '@/components/organisms/ProductCard'
import ProductCardCarousel from '@/components/organisms/ProductCardCarousel'
import Layout from '@/components/templates/Layout'
import getAllProducts from '@/services/products/get-all-products'
import { ApiContext, Product } from '@/types'
// import logger from '@/utils/logger'

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> = ({
  bookProducts,
  clothesProducts,
  shoesProducts,
}: HomePageProps) => {
  // logger.info('HomePageコンポーネントの描画関数内で呼ばれたログです')
  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductCardCarousel>
        {products.map((product: Product, i: number) => (
          <Box paddingLeft={i === 0 ? 0 : 2} key={product.id}>
            <Link href={`/products/${product.id}`} passHref>
              <ProductCard
                variant="small"
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                blurDataUrl={product.blurDataUrl}
              />
            </Link>
          </Box>
        ))}
      </ProductCardCarousel>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>Gihyo C2C</title>
        <meta
          name="description"
          content="Gihyo C2Cは実践的なNext.jsアプリケーション開発で使用されるデモアプリです"
        />
        <meta property="og:site_name" content="Gihyo C2C" />
        <meta property="og:title" content="Gihyo C2Cのトップページ" />
        <meta
          property="og:description"
          content="Gihyo C2Cは実践的なNext.jsアプリケーション開発で使用されるデモアプリです"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://next-sample-app-virid.vercel.app"
        />
        <meta
          property="og:image"
          content="https://pixabay.com/ja/photos/dj-%E8%A3%85%E7%BD%AE-%E9%9F%B3%E6%A5%BD-%E7%A5%9D%E8%B3%80%E4%BC%9A-8347229/"
        />
        <meta property="og:locale" content="ja_JP" />
      </Head>
      <Layout>
        <Flex padding={2} justifyContent="center" backgroundColor="primary">
          <Flex
            width={{ base: '100%', md: '1040px' }}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ base: 'column', md: 'row' }}
            padding={2}
          >
            <Box width="100%">
              <Text as="h1" marginBottom={0} color="white" variant="large">
                Gihyo C2Cで
              </Text>
              <Text as="h1" marginBottom={0} color="white" variant="large">
                お気に入りのアイテムを見つけよう
              </Text>
            </Box>
            <Box width="100%">
              <Text as="p" color="white" variant="medium">
                Gihyo
                C2Cは実践的なNext.jsアプリケーション開発で使われるデモアプリです。モックサーバを使用しています。
                ソースコードは
                <Text
                  as="a"
                  style={{ textDecoration: 'underline' }}
                  target="_blank"
                  href="https://github.com/gihyo-book/ts-nextbook-app"
                  variant="medium"
                  color="white"
                >
                  こちら
                </Text>
                のGithubからダウンロードできます。
              </Text>
              <Text as="p" color="white" variant="medium">
                このアプリはTypeScript/Next.jsで作成されており、バックエンドのモックAPIはjson-serverが使用されています。
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex paddingBottom={2} justifyContent="center">
          <Box
            paddingLeft={{ base: 2, md: 0 }}
            paddingRight={{ base: 2, md: 0 }}
            width={{ base: '100%', md: '1040px' }}
          >
            <Box marginBottom={3}>
              <Text as="h2" variant="large">
                トップス
              </Text>
              {renderProductCardCarousel(clothesProducts)}
            </Box>
            <Box marginBottom={3}>
              <Text as="h2" variant="large">
                本
              </Text>
              {renderProductCardCarousel(bookProducts)}
            </Box>
            <Box>
              <Text as="h2" variant="large">
                シューズ
              </Text>
              {renderProductCardCarousel(shoesProducts)}
            </Box>
          </Box>
        </Flex>
      </Layout>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // logger.info('getStaticProps内で呼ばれたログです')
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
    getAllProducts(context, { category: 'clothes', limit: 6, page: 1 }),
    getAllProducts(context, { category: 'book', limit: 6, page: 1 }),
    getAllProducts(context, { category: 'shoes', limit: 6, page: 1 }),
  ])

  return {
    props: {
      clothesProducts,
      bookProducts,
      shoesProducts,
    },
    revalidate: 60,
  }
}

export default HomePage
