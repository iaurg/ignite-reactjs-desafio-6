import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
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

export default function Post() {
  return (
    <>
      <Header />
      <div className={styles.image}>
        <img src="https://source.unsplash.com/random" alt="Post" />
      </div>
      <main className={commonStyles.container}>
        <article className={commonStyles.post}>
          <h1>Criado um App do Zero</h1>
          <div className={commonStyles.details}>
            <span>
              <FiCalendar className={commonStyles.icon} />
              15 Mar 2021
            </span>
            <span>
              <FiUser className={commonStyles.icon} />
              Joseph Oliveira
            </span>
            <span>
              <FiClock className={commonStyles.icon} />4 min
            </span>
          </div>
          <h2>Grande sea</h2>
          <p>Conteudo do post vem aqui agora</p>
        </article>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
