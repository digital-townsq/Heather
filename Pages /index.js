"use client"
import LoginPage from "./loginpage";
import Home from "../config/home";
import { metadata} from "./layout"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "/config/firebase";
import { useState, useEffect } from "react";
import digitaltown from '/public/assets/images/digitaltown.png';
import Image from "next/image";


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const handleLogout = async () => {
      try {
        await signOut(auth);
        window.location.reload();
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
      return (
        <div className="flex justify-center items-center h-screen mt-[-117px]">
          <div>
        <Image src={digitaltown} width={300} height={200} className="rounded mb-4" alt="DigitalTownSq" />
        </div>
        </div>
      );
    }
  return (
    <>
    {isAuthenticated ? 
    (<>
    <button onClick={handleLogout}
    className="absolute top-12 right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 px-4 py-2 bg-[#003E5D] hover:bg-[#0575AF] rounded-full text-white " >
    Logout</button>
    <Home/>
    </>)
    :
    (<LoginPage/>)}
    </>
  )
}

export default App;