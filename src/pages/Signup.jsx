import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate, Link } from "react-router-dom"; 
import '../style/SongdDetails.css'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      alert("Account created successfully!");

      if (userEmail === "dharanisri501@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };
return (
  <div className="auth-container">
    <form onSubmit={handleSignup} className="auth-form">
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  </div>
);

};

export default Signup;
