import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).catch(err => alert(err.message));
    }

    const signInUser = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password).catch(err => alert(err.message));
    }
  return (
    <div className="flex flex-col items-center ml-auto mr-auto mt-60 max-w-[300px]">
       <h1 className="text-5xl font-bold text-blue-600">Facebook</h1>

       <form className="flex flex-col items-center space-y-5 mt-5 w-full">
         <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            type="email" 
            className="bg-gray-200 p-3 outline-none rounded-lg w-full"
        />

         <input 
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" 
            type="password" 
            className="bg-gray-200 p-3 outline-none rounded-lg w-full"
        />
         <button 
            onClick={loginUser} 
            className="bg-blue-500 p-3 w-full rounded-lg text-white font-bold hover:scale-110 
            transition-all duration-200 ease-in-out">
                Log In
        </button>
         <button 
            onClick={signInUser} 
            className="border border-blue-500 p-3 w-full rounded-lg text-blue-500 font-bold 
            hover:scale-110 transition-all duration-200 ease-in-out">
                Sign In
        </button>
       </form>
    </div>
  )
}

export default Login