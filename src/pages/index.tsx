import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
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

const mapResults = array =>
  array.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd LLL yyyy',
        { locale: ptBR }
      ),
      data: {
        title: post.data.title,
        author: post.data.author,
        subtitle: post.data.subtitle,
      },
    };
  });

export default function Home({ postsPagination }: HomeProps) {
  const [results, setResults] = useState<Post[]>(() => {
    return postsPagination.results;
  });

  const [nextPage, setNextPage] = useState(() => {
    return postsPagination.next_page;
  });

  function handleLoadMorePosts() {
    fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => {
        setNextPage(data.next_page);
        const posts = mapResults(data.results);
        setResults([...results, ...posts]);
      });
  }

  return (
    <>
      <Header />
      <main className={commonStyles.container}>
        {results.map(post => (
          <div className={commonStyles.post}>
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.details}>
                  <span>
                    <FiCalendar className={commonStyles.icon} />
                    <time>{post.first_publication_date}</time>
                  </span>
                  <span>
                    <FiUser className={commonStyles.icon} />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        ))}

        {nextPage && (
          <div className={styles.loadMore}>
            <button type="button" onClick={handleLoadMorePosts}>
              Carregar mais posts
            </button>
          </div>
        )}
      </main>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 1,
    }
  );

  const posts = mapResults(postsResponse.results);

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
  };
};
