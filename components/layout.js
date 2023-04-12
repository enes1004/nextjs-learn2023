import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';

const GlobalStyle = createGlobalStyle`
  a{
    ${props=>props?.theme?.link}
  }
  h1,h2,h3,h4,h5,h6,p,span,div{
    color:${props=>props?.theme?.color?.primary}
  }
`

const name = 'Enes';
export const siteTitle = 'Next.js Sample Website';
const LayoutBg=styled.div`
  background-color: ${props=>props?.theme?.bg?.secondary};
`;
const BodyBg=styled.div`
  background-color: ${props=>props?.theme?.bg?.primary};
`;

export default function Layout({ children, home,className }) {
  return (
  <BodyBg>
    <GlobalStyle/>
    <LayoutBg className={`${styles.container} ${className}` }>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </LayoutBg>
  </BodyBg>
  );
};
