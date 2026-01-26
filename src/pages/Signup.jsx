import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import toast from "react-hot-toast";


function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully "); // 

        navigate("/login");
      }


      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      navigate("/login"); // signup ke baad login

    } catch (err) {
      setError("Server error", err);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Signup</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
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

        {error && <p className="error">{error}</p>}

        <button type="submit">Signup</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
