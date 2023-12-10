import { useEffect, useState } from "react"
import CreatePostCard from "../components/CreatePostCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import LeftCard from "../components/LeftCard"
import Post from "../components/Post"
import ProfileModal from "../components/ProfileModal"
import { leftCardIcons, rightCardIcons } from "../lib/LeftCards"
import PostModal from "../components/PostModal"
import { db } from "../firebase"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"

function Home() {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {

    const q = query(collection(db, `posts`), orderBy("time", "desc"));

    onSnapshot(q, (snapshot) => (
      setAllPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        profile_pic: doc.data().profile_pic,
        username: doc.data().username,
        postImage: doc.data().postImage,
        postDesc: doc.data().postDesc,
        time: doc.data().time,
      })))
    ))
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Header setShowProfileModal={setShowProfileModal} />

      {showProfileModal && (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      )}

      {showPostModal && (
        <PostModal setShowPostModal={setShowPostModal} />
      )}

      <div className="flex flex-1 justify-between max-w-[450px] lg:max-w-7xl mx-auto space-x-8 bg-gray-200 p-5">
        <div className="hidden lg:flex lg:flex-col space-y-2">
          {
            leftCardIcons.map((card) => (
             <LeftCard key={card.id} Icon={card.icon} name={card.name} />
            ))
          }
        </div>

        <div className="max-w-[450px] md:max-w-2xl overflow-y-hidden">
          <div>
            <CreatePostCard setShowPostModal={setShowPostModal} />

            {
              allPosts.map((post) => (
                <Post key={post.id} 
                  id={post.id} 
                  postDesc={post.postDesc} 
                  postImage={post.postImage} 
                  profile_pic={post.profile_pic}
                  username={post.username}
                />
              ))
            }
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col space-y-2">
            {
                rightCardIcons.map((card) => (
                    <LeftCard key={card.id} name={card.name} Icon={card.icon} />
                ))
            }
        </div>
        
      </div>

      <Footer />
    </div>
  )
}

export default Home