import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getPostData, getAllPostIds } from '@/lib/posts'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((path) => ({
    slug: path.params.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const postData = await getPostData(params.slug)
  return {
    title: postData.title,
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug)

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Link href="/posts" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      <article className="prose dark:prose-invert max-w-none">
        <h1>{postData.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <Badge variant="secondary">{postData.category}</Badge>
          <span className="text-sm text-muted-foreground">{postData.date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  )
}