import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

import "../styles/login.css"; // 🎨 background + card styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration Successful. Please login.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* 🔳 Glassmorphism Card */}
      <div className="login-card">
        <h2>Food Delivery App</h2>
        <p className="subtitle">
          Deliver deliciousness to your doorstep 🍔🍕
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
