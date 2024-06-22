import "./css/Modal.css";
import {Link,useLocation } from 'react-router-dom';
import Form from "./Form"
const Modal = ({ handleChange,handleSubmit,userData }) => {
  const location = useLocation();

  return (
    <div
      className="modal fade"
      id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"    >
   
      <div className="modal-dialog modal-dialog-centered modal-lg ">
      <div className="d-flex flex-column align-items-end">
      <button
            type="button"
            className="btn-close trans mb-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        <div className="modal-content">
          
          <div style={{backgroundColor:"#EFFFF4"}} className="modal-title p-4">
            {location.pathname === "/signup"? <h6 style={{color:"#008A45"}}>
            Connect, and share your moments with friends. Sign up today and be part of our social adventure! 📱</h6>: <h6 style={{color:"#008A45"}}>
            Sign in to connect with friends,share your favorite moments,and be part of our vibrant community! 📱</h6>}
          </div>
          <div className="modal-header">
            
            {location.pathname === "/signup" ? <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Create Account
            </h1> : <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">
                Login
            </h1>}
            {
                location.pathname === "/signup" ? <p style={{color:"#3D3D3D"} } className="fw-semibold">
                 Already have an account? <Link to='/login' style={{textDecoration:'none',color:"#2F6CE5"}}>Sign In</Link>
            </p> : <p style={{color:"#3D3D3D"} } className="fw-semibold">
                 Create an account? <Link to='/signup' style={{textDecoration:'none',color:"#2F6CE5"}}>Sign Up</Link>
            </p>
            }
          </div>
          <div className="modal-body row">
                <div className="modal_form_l col-12">
                    <Form handleChange={handleChange} handleSubmit={handleSubmit} userData={userData}/>
                </div>
          </div>    
        </div>
      </div>
      </div>
    </div>
  );
};

export default Modal;
