import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// slug 란... title 같은 유의미한 정보를... 사용자나 검색엔진이 볼 수 있게
// 특수 문자는 제거하고, 띄어쓰기는 -로 바꿔서...
// url에 사용하는 거!
type ArticleT = {
  slug: string;
  title: string;
  description: string;
}

interface CardItemProps {
  article: ArticleT,
}

const CardItem = ({ article }: CardItemProps) => {
  return (
    <li>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
    </li>
  )
}

interface HomeProps {
  data: {
    articles: ArticleT[];
    articlesCount: number;
  }
}

const Home: NextPage<HomeProps> = ({ data }) => {
  // 헤더 메뉴내브바 만들기 
  // h1 
  // 글로벌 피드 탭 바
  // 리스트... 글 카드 컴포넌트 만들기
  // 태그 목록 

  const { articles, articlesCount } = data;

  return (
    <div className={styles.container}>
      <Head>
        <title>리얼월드 넥스트</title>
        <meta name="description" content="리얼월드의 넥스트 앱" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>conduit
        A place to share your knowledge.</h1>
        <ul>
          {articles.map((article) => (
            <CardItem key={article.slug} article={article}/>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  // https://api.realworld.io/api/articles?limit=10&offset=0
  
  const res = await fetch(`https://api.realworld.io/api/articles?limit=10&offset=0`)
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  }
}