import type { NextPage, GetServerSideProps } from 'next'

type ArticleT = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

interface ArticleDetailProps {
  article: ArticleT
}

const ArticleDetail: NextPage<ArticleDetailProps> = ({ article }) => {

  return (
    <>
      <h1>{article.title}</h1>
      <p> {article.body}</p>
    </>
  )
}

export default ArticleDetail;


export const getServerSideProps: GetServerSideProps<ArticleDetailProps> = async (context) => {
  const slug = context.params?.slug;
  
  // slug의 타입이... 너무 넓다! (string 이어야 하고... string[], undefined 같은 거는 허용 안 해야 하는데)
  const res = await fetch(`https://api.realworld.io/api/articles/` + slug)
  const { article }: ArticleDetailProps = await res.json();

  return {
    props: { article }, // will be passed to the page component as props
  }
}