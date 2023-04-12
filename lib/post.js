/*
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
*/
import prisma from './prisma';

const api_path=process.env.NEXT_PUBLIC_LARAVEL_API;
import passport_client_auth from './passport_client_auth';

export async function getPostDataForCaching(id){
  const passport_axios=await passport_client_auth();
  return await passport_axios.get(`/post/data/${id}`).then(res=>res.data);
}

export async function getPostDataForBlocked(id){
  const passport_axios=await passport_client_auth();
  return await passport_axios.get(`/post/data/content_group/${id}`).then(res=>res.data);  
}

export async function getAllPostIdsForCaching(){
  const passport_axios=await passport_client_auth();
  const data=await passport_axios.get(`/post/data`).then(res=>res.data);
  return data.map((one) => {
    return {
      params: {
        id: one.id.toString(),
      },
    };
  });

}


export async function getSortedPostsDataForStatic() {
  const passport_axios=await passport_client_auth();
  return await passport_axios.get("/post/data").then(res=>res.data);
}


export async function getSortedPostsData() {
  /*
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  */

  // Prisma
  return await prisma.post.findMany({orderBy:{"date":"desc"}});
  // LARAVEL_API
  const res= await fetch(api_path+"/api/post",{});
  return await res.json();
}

export async function getAllPostIds() {
  // const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // /*
  // Prisma
  const data=await prisma.post.findMany({orderBy:{"date":"desc"},select:{id:true}});
  // */
  // LARAVEL_API
  /*
  const res= await fetch(api_path+"/api/post",{});
  const data=await res.json();
  */

  return data.map((one) => {
    return {
      params: {
        id: one.id.toString(),
      },
    };
  });
}

export async function getPostData(id) {
  /*
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
  */
  // prisma
  const data=await prisma.post.findFirst({where:{id:id?parseInt(id):null}});
  // LARAVEL_API
  /*
  const res= await fetch(`${api_path}/api/post/${id}`);
  const data=await res.json();
  */
  return JSON.parse(JSON.stringify(data));

}
