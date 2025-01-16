import { useState} from "react"
import Image from "next/image";
import digitaltown from '/public/assets/images/digitaltown.png';
import Link  from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/config/firebase";
import {useRouter} from "next/router";


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();
    
    const handleLogin = async () => {
      if (username && password) {
        try {
          await signInWithEmailAndPassword(auth, username, password);
          console.log('Logged in successfully');
          setErrorMessage(null);
          router.push("/");
        } catch (error) {
          console.error('Error logging in:', error.message);
          setErrorMessage(error.message);
        }
        
      } else {
        console.log('Please enter a username and password');
      }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <Image src={digitaltown} width={300} height={200} className="rounded mb-4"alt="DigitalTownSq"></Image>

        <div className="drop-shadow-lg Rolleston text-2xl font-medium static flex flex-col items-center justify-center">
  <div className="mb-4">
    <input 
      type="text"
      placeholder="Email"
      value={username}
      onChange={e => setUsername(e.target.value)}
      className="border border-black p-2 rounded"
    />
  </div>
  <div className="mb-4">
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      className="border border-black p-2 rounded "
    />
  </div>
  <button className="bg-[#003E5D] hover:bg-[#0575AF] font-normal text-white px-4 py-2 rounded-full " onClick={handleLogin}>Login</button>
</div>
<div className="text-sm flex items-center justify-center">
      <p className="mr-2">Don&apos;t have an account?</p>
      <Link className="text-sm text-blue-500 underline"href="/register">Sign Up</Link>


</div >

      </div>
      </div>
    )
}
export default LoginPage;