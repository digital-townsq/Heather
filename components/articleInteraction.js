"use client"
import { useState, useEffect } from 'react';
import { firestore, auth } from "/config/firebase";
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, increment} from "@firebase/firestore";
import Fire from '../../public/fire';
import Snow from '../../public/snow';

const ArticleInteraction = ( { article } ) => {
  const [likes, setLikes] = useState(article.likes?.length || 0);
  const [dislikes, setDislikes] = useState(article.dislikes?.length || 0);
  const [isLiked, setIsLiked] = useState(false) 
  const [isDisliked, setIsDisliked] = useState(false);
  const articleRef = doc(firestore, "news", article.id)
  const userID = auth.currentUser.uid;

  const Checker = () => {
    // Check if the current user has liked the article
    if (article.likes.includes(userID)) {
      setIsLiked(true);
    } else { // Check if the current user has disliked the article
      if (article.dislikes.includes(userID)) {
        setIsDisliked(true);
      }
    }
    
  }

  

    const Update = async () => {
    try {
        const articleRef = doc(firestore, "news", article.id);
    // Set up a real-time listener for the specific document
        onSnapshot(articleRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setLikes(data.likes.length);
            setDislikes(data.dislikes.length);
            }
        });

        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
      Checker();
      }, []);

    useEffect( () => {
        Update();
    }, [article.id]);


    const Like = async () => {
      if (isLiked) {
          setIsLiked(false);

          await updateDoc(articleRef, {
            likes: arrayRemove(userID),
            score: increment(-1)
          })
        } else {
            if (isDisliked) {
                setIsDisliked(false);
                setIsLiked(true);

                await updateDoc(articleRef, {
                    dislikes: arrayRemove(userID),
                    likes: arrayUnion(userID),
                    score: increment(2)
                })
            } else {
                setIsLiked(true);
                await updateDoc(articleRef, {
                        likes: arrayUnion(userID),
                        score: increment(1)
                });
            }
        }
    }
  
    
  
  const Dislike = async () => {
    if (isDisliked) {
        // If already disliked, set isDisliked to false and remove user from dislikes
        setIsDisliked(false);
        
        await updateDoc(articleRef, {
            dislikes: arrayRemove(userID),
            score: increment(1)
        });
        
    } else {
        // If previously liked, set isLiked to false, set isDisliked to true, add user to dislikes, and remove user from likes
        if (isLiked) {
            setIsLiked(false);
            setIsDisliked(true);
            
            await updateDoc(articleRef, {
                likes: arrayRemove(userID),
                dislikes: arrayUnion(userID),
                score: increment(-2)
            });
        } else {
            // If not disliked, set isDisliked to true and add user to dislikes
            setIsDisliked(true);
            
            await updateDoc(articleRef, {
                dislikes: arrayUnion(userID),
                score: increment(-1)
            });
        }
    }
}

  return (
    <div className="flex md:flex-col mb-2">
    <button onClick={Dislike} className={`flex items-center text-white ${isDisliked ? 'bg-orange-500 hover:bg-orange-700' : 'bg-red-700 hover:bg-red-500'} p-2 m-2 rounded-full w-24`}>
        <span className="flex items-center">
          Dislike {dislikes}<Snow fill={`${isDisliked ? 'lightblue' : ''}`} />
        </span>
      </button>
      <button onClick={Like} className={`flex items-center text-white ${isLiked ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-700 hover:bg-blue-500'}  p-2 m-2 rounded-full w-24`}>
        <span className="flex items-center">
          Like {likes}<Fire classNamefill={`${isLiked ? 'orange' : ''}`} />
        </span>
      </button>
    </div>
  );
};

export default ArticleInteraction;
