import Button from "./Button";
import {  useLocation, Link } from 'react-router-dom';


const Form = ({ handleChange,handleSubmit,userData }) => {
  const location = useLocation();
    return (
        <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="col-lg-12">
                        <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Username"
                            name="username"  
                            value={userData.username}
                            onChange={handleChange}
                        />
                    </div>
                    {location.pathname === "/signup" && (
                        <div className="col-lg-12">
                            <input
                                type="email"
                                className="form-control custom-input"
                                placeholder="Email"
                                name="email" 
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div className="col-lg-12">
                        <input
                            type="password"
                            name="password"  
                            className="form-control custom-input"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 my-3 d-flex justify-content-between">
                        {location.pathname === "/signup" ? (
                            <button style={{backgroundColor:"#fff"}}><Button  text='Create Account' tdisplay="block" twidth="7rem" pad='0.4rem 17.5rem' color='#2F6CE5' tcolor="#fff" bor="1.25rem" /></button>
                        ) : (
                            <button style={{backgroundColor:"#fff"}}><Button  pad='0.7rem 4rem' text='Login' color='#2F6CE5' tcolor="#fff" bor="1.25rem" /></button>
                        )}
                        {location.pathname === "/login" && <Link to="/login/forgot">Forgot Password?</Link>}
                    </div>
                    
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <p style={{ margin: "0" }}>By signing up, you agree to our Terms &</p>
                        <p style={{ margin: "0" }}>conditions, Privacy policy</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
