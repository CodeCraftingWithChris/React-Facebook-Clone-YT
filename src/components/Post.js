import React from 'react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { HandThumbUpIcon, ChatBubbleBottomCenterIcon, ShareIcon } from "@heroicons/react/24/outline"

function Post({ id, profile_pic, username, postImage, postDesc }) {
  return (
    <div className='flex flex-col max-w-[450px] lg:max-w-3xl mt-5 bg-gray-100 p-5 rounded-lg'>
        <div className='max-w-[400px] md:max-w-xl flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <img 
                    src={profile_pic ? profile_pic : 'https://imgs.search.brave.com/o-Jr6SJnUB5c5kAUeEbyCkum4-i2470l41dMBXzm-g4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/OTY1NDA0Ni92ZWN0/b3IvdXNlci1hdmF0/YXItcHJvZmlsZS1p/Y29uLWJsYWNrLXZl/Y3Rvci1pbGx1c3Ry/YXRpb24uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUVPWVhB/Q2p0Wm1aUTVJc1ow/VVVwMWlObVo5cTJ4/bDFCRDFWdk42dFoy/VUk9'}
                    className='h-12 w-12 rounded-full mr-4'
                    alt='ing'
                />
                
                <div>
                    <p className='font-semibold'>{username}</p>

                    <p className='text-xs mt-2'>{postDesc}</p>
                </div>   
            </div>
        
            <EllipsisHorizontalIcon className='h-7 w-7 cursor-pointer ml-auto'/>
        </div>

        <div className='max-w-[450px] lg:max-w-xl'>
            <img 
                src={postImage ? postImage : 'https://imgs.search.brave.com/wWNu-L6b04ECcYlneF7nc7PvQfAijaSaYbVdvw4Jagg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzMxLzk4Lzk3/LzM2MF9GXzMzMTk4/OTc0Ml9nOUJINFl3/dWl2Y2tKc3QwY3M5/dTBXSXpjMDYzS0tm/ci5qcGc'}
                className='object-fill rounded-lg mt-4'
                alt='ing'
            />
        </div>
        
        <div className='flex items-center justify-around mt-3'>
            <div className='flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <HandThumbUpIcon className='h-7 w-7'/>
                <p>Likes</p>
            </div>

            <div className='flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <ChatBubbleBottomCenterIcon className='h-7 w-7'/>
                <p>Comments</p>
            </div>

            <div className='flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer'>
                <ShareIcon className='h-7 w-7'/>
                <p>Comments</p>
            </div>
        </div>
    </div>
  )
}

export default Post