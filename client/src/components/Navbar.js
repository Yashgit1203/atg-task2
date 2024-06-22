import React from "react";
import "./css/Navbar.css";
import Button from "./Button";
import {Link } from 'react-router-dom';
const Navbar = ({user,handleLogout}) => {
  return (
    <div className="cont d-flex justify-content-between border-bottom align-items-center">
    
      <div>
        <h3>
          <i style={{ color: "black" }}>Stark</i>
        </h3>
      </div>

      <div className="d-flex align-items-center">
        {user.username === undefined ? <Link to="/signup" style={{ textDecoration: "none", fontWeight: "600" }} >
        <div
          data-bs-toggle="modal" data-bs-target="#exampleModal"
          className="d-flex justify-content-around pt-1 fs-6 fw-bold"
          
        >
          <span style={{ color: "#2E2E2E" }}>Create account.</span>
          <span style={{ color: "#2F6CE5" }}> It's free!</span>
          <div>
          <i
            className="fa-solid fa-caret-down r_most"
            style={{ color: "#2E2E2E" }}
          ></i>
        </div>
        </div>
        </Link>:<i className="fw-bold px-4 " style={{color:"black",margin:"0"}}>@{user.username}</i>}
        
       { user.username !== undefined &&<div data-bs-toggle="modal" data-bs-target="#exampleModal2" className="px-5">
            <Button text='Add Post' tcolor='white' color='rgb(255, 92, 92)'/>
        </div>}
       { user.username !== undefined &&<Link onClick={handleLogout()} to="/logout">
            <Button text='Logout' tcolor='white' color='rgb(255, 92, 92)'/>
        </Link>}

      </div>
      
    </div>
  );
};

export default Navbar;
