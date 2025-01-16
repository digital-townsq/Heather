import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import digitaltown from 'public/assets/images/digitaltown.png';
import { auth } from "/config/firebase";
import {useRouter} from "next/router";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const router = useRouter();

    const handleRegister = async () => {
        if (username && password && confirmPassword && password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, username, password);
                console.log('Registered successfully');
                router.push("/loginpage");
            } catch (error) {
                console.error('Error registering:', error.message);
            }
        } else {
            console.log('Please enter all registration details and make sure passwords match');
        }
    };

    const handlePasswordChange = (text) => {
        setConfirmPassword(text);
        if (password === text) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <Image src={digitaltown} width={300} height={200} className="rounded mb-4" alt="DigitalTownSq" />
                <div className="drop-shadow-lg Rolleston text-2xl font-medium static flex flex-col items-center justify-center ">
                    <div className="mb-4">
                        <input
                            type="text" // Change type to "text"
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
                            className="border border-black p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => handlePasswordChange(e.target.value)}
                            className="border border-black p-2 rounded"
                        />
                    </div>
                    {confirmPassword.length > 0 ? (passwordMatch ? (
                        <p>Passwords match</p>
                    ) : (
                        <p>Passwords do not match</p>
                    )) : null}
                    <button className="bg-[#003E5D] hover:bg-[#0575AF] font-normal text-white px-4 py-2 rounded-full " onClick={handleRegister}>Signup</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
