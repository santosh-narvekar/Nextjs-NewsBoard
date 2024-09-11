import Head from "next/head";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import { Alert } from "react-bootstrap";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[]
}

export const  getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async() => {
  // artifical delay: await new Promise(r=>setTimeout(r,3000))
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`); 
  const newsResponse:NewsResponse = await response.json();
  return {
    
    props: {
      newsArticles:newsResponse.articles
    }
    
  }

}

export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  return (
    <>
        <Head>
          <title key="title" > Breaking News - NextJs News App </title>
        </Head>

        <main>
          <h1>Breaking News</h1>
          <Alert>
            This Page Uses GetServerSideProps to fetch data server-side on every request, This allows search engines to crawl the page content and improves SEO
          </Alert>
          {
            <NewsArticleGrid articles={newsArticles} />
          }
        </main>
    </>
  );
}
