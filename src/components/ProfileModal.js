import React, { useRef, useState } from 'react'
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { auth, db, storage } from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

function ProfileModal({ setShowProfileModal }) {

    const [user] = useAuthState(auth)

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [profieImage, setProfileImage] = useState("");

    const filePickerRef = useRef(null);

    const addProfileImage = (e) => {
        e.preventDefault();

        const reader = new FileReader();

        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setProfileImage(readerEvent.target.result);
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault();

        const imageRef = ref(storage, `users/${user.email}/profile`);

        await uploadString(imageRef, profieImage, 'data_url').then(async () => {
            const downloadURL = await getDownloadURL(imageRef);

            setDoc(doc(db, `users/${user.email}`), {
                id: user?.uid,
                email: email,
                username: username,
                mobile: mobile,
                profile_pic: downloadURL,
                time: serverTimestamp(),
            })
        })

        setUsername("");
        setMobile("");
        setEmail("");
        setProfileImage("");

        setShowProfileModal(false);
    }

  return (
    <div className='h-screen w-screen fixed bg-gray-100/95 flex items-center justify-center p-5'>
        <div className='w-[300px] h-fit bg-white shadow-lg flex flex-col items-center space-y-5 rounded-lg p-3'>
            <div>
                <img 
                    src={profieImage ? profieImage : 'https://imgs.search.brave.com/o-Jr6SJnUB5c5kAUeEbyCkum4-i2470l41dMBXzm-g4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9'}
                    className='h-16 w-16 rounded-full cursor-pointer'
                    onClick={() => filePickerRef.current.click()}
                    alt='pic'
                />

                <input type='file' hidden ref={filePickerRef} onChange={addProfileImage} />
            </div>

            <input value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Username' className='bg-gray-200 p-3 rounded-lg outline-none'/>
            <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' className='bg-gray-200 p-3 rounded-lg outline-none' />
            <input value={mobile} onChange={e => setMobile(e.target.value)} type='tel' placeholder='Mobile' className='bg-gray-200 p-3 rounded-lg outline-none' />

            <div className='flex items-center space-x-5'>
                <button onClick={updateProfile} className='bg-blue-500 p-3 rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-200 ease-in-out'>Update Profile</button>
                <button onClick={() => setShowProfileModal(false)} className='bg-red-500 p-3 rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-200 ease-in-out'>Cancel</button>
            </div>

            <button onClick={() => auth.signOut()} className='border border-blue-500 p-3 rounded-lg text-sm font-semibold hover:scale-105 transition-all duration-200 ease-in-out'>Sign Out</button>
        </div>
    </div>
  )
}

export default ProfileModal