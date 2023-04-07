import Layout from '../../components/layout';
import { getAllPostIds, getPostData,getPostDataForCaching,getAllPostIdsForCaching } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

// export async function getServerSideProps(info){
//   console.log(info);
//   return {props:{}};
// }

export default function Post({ postData }) {
  return <Layout>
      <Head>
        <title>{postData?.title + " / " + postData?.slug}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <div className={utilStyles.lightText}>
        By {(postData?.author?.name)??"Anonymous"}
      </div>
      <div className={utilStyles.lightText}>
        {postData?<Date dateString={postData.created_at} />:null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />
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
