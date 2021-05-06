import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  uid: string;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const readingTime = post.data.content.reduce((acc, obj) => {
    const bodyText = RichText.asText(obj.body);

    const textLength = bodyText.split(/\s/g).length;

    const time = Math.ceil(textLength / 200);

    return acc + time;
  }, 0);

  return (
    <>
      <Header />
      <div className={styles.image}>
        <img src={post.data.banner.url} alt="Post" />
      </div>
      <main className={commonStyles.container}>
        <article className={commonStyles.post}>
          <h1>{post.data.title}</h1>
          <div className={commonStyles.details}>
            <span>
              <FiCalendar className={commonStyles.icon} />
              {format(new Date(post.first_publication_date), 'dd LLL yyyy', {
                locale: ptBR,
              })}
            </span>
            <span>
              <FiUser className={commonStyles.icon} />
              {post.data.author}
            </span>
            <span>
              <FiClock className={commonStyles.icon} />
              {readingTime} min
            </span>
          </div>

          {post.data.content.map(({ heading, body }, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={styles.content}>
              <h1>{heading}</h1>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `${RichText.asHtml(body)}`,
                }}
              />
            </div>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: ['publication.uid'],
    }
  );

  const prefetch = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths: prefetch,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const content = response.data.content.map(({ heading, body }) => {
    return {
      heading,
      body,
    };
  });

  const post = {
    first_publication_date: response.first_publication_date,
    uid: response.uid,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content,
    },
  };
  return {
    props: {
      post,
    },
  };
};
