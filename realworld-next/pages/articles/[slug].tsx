import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'

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
  author: ProfileT;
}

type CommentT = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: ProfileT;
}

type ProfileT = {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}

type MultipleCommentResponse = {
  comments: CommentT[]
}

interface ArticleDetailProps {
  article: ArticleT,
  comments: CommentT[]
}

const ArticleDetail: NextPage<ArticleDetailProps> = ({ article, comments }) => {

  return (
    <>
      <h1>{article.title}</h1>
      <p> {article.body}</p>

      <ul>
        {comments.map(comment => <li key={comment.id}>
          <h3>{comment.author.username}</h3>
          <p>{comment.body}</p>
        </li>)}
      </ul>
    </>
  )
}

export default ArticleDetail;

// /articles/:slug
// react-router-dom
type ArticleDetailParams = {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<ArticleDetailParams> = async () => {
  return {
    paths: [
      { params: { slug: "Create-a-new-implementation-1" } },
      { params: { slug: "Explore-implementations-1" } },
      { params: { slug: "Welcome-to-RealWorld-project-1" } }
    ],
    fallback: false // false or 'blocking'
  };
}

// "/articles/:slug"
export const getStaticProps: GetStaticProps<ArticleDetailProps, ArticleDetailParams> = async (context) => {
  const { slug } = context.params!;

  // slug의 타입이... 너무 넓다! (string 이어야 하고... string[], undefined 같은 거는 허용 안 해야 하는데)
  
  //  /articles/{slug}:
  const { article } = await fetch(`https://api.realworld.io/api/articles/${slug}`)
    .then(res => res.json());
  //  /articles/{slug}/comments:
  const { comments } = await fetch(`https://api.realworld.io/api/articles/${slug}/comments`)
    .then(res => res.json());
  
  return {
    props: { article, comments }, // will be passed to the page component as props
  }
}