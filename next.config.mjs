import nextMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  outputFileTracingIncludes: {
    '/articles/*': ['./src/app/articles/**/*.mdx'],
  },
  async redirects() {
    return [
      { source: '/2008/08/troubleshooting-smtp', destination: '/articles/troubleshooting-smtp', permanent: true },
      { source: '/2016/09/the-only-important-rule-of-the-scrum-process.', destination: '/articles/the-only-important-rule-of-the-scrum-process', permanent: true },
      { source: '/2017/03/updating-all-lxd-containers', destination: '/articles/updating-all-lxd-containers', permanent: true },
      { source: '/2017/03/terminating-torrents', destination: '/articles/terminating-torrents', permanent: true },
      { source: '/2017/07/things-i-believe', destination: '/articles/things-i-believe', permanent: true },
      { source: '/2020/07/things-i-believe', destination: '/articles/things-i-believe', permanent: true },
      { source: '/2017/07/drawing-a-network-diagram', destination: '/articles/drawing-a-network-diagram', permanent: true },
      { source: '/2017/09/how-to-pick-a-password', destination: '/articles/how-to-pick-a-password', permanent: true },
      { source: '/2018/07/free-software', destination: '/articles/free-software', permanent: true },
      { source: '/2018/07/gdpr-wrong', destination: '/articles/gdpr-wrong', permanent: true },
      { source: '/page/about', destination: '/about', permanent: true },
      { source: '/index.xml', destination: '/feed.xml', permanent: true },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['@mapbox/rehype-prism'],
  },
})

export default withMDX(nextConfig)
