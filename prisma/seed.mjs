import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const postsDirectory = path.join(process.cwd(), 'posts');

async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const parseFile= async (fileName)=>{
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    var data={
      ...matterResult.data,
    };

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    data.content = processedContent.toString();

    // Combine the data with the id

    data.slug=id;
    data.date=new Date(data.date);
    return data;
  };
  return fileNames.map( async (i)=>{
    var a= await parseFile(i);
    return a;
  });

}

async function main() {
  console.log(`Start seeding ...`)
  var data=await getSortedPostsData("slug");
  data.map( async (i)=>prisma.post.create({data:await i}));
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
