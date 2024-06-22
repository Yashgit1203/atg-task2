import React from 'react'
import AllPosts from './AllPosts'
const MainContent = ({allposts,user,handleDelete}) => {
  return (
    <div className='container pt-4 mt-4'>
      <AllPosts allposts={allposts} user={user} handleDelete={handleDelete}/>
    </div>
  )
}

export default MainContent
