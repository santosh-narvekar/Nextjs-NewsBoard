import NewsArticleGrid from '@/components/NewsArticleGrid';
import { NewsArticle } from '@/models/NewsArticles';
import Head from 'next/head';
import React, { FormEvent, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

function Search() {

  // handling state on client
  const [searchResult,setSearchResults] = useState<NewsArticle[] | null>(null);

  const [searchResultsLoading,setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError,setSearchResultLoadingIsError] = useState(false);
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>){ 
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get(`searchQuery`)?.toString().trim();
   
    if(searchQuery) {
      try{
        setSearchResults(null);
        setSearchResultLoadingIsError(false);
        setSearchResultsLoading(true);

        const response = await fetch(`/api/search-news?q=${searchQuery}`);
        //const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);

        const articles:NewsArticle[] = await response.json();
        setSearchResults(articles);
      }catch(err){
        console.error(err);
        setSearchResultLoadingIsError(true);
      }finally{
        setSearchResultsLoading(false);
      }
    }


  }

  return (
    <>
      <Head>
        <title key={"title"}>Search News - NextJs News App</title>
      </Head>
      <h1>Search News</h1>
     
      <Alert>
        This is page uses <strong>client-side data fetching</strong> to show fresh data for every search. Requests are handled by our backend via <strong>API routes.</strong>
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='search-input'>
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            name='searchQuery'
            placeholder='E.g. politics,sports...'
          />
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={searchResultsLoading}  >
          Search
        </Button>
      </Form>
      
      <div className="d-flex flex-col align-items-center">
        {
          searchResultsLoading && <Spinner animation='border' />
        }
        {
          searchResultsLoadingIsError && <p>Something went wrong. Please try again.</p>
        }
        {
          searchResult?.length === 0 && <p>Noting found.Try a different query</p>
        }
        {
          searchResult && <NewsArticleGrid articles={searchResult} />
        }
      </div>
    </>
  )
}

export default Search
