import axios from 'axios';


const fetchNewsData = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
        try {
            const response = await axios.get(NEWS_API_URL, {
                params: {
                    apiKey: API_KEY,
                    country: 'us',
        },
        });

        const newsData = response.data.articles.filter(article => article.urlToImage);

        return newsData;

    } catch (error) {
        console.error('Error fetching news data:', error);
        return [];
    }

;}

export default fetchNewsData;