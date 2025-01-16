"use client"
import { useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
        if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight) {
          callback();
        }
      };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

export default useInfiniteScroll;
