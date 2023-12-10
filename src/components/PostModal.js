import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';

function PostModal({ setShowPostModal }) {

    const [user] = useAuthState(auth);

    const [postImage, setPostImage] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [loggedInUser, setLoggedInUser] = useState({});

    const filePickerRef = useRef(null);

    useEffect(() => {
        onSnapshot(doc(db, `users/${user.email}`), (snapshot) => {
            setLoggedInUser({
                id: snapshot.id,
                profile_pic: snapshot.data().profile_pic,
                username: snapshot.data().username,
                email: snapshot.data().email,
            })
        })
    }, [user])

    const addPostImage = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setPostImage(readerEvent.target.result);
        }
    }

    const addPost = async (e) => {
        e.preventDefault();

        const imageRef = ref(storage, `posts/${user.email}/${Math.random()}`);

        await uploadString(imageRef, postImage, 'data_url').then(async () => {
            const downloadURL = await getDownloadURL(imageRef);

            addDoc(collection(db, `users/${user.email}/posts`), {
                profile_pic: loggedInUser?.profile_pic,
                postImage: downloadURL,
                postDesc: postDesc,
                time: serverTimestamp(),      
            })

            addDoc(collection(db, `posts`), {
                username: loggedInUser?.username,
                profile_pic: loggedInUser?.profile_pic,
                postImage: downloadURL,
                postDesc: postDesc,
                time: serverTimestamp(),
            })
        })

        setPostDesc("");
        setPostImage("");
        setShowPostModal(false);
    }
  return (
    <div className='h-screen w-screen fixed bg-gray-100/95 flex items-center justify-center p-5'>
        <div className='w-[350px] h-fit bg-white shadow-lg rounded-lg p-3 flex flex-col items-center space-y-5'>
            <div>
                <img 
                    src={postImage ? postImage : 'https://imgs.search.brave.com/o-Jr6SJnUB5c5kAUeEbyCkum4-i2470l41dMBXzm-g4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9'}
                    className='h-16 w-16 rounded-full cursor-pointer'
                    onClick={() => filePickerRef.current.click()}
                    alt='img'
                />

                <input type='file' hidden ref={filePickerRef} onChange={addPostImage} />
            </div>

            <input value={postDesc} onChange={e => setPostDesc(e.target.value)} type='text' placeholder='Description' className='bg-gray-200 p-3 rounded-lg outline-none'/>

            <div className='flex items-center space-x-5 pb-5'>
                <button onClick={addPost} className='bg-blue-500 p-3 rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-200 ease-in-out'>Upload Post</button>
                <button onClick={() => setShowPostModal(false)} className='bg-red-500 p-3 rounded-lg text-sm font-semibold text-white hover:scale-105 transition-all duration-200 ease-in-out'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default PostModal