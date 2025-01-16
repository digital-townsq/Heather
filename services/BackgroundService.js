
import fetchNewsData from '../data/newsAPI';
import saveNewsToFirestore from '../data/firestore';



// Function to fetch and upload data
const fetchDataAndUpload = async () => {
    try {
        const newsData = await fetchNewsData();
        await saveNewsToFirestore(newsData);
        console.log('Data fetched and uploaded successfully:');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// Start the background service
const startBackgroundService = () => {
    const FETCH_INTERVAL = 60 * 20 * 1000; // 20 minutes in milliseconds
    fetchDataAndUpload(); // Initial Call
    setInterval(fetchDataAndUpload, FETCH_INTERVAL);
};

export default startBackgroundService;