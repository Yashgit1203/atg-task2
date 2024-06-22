import React, { useEffect, useState } from "react";
import './css/Post.css';
import Button from "./Button";
import { Link } from "react-router-dom";
import UpdateForm from "./UpdateForm";
import axios from 'axios';

const Post = ({ post, user, handleDelete }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.post('http://localhost:8080/comment/all', {
        postId: postId,a:"ddd"
      });
      setComments(response.data.allcomments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleHiddenCard = (postId) => {
    document.getElementById(`hiddenCard-${postId}`).classList.toggle('show-card');
    fetchComments(postId);  // Fetch comments when the hidden card is revealed
  };

  const handleLike = async () => {
    if (!liked) {
      try {
        const response = await axios.post('http://localhost:8080/posts/like', { postId: post._id });
        setLikes(response.data.likes);
        setLiked(true);
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    }
  };

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/comment', {
        postId: postId,
        comment: comment,
        userId: user._id,
      });
      setComment(""); // Clear the comment input
      fetchComments(postId); // Fetch comments again to update the list
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center main-card">
      <div className="card mb-3 col-5 px-0">
        <div className="px-4 py-2 c-header d-flex align-items-center justify-content-between w-100">
          <div className="h-left fw-bold ">
            <i>{post.username}</i>
          </div>
          <div className="h-right d-flex align-items-center dropdown">
            <Button text='Follow' color='rgb(237, 238, 240)' />
            <div data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <Button icon='fa-solid fa-ellipsis-vertical' icolor='black' />
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start">
              <li><Link className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal3" to="/posts/edit">Edit</Link></li>
              <li>
                <Link className="dropdown-item" onClick={() => {
                  handleDelete(post._id);
                  navigator("/posts");
                  window.location.reload();
                }} to="/posts/delete">Delete</Link>
              </li>
              <li><Link className="dropdown-item" to="/report">Report</Link></li>
            </ul>
          </div>
        </div>
        {post.image && <img src={post.image} className="card-img-top w-100 h-25" alt="..." />}
        <div className="card-body container">
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fw-bold d-flex ex-card">
              <div className="f-left">
                <Button icon="fa-regular fa-heart" bo='0' onClick={handleLike} isize='1.6rem' />
                <i className="fa-solid fa-heart solid-heart"></i>
              </div>
              <Button onClick={() => handleHiddenCard(post._id)} icon="fa-regular fa-comment" isize='1.6rem' />
              <Button icon="fa-regular fa-paper-plane" isize='1.6rem' />
            </div>
            <div className="d-flex align-items-center dropdown">
              <Button icon="fa-regular fa-bookmark" isize='1.6rem' />
            </div>
          </div>
          <div className="mb-2 pb-2 border-bottom">
            <span className="px-2">{likes} likes</span>
          </div>
          {post.description && <p className="post-desc card-text">
            {post.description}
          </p>}
        </div>
        <div>
          <UpdateForm post={post} />
        </div>
      </div>

      <div id={`hiddenCard-${post._id}`} className={`col-md-4 card mb-3 hidden-card hidden-card-${post._id}`}>
        <div className="card-body">
          <h5 className="card-title">Comments</h5>
          <form className="d-flex" onSubmit={(e) => handleCommentSubmit(e, post._id)}>
            <input
              type="text"
              className="form-control h-50"
              placeholder="Enter Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="btn btn-dark mb-3 w-25 h-25">
              Add
            </button>
          </form>
          <div className="card-text view-comments">
            {comments.length > 0 ? comments.map((c, index) => (
              <p className="px-4 py-4 fw-semibold" key={index}>{c.comment}</p>
            )) : <p style={{border:"none"}}>No comments yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
