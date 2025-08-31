import React, { useState } from "react";
import axios from "./axiosInstance"; // Ensure you have an axios instance configured
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://trademate-backend-oqw3.onrender.com/login",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        console.log("Signin successful, navigating to dashboard...");

          console.log(response.data.user.name); // “Hi, <name>”
        // Save name in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
          console.log(response.data.user.name); // “Hi, <name>”
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl; // Redirect to external dashboard
        } else {
          navigate("/dashboard"); // Default redirect if no URL provided
        }
      }

    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#007BFF" }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="card shadow-lg" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">

                {/* Right Side Form */}
                <div className=" d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      {/* Logo & Heading */}
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span className="h1 fw-bold mb-0" style={{ color: "#007BFF" }}>
                          TradeMate
                        </span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                        Sign into your account
                      </h5>

                      {/* Email Input */}
                      <div className="form-group mb-3">
                        <label>Email address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Password Input */}
                      <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Login Button */}
                      <div className="pt-1 mb-3">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>

                      {/* Links */}

                      <p className="mb-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#007BFF" }}>
                          Register here
                        </Link>
                      </p>


                    </form>

                    {/* Error Message */}
                    {error && <p className="text-danger mt-3">{error}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;