import React from 'react'

function LeftCard({ Icon, name }) {
  return (
    <div className='flex items-center space-x-2 bg-white w-fit p-3 rounded-lg cursor-pointer'>
        <Icon className="h-6 w-6"/>
        <p className='font-semibold text-md'>{name}</p>
    </div>
  )
}

export default LeftCard