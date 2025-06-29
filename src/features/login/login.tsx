import React, { useState, type ChangeEvent, type FormEvent } from "react";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "./loginAPI";
import { useCreateCartMutation } from "../Cart&CartItems/cartitemsAPI";
import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

interface JwtPayload {
  role: string;
}

const LoginForm: React.FC = () => {
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    otp: "",
    new_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [forgotPassword, { isLoading: isSendingOTP }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetting }] =
    useResetPasswordMutation();
  const [createCart] = useCreateCartMutation();

  const navigate = useNavigate();

  /* ----------------- Handlers ----------------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        username: form.username,
        password: form.password,
      }).unwrap();

      /* store token & decode */
      const token = res.access_token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<JwtPayload>(token);

      /* create a fresh cart for this session (ignore errors) */
      try {
        await createCart({}).unwrap();
      } catch {
        /* silently ignore cart‑creation failure */
      }

      toast.success("Login successful");

      /* redirect – replace = true prevents back‑button loop */
      navigate(
        decoded.role === "Admin" ? "/admin-dashboard" : "/customer-dashboard",
        { replace: true }
      );
    } catch (err: any) {
      toast.error(err?.data?.detail || "Login failed");
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email: form.email }).unwrap();
      toast.success("OTP sent to your email");
      setView("reset");
    } catch (err: any) {
      toast.error(err?.data?.detail || "Error sending OTP");
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({
        email: form.email,
        otp: form.otp,
        new_password: form.new_password,
      }).unwrap();
      toast.success("Password reset successful. Please login.");
      setView("login");
    } catch (err: any) {
      toast.error(err?.data?.detail || "Reset failed");
    }
  };

  /* ----------------- JSX ----------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* ------------ Form Section ------------ */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-md w-full">
              {/* ---------- Login view ---------- */}
              {view === "login" && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-6">
                      <span className="text-2xl text-white">🔐</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Username</label>
                      <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Password</label>
                      <div className="relative">
                        <input
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingIn ? <Spinner /> : "Sign In"}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
                      >
                        Forgot your password?
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="w-full btn-secondary py-4 rounded-xl font-semibold text-lg"
                    >
                      Create Account
                    </button>
                  </form>
                </div>
              )}

          {/* ---------- Forgot‑password view ---------- */}
          {view === "forgot" && (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-orange-600">
                Forgot Password
              </h2>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />

              <button
                type="submit"
                disabled={isSendingOTP}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
              >
                {isSendingOTP ? <Spinner /> : "Send OTP"}
              </button>

              <p className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-blue-500 hover:underline"
                >
                  Back to login
                </button>
              </p>
            </form>
          )}

          {/* ---------- Reset‑password view ---------- */}
          {view === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-orange-600">
                Reset Password
              </h2>

              <input
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />

              <div className="relative">
                <input
                  name="new_password"
                  value={form.new_password}
                  onChange={handleChange}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isResetting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
              >
                {isResetting ? <Spinner /> : "Reset Password"}
              </button>

              <p className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-blue-500 hover:underline"
                >
                  Back to login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ------------ Image / Side Section ------------ */}
      <div className="w-full md:w-1/2 bg-orange-50 flex flex-col justify-center items-center p-6">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
          alt="Our services"
          className="w-full max-w-md rounded-lg shadow-lg object-cover"
        />
        <h3 className="text-3xl md:text-4xl font-bold text-orange-600 mt-6 text-center">
          Why Choose Us?
        </h3>
        <p className="text-gray-700 text-center max-w-xs mt-2">
          Trusted, secure, and fast login system for a smooth user experience.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;