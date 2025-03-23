import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData);

        // Assuming the backend sends the token and user data if login is successful
        localStorage.setItem("userToken", response.data.token);
        alert("Login successful! Redirecting to Dashboard...");
        navigate("/home"); // Redirect to Dashboard after successful login
      } catch (error) {
        setLoginError(error.response?.data?.message || "Invalid email or password");
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-10 backdrop-blur-sm bg-opacity-90">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to Your Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginError && <div className="text-red-500">{loginError}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-300" : "border-gray-300"}`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-300" : "border-gray-300"}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up instead</span>
            </div>
          </div>

          <div className="mt-6">
            <a href="/signup" className="flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
