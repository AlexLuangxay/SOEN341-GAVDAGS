import { Link } from "react-router-dom";
import React from "react";

const LoginForm = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Log In</h2>
                <form action="Nowhere yet">
                    <div className="signup-input-group">
                        <input type="text" placeholder="Username" className="input1" required />
                        <input type="password" placeholder="Password" className="input1" required />
                    </div>
                    <button type="submit" className="login-button">Log in</button>
                </form>
                <p className="switch-text">
                    Don't have an account? <Link to ="/Signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;