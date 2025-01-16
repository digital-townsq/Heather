import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { firestore, updateDoc, doc } from '../firebase';


// Save news data to Firestore database in collection 'news' and set document id to url. Add fields for totalLikes, totalDislikes, and totalComments and set them to 0.
const saveNewsToFirestore = async (newsData) => {
    try {
        for (const news of newsData) {
            // Check if an article with the same URL already exists in the database
            const q = query(collection(firestore, 'news'), where('url', '==', news.url));
            const querySnapshot = await getDocs(q);
            
            
            
            if (!querySnapshot.empty) {
                console.log('Duplicate article already found, skipping: ', news.url);
            } else {
                const docRef = await addDoc(collection(firestore, 'news'), {
                    ...news,
                    score: 0,
                    likes: [],
                    dislikes: [],
                    // totalComments: 0,
                    timestamp: serverTimestamp(), // Add timestamp field
                });
                const articleRef = doc(firestore, 'news', docRef.id);
                await updateDoc(articleRef, {id: docRef.id});
            }
        }
    } catch (error) {
        console.error('Error adding document: ', error);
    }

};

export default saveNewsToFirestore