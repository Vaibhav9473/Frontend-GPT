import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import toast from "react-hot-toast";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://ai-chat-backend-mlwt.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      login(data);   //  context update
       toast.success("Login successful ");   
      navigate("/");    //  chat UI
    } else {
      toast.error("please enter valid email and password");
      
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleLogin}>
        <button
          type="button"
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Back to Chat
        </button>
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
