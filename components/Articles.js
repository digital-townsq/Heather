import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from "@firebase/firestore"
import { firestore } from "/config/firebase";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const articlesRef = collection( firestore, 'news');
      const q = query(
        articlesRef,
        orderBy('score', 'desc'),
        );
      const snapshot = await getDocs(q);
      const filtered_articles = [];
      snapshot.forEach((doc) => {
        const article_data = doc.data();
        filtered_articles.push({...article_data});
        }
      )
    setArticles(filtered_articles);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [])

  return articles;

}

export default Articles;
