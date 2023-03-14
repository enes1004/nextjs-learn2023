import Layout from '../../components/layout';
import { getAllPostIds, getPostData,getPostDataForCaching,getAllPostIdsForCaching } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useContentGroupAuth,useContentAuthorAuth,authByApi } from "../../auth/authorize"
import { authOptions } from '../api/auth/[...nextauth]'
import { useSession } from "next-auth/react"
import { useState,useEffect } from "react";

// export async function getServerSideProps(info){
//   console.log(info);
//   return {props:{}};
// }

export default function Post({ postData }) {
  const session=useSession();
  const [hideContent,setHideContent]=useState(false);

  const can_see_by_content_group=useContentGroupAuth(postData?.content_group_id,session?.data?.user);
  const can_see_by_author=useContentAuthorAuth(postData?.user_id,session?.data?.user);
  useEffect(()=>{
    if(session && session.status!="loading"){
      if(!can_see_by_author && !can_see_by_content_group){
        setHideContent(true);
      }
      console.log("api_auth",authByApi(postData.id,session));
    }
  },[session]);

  return <Layout>
      <Head>
        <title>{postData?.title + " / " + postData?.slug}</title>
      </Head>
      {hideContent?
        <div className={utilStyles.lightText}>Not authorized</div>
        :
      <>
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <div className={utilStyles.lightText}>
        By {(postData?.author?.name)??"Anonymous"}
      </div>
      <div className={utilStyles.lightText}>
        {postData?<Date dateString={postData.created_at} />:null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />
      </>
      }
      <div>{JSON.stringify(session.data)}</div>
  </Layout>;
}


export async function getStaticPaths() {
  console.log("get again getAllPostIdsForCaching");
  const paths = await getAllPostIdsForCaching();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log("get again getPostDataForCaching");

  const postData = await getPostDataForCaching(params.id);
  // const session= JSON.parse(JSON.stringify(await getServerSession(req, res, authOptions)))
  return {
    props: {
      postData,
      // session,
    },
  };
}

// export async function getServerSideProps({ params,req,res }) {
//   console.log("get again getPostDataForCaching");
//   const postData = await getPostDataForCaching(params.id);
//   const session= JSON.parse(JSON.stringify(await getServerSession(req, res, authOptions)))
//   return {
//     props: {
//       postData,
//       session,
//     },
//   };
// }
