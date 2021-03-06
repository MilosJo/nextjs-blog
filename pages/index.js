import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/Date'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData } from '../lib/posts'


import utilStyles from '../styles/utils.module.css'

export default function Home ({ allPostsData, allCatsData, allUsers }) {
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
          {allUsers.map((user, index) => (
            <li className={utilStyles.listItem} key={index}>
              <Link href={`/blog/users/${user}`}>
                <a>{user}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString="2020-11-24" />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>
          [via External Source]
          <br />
          <span style={{ fontSize: 18 }}>stress test(~300 results)</span>
        </h2>
        <ul className={utilStyles.list}>
          {allCatsData.all.map(({ _id, text }) => (
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

  const res = await fetch('https://gist.githubusercontent.com/MilosJo/d614447b753d620f9c6ba6f2e6c0ef78/raw/75500c9c961f848717a8cfb04d25aafec64dd068/users.json');
  const { allUsers } = await res.json();

  return {
    props: {
      allPostsData,
      allCatsData,
      allUsers,
    }
  }
}