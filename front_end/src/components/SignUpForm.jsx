import { Link } from "react-router-dom";
import React from "react";

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form action="Nowhere yet">
                    <div className="signup-input-group">
                        <input type="text" placeholder="Username" className="input1" />
                        <input type="password" placeholder="Password" className="input1" />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
                <p className="switch-text">
                    Already have an account? <Link to ="/Login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;