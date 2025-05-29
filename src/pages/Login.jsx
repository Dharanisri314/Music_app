import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate, Link } from "react-router-dom";  
import '../style/Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      alert("Login successful!");

      if (userEmail === "dharanisri501@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };
return (
  <div className="auth-container">
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    </form>
  </div>
);
}
export default Login;
