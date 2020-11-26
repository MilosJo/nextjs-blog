import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'

import Layout from '../../../components/Layout';
import Date from '../../../components/Date';

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

// export async function getStaticPaths() {
//   const res = await fetch('http://localhost:3000/api/get-all-posts');
//   const { posts } = await res.json();
//   const postPaths = posts.map((id) => {
//     return {
//       params: {
//         id,
//       },
//     };
//   });

//   const apiUrl = 'https://cat-fact.herokuapp.com/facts';
//   const data = await fetch(apiUrl);
//   const allCatsData = await data.json();
//   const catPaths = allCatsData.all.map(item => {
//     return {
//       params: {
//         id: item._id,
//       },
//     };
//   });


//   return {
//     paths: [...postPaths, ...catPaths],
//     fallback: false,
//   };
// };

export async function getServerSideProps({ params }) {
  const result = await fetch(`${process.env.SITE_ROOT}/api/post?id=${params.id}`);
  const { post } = await result.json();
  return {
    props: {
      postData: post,
    }
  };
};