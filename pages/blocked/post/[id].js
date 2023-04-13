import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../../components/layout';
import { getAllPostIdsForCaching, getPostDataForBlocked } from '../../../lib/post';
import PurchButton from '../../../components/purch_button';

export default function Blocked({contentGroup}) {
  return (
     <Layout>
      <Head>
        <title>Blocked</title>
      </Head>
        <h2>You are blocked from viewing this page</h2>
        <Link href="/"><PurchButton>Need to buy {contentGroup?.description}</PurchButton></Link>
        <h2>
         <Link href="/">Back to home</Link>
        </h2>
     </Layout>
   );
}

export async function getStaticProps({params}){
  const contentGroup = await getPostDataForBlocked(params.id);
  return {
    props:{
      contentGroup
    }
  }
}

export async function getStaticPaths(){
  const paths = await getAllPostIdsForCaching();
  return {
    paths,
    fallback: false,
  };

}