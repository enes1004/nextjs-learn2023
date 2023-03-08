import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

export async function getServerSideProps(context) {
  const allPostsData = await getSortedPostsData();
  const data=JSON.parse(JSON.stringify(allPostsData));;
  console.log(data);
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data,context }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Lorem Ipsum tests preview function on vercel</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
       <h2 className={utilStyles.headingLg}>Blog</h2>
       <ul className={utilStyles.list}>
         {data.map(({ id, date, title }) => (
           <li className={utilStyles.listItem} key={id}>
             <Link href={`/posts/${id}`}>{title}</Link>
             <br />
             <small className={utilStyles.lightText}>
               <Date dateString={date} />
             </small>
           </li>
         ))}
       </ul>
     </section>
    </Layout>
  );
}