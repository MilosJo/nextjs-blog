import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/Date'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'


import utilStyles from '../styles/utils.module.css'

export default function Home ({ allPostsData, allCatsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>[via Markdown]</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/blog/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>[via API]</h2>
        <ul className={utilStyles.list}>
          {allCatsData.all.slice(0, 5).map(({ _id, text }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/blog/posts/${_id}`}>
                <a>{text}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString="2020-11-19" />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <div style={{ height: 50 }} />
      <section className={utilStyles.headingMd}>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  const apiUrl = 'https://cat-fact.herokuapp.com/facts';
  const data = await fetch(apiUrl);
  const allCatsData = await data.json();

  return {
    props: {
      allPostsData,
      allCatsData,
    }
  }
}