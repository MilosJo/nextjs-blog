import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

async function getCatFact(id) {
  const apiUrl = `https://cat-fact.herokuapp.com/facts/${id}`;
  const data = await fetch(apiUrl);
  return data.json();
}

function postTemplate(fact) {
  return [
    `---`,
    `title: "${fact.text.replace(/\"/g, '\\\"')}"`,
    `date: '${fact.createdAt}'`,
    `---`,
  ].join('\n');
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  let fileContents = null;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8')
  } catch (e) {
    const postData = await getCatFact(id);
    fileContents = postTemplate(postData);
    // fs.writeFileSync(fullPath, fileContents, 'utf8');
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}