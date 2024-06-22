import Post from './Post'
import { useState,useEffect } from 'react'
import axios from 'axios';

const AllPosts = ({allposts,user,handleDelete}) => {
  console.log(allposts);
  return (
    <div className='row d-flex flex-column align-items-center'>
      {allposts.map((post, index) => (
                <Post handleDelete={handleDelete} key={index} post={post} user={user}/>
                
            ))}
    </div>
  )
}

export default AllPosts
