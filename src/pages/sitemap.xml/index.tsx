import { GetServerSideProps } from 'next'
import getAllProducts from '@/services/products/get-all-products'
import getAllUsers from '@/services/users/get-all-users'
import type { ApiContext } from '@/types'

const SiteMap = () => null

type SitemapInfo = {
  path: string
  lastmod?: Date
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
}

const StaticPagesInfo: SitemapInfo[] = [
  {
    path: '/',
    changefreq: 'hourly',
    priority: 1.0,
  },
  {
    path: '/search',
    changefreq: 'always',
    priority: 1.0,
  },
  {
    path: '/signin',
    changefreq: 'daily',
    priority: 0.5,
  },
]

const getProductPagesInfo = async (): Promise<SitemapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const products = await getAllProducts(context)

  return products.map((product) => ({
    path: `/products/${product.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

const getUserPagesInfo = async (): Promise<SitemapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const users = await getAllUsers(context)

  return users.map((user) => ({
    path: `/users/${user.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

const generateSitemapXML = (baseURL: string, sitemapInfo: SitemapInfo[]) => {
  const urls = sitemapInfo.map((info) => {
    const children = Object.entries(info)
      .map(([key, value]) => {
        if (!value) return null

        switch (key) {
          case 'path':
            return `<loc>${baseURL}${value}</loc>`
          default:
            return `<${key}>${value}</${key}>`
        }
      })
      .filter((child) => child !== null)

    return `<url>${children.join('\n')}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n',
  )}</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const host = req?.headers?.host ?? 'localhost'
  const protocol = req.headers['x-forwarded-proto'] ? 'https' : 'http'

  const base = `${protocol}://${host}`
  const sitemapInfo = [
    ...StaticPagesInfo,
    ...(await getProductPagesInfo()),
    ...(await getUserPagesInfo()),
  ]

  const sitemapXML = generateSitemapXML(base, sitemapInfo)
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemapXML)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
