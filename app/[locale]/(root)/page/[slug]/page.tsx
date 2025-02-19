import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import { getWebPageBySlug } from '@/lib/actions/web-page.actions'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { slug } = params

  const webPage = await getWebPageBySlug(slug)
  if (!webPage) {
    return { title: 'Web page not found' }
  }
  return {
    title: webPage.title
  }
}

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string; color?: string; size?: string }>
}) {
  const params = await props.params
  const { slug } = params
  const webPage = await getWebPageBySlug(slug)

  if (!webPage) notFound()

  // Await the searchParams to access its properties
  const searchParams = await props.searchParams
  const { page, color, size } = searchParams

  // You can now use page, color, and size as needed
  console.log('Page:', page)
  console.log('Color:', color)
  console.log('Size:', size)

  return (
    <div className="p-4 max-w-3xl mx-auto mt-40 md:mt-28">
      <h1 className="h1-bold py-4">
        {webPage.title}
      </h1>
      <section className="text-justify text-lg mb-20 web-page-content">
        <ReactMarkdown>
          {webPage.content}
        </ReactMarkdown>
      </section>
    </div>
  )
}
