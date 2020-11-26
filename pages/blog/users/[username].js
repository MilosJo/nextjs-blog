import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'

import Layout from '../../../components/Layout';

export default function Post ({ result, ...props }) {
  const { name, company } = result;

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{name} works at {company}</h1>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch('https://gist.githubusercontent.com/MilosJo/d614447b753d620f9c6ba6f2e6c0ef78/raw/75500c9c961f848717a8cfb04d25aafec64dd068/users.json');
  const { allUsers } = await res.json();
  
  const paths = allUsers.map(username => {
    return {
      params: {
        username,
      },
    };
  });


  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const result = await fetch(`https://api.github.com/users/${params.username}`);
  
  return {
    props: {
      result: await result.json(),
    }
  };
};