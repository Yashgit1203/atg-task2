import Navbar from './Navbar';
import MainContent from './MainContent';
import Modal from './Modal';
import PostForm from './PostForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import UpdateForm from './UpdateForm';
const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    url: '',
    description: ''
  });
  const [allposts, setallpost] = useState([]);
    useEffect(()=>{
        (async ()=>{
            const res =  await axios.get("http://localhost:8080/posts");
            console.log(res.data.posts);
            setallpost(res.data.posts);
        })();
},[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChange2 = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/posts', formData);
      setPosts([...posts, response.data]);
      document.querySelector(".btn-close-2").click();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };
  const handleLogout = async () =>{
    try {
      if (location.pathname === '/logout') {
        const response = await axios.get('http://localhost:8080/logout');
        console.log(response);
        navigate('/posts');
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = "";
      if (location.pathname === '/signup') {
        response = await axios.post('http://localhost:8080/signup', userData);
      }
      if (location.pathname === '/login') {
        response = await axios.post('http://localhost:8080/login', userData);
      }
      
      setUser(response.data.user);
      if (response.data.redirect) {
        navigate(response.data.redirect);
      }
    } catch (error) {
      console.error('There was an error signing up!', error);
    }
    document.querySelector(".btn-close").click();
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.post('http://localhost:8080/posts/delete', { id: postId });
      // setPosts(posts.filter(post => post.id !== postId));
      navigate('/posts');
      window.location.reload();
      console.log('Post deleted:', response.data);
    } catch (error) {
      console.error('There was an error deleting the post!', error);
    }
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <div>
        <Modal handleChange={handleChange} handleSubmit={handleSubmit} userData={userData} />
      </div>
      <div>
        <PostForm user={user} handleChange={handleChange2} formData={formData} handleSubmit={handleSubmit2} />
      </div>
      
      <div>
        <MainContent allposts={allposts} user={user} posts={posts} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
