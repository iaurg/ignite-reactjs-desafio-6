import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
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
      <main className={commonStyles.container}>
        <div className={commonStyles.post}>
          <Link key="x" href="/post/teste">
            <a>
              <strong>Como utilizar hooks</strong>
              <p>Pensando em sincronização</p>
              <div className={commonStyles.details}>
                <time>
                  <FiCalendar className={commonStyles.icon} />
                  15 Mar 2021
                </time>
                <span>
                  <FiUser className={commonStyles.icon} />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
        </div>

        <div className={commonStyles.post}>
          <Link key="x" href="/post/teste">
            <a>
              <strong>Como utilizar hooks</strong>
              <p>Pensando em sincronização</p>
              <div className={commonStyles.details}>
                <time>
                  <FiCalendar className={commonStyles.icon} />
                  15 Mar 2021
                </time>
                <span>
                  <FiUser className={commonStyles.icon} />
                  Joseph Oliveira
                </span>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.loadMore}>
          <a href="x">Carregar mais posts</a>
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
