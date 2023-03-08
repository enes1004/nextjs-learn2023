import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return <Layout>
      <Head>
        <title>{postData?.title + " / " + postData?.slug}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{postData?.title}</h1>
      <div className={utilStyles.lightText}>
        {postData?<Date dateString={postData.date} />:null}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />

  </Layout>;
}


export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
