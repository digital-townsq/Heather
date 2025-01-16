import React, { useState, useEffect } from 'react';

const OpeningHours = () => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [validTime ,setValidTime] = useState(null);

  useEffect( () => {
    const interval = setInterval(() => {
      const now = new Date();
      const openTime = new Date();
      openTime.setHours(8, 0, 0); // Sets opening time to 8 AM
      const closingTime = new Date();
      closingTime.setHours(20, 0, 0); // Sets closing time to 8 PM

      if (now >= openTime && now < closingTime) {
        // Calculate remaining time until closing
        const diffInMillis = closingTime - now;
        const hours = Math.floor(diffInMillis / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((diffInMillis % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setRemainingTime(`${hours}:${minutes}:${seconds}`);
        setValidTime(true);
      } else {
        // Calculate time until opening at 8 AM next day
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1); //HOL- try to add a clock for closed screen//
        tomorrow.setHours(8, 0, 0);

        const diffInMillis = tomorrow - now;
        const hours = Math.floor(diffInMillis / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((diffInMillis % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setRemainingTime(`${hours}:${minutes}:${seconds}`);
        setValidTime(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {validTime === null ? ( // Check for null to display loading message
        <h1 className="w-full drop-shadow-lg Rolleston text-3xl font-medium static flex items-center justify-center">Getting hours..</h1>
      ) : validTime ? (
        <h1 className="w-full drop-shadow-lg Rolleston text-2xl font-medium static flex items-center justify-center">We will be open for another {remainingTime} hours</h1>
      ) : (
        <h1 className="w-full drop-shadow-lg Rolleston text-2xl font-medium static flex items-center justify-center">We&apos;ll be back open tomorrow at 8 AM</h1>
      )}
    </>
  );
};

export default OpeningHours;