import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    // Extract excerpt from content
    const excerpt = extractExcerpt(matterResult.content)

    return {
      id,
      excerpt,
      ...(matterResult.data as { date: string; title: string; category: string })
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown syntax
  const cleanContent = content
    .replace(/^#+\s+/gm, '') // Remove heading markers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with just the text
    .replace(/`{1,3}[^`\n]+`{1,3}/g, '') // Remove inline code
    .replace(/^>.*$/gm, '') // Remove blockquotes
    .replace(/^\s*[-*+]\s+/gm, '') // Remove list markers
    .trim()

  // Split into words and build excerpt
  const words = cleanContent.split(/\s+/)
  let excerpt = ''
  let currentLength = 0

  for (const word of words) {
    if (currentLength + word.length + 1 > maxLength) {
      excerpt += '...'
      break
    }
    if (excerpt) excerpt += ' '
    excerpt += word
    currentLength += word.length + 1
  }

  // Add ellipsis if we didn't use all words
  if (excerpt.length < cleanContent.length) excerpt += '...'

  return excerpt
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; category: string })
  }
}