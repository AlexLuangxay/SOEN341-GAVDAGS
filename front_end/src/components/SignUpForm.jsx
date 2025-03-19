import { Link } from "react-router-dom";
import React, { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify( {username, password }),
            });

            const data = await response.json();
            if (response.status === 201) {
                console.log("Sign In successful!");
                window.location.href = "http://localhost:5173/groupmessage";
              } else {
                console.error("Sign In failed");
                setMessage(data.message);
              }
        } catch (error) {
            console.error("Error: " + error);
            setMessage("Something went wrong.")
        }   
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="signup-input-group">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}    
                        />
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