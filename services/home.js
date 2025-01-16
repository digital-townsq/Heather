"use client"

import { useEffect, useState, } from 'react';
import Articles from './components/Articles';
import logo from 'public/assets/images/logo.png';
import startBackgroundService from './services/BackgroundService';
import Image from 'next/image';
import useInfiniteScroll from './components/infiniteScroll';
import ArticleInteraction from './components/articleInteraction';
import { metadata } from '../pages/layout'
import OpeningHours from './openinghours';
import { auth } from '/config/firebase'


const Home = ( ) => {
  const [displayCount, setDisplayCount] = useState(9);
  const articles = Articles();
  const email = auth.currentUser.email;

  // Comment this out to turn off background service
  useEffect(() => {
    startBackgroundService();
  }, []);


  // const now = new Date();
  // const currentHour = now.getHours();

  // test off hours
  const currentHour = 8;

  // Check if the current hour is between 8 AM and 8 PM
  const isWithinValidTime = currentHour >= 8 && currentHour < 20;

  useInfiniteScroll(() => {
    setDisplayCount(prevCount => prevCount + 3);
  });


  const displayedArticles = articles.slice(0, displayCount);

  return (
    <>
    <p className='absolute top-2 right-4 sm:hidden md:hidden lg:block xl:block px-4 py-2 text-md'>{email}</p>
    <div className=" static flex justify-center">
          <Image src={logo} width={400} height={400} alt="DigitalTownSq"/>
        </div>
      {isWithinValidTime ? (
        <>
    <OpeningHours/>
    <div className="grid grid-cols-3 sm:grid-cols-1 md: grid-cols-3 gap-4 max-w-[1000px] mx-auto">
    {displayedArticles.map((article, index) => (
      <div key={index} className="rounded-lg border-solid border-2 border-black bg-transparent animate-fadeIn ">
      <div className="flex flex-col items-center mt-2 h-full">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <div className="h-16"> {/* Fixed height for title container */}
            <h1 className="text-sm font-bold">{article.title}</h1>
          </div>
          <div className="mt-2">
            <Image className="rounded-md object-cover" width={400} height={200} src={article.urlToImage} alt={article.title} />
          </div>
        </a>
        <p className="text-xs text-gray-600">{article.description}</p>
        <div className="mt-auto">
        <ArticleInteraction url={article.url} article={article} />
        </div>
      </div>
    </div>
    
      
    ))}
    </div>
    </>
     ) : (
      <>
      <OpeningHours/>
      
        <div className='w-full drop-shadow-lg Rolleston text-2xl font-medium static flex items-center justify-center'>In the meantime, checkout these in life experiences:</div>
      <div className="grid grid-cols-3 sm:grid-cols-1 md: grid-cols-3 gap-4 max-w-[1000px] mx-auto">
        <div className="rounded-lg border-solid border-2 border-black bg-transparent animate-fadeIn ">
        <div> I am an ad</div>
        </div>
      </div>
      </>
     ) }
  </>
  );
}
export default Home;