import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';

export default function FirstPost() {
  return (
     <Layout>
      <Head>
        <title>Blocked</title>
      </Head>
        <h1>You are blocked from viewing this page</h1>
       <h2>
         <Link href="/">Back to home</Link>
       </h2>
     </Layout>
   );
}
