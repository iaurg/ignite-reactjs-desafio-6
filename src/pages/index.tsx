import { ReactElement } from 'react';
import { GetStaticProps } from 'next';

import Link from 'next/link';

import { getPrismicClient } from '../services/prismic';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Header from '../components/Header';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link key="x" href="/posts/">
            <a>
              <strong>Como utilizar hooks</strong>
              <p>Pensando em sincronização</p>
              <time>15 Mar 2021</time>
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  // const postsResponse = await prismic.query(TODO);
  return {
    props: {},
  };
};
