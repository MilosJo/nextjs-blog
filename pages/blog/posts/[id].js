import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'

import Layout from '../../../components/Layout';
import Date from '../../../components/Date';

import { getAllPostIds, getPostData } from '../../../lib/posts'

export default function Post ({ postData }) {
  const { title, date, contentHtml } = postData;
  
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const postPaths = getAllPostIds();

  const apiUrl = 'https://cat-fact.herokuapp.com/facts';
  const data = await fetch(apiUrl);
  const allCatsData = await data.json();
  const catPaths = allCatsData.all.slice(0, 5).map(item => {
    return {
      params: {
        id: item._id,
      },
    };
  });


  return {
    paths: [...postPaths, ...catPaths],
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  
  return {
    props: {
      postData,
    }
  };
};