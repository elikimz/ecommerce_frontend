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
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Shield,
} from "lucide-react";

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
        { replace: true },
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
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* ------------ Form Section ------------ */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-md w-full">
              {/* ---------- Login view ---------- */}
              {view === "login" && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl mb-6 shadow-lg">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Sign in to your account to continue shopping
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Username
                      </label>
                      <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoggingIn ? (
                        <Spinner />
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setView("forgot")}
                        className="text-orange-500 hover:text-orange-600 font-medium transition-colors text-sm"
                      >
                        Forgot your password?
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                          Don't have an account?
                        </span>
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
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl mb-6 shadow-lg">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      Forgot Password?
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Enter your email to receive an OTP
                    </p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSendingOTP}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isSendingOTP ? (
                        <Spinner />
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                      >
                        ← Back to login
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ---------- Reset‑password view ---------- */}
              {view === "reset" && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl mb-6 shadow-lg">
                      <Lock className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      Reset Password
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Enter OTP and your new password
                    </p>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        OTP Code
                      </label>
                      <input
                        name="otp"
                        value={form.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white text-center tracking-wider font-mono text-lg"
                        required
                        maxLength={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          name="new_password"
                          value={form.new_password}
                          onChange={handleChange}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isResetting}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isResetting ? (
                        <Spinner />
                      ) : (
                        <>
                          Reset Password
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setView("login")}
                        className="text-green-500 hover:text-green-600 font-medium transition-colors"
                      >
                        ← Back to login
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* ------------ Enhanced Image / Side Section ------------ */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 flex flex-col justify-center items-center p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>

            <div className="relative z-10 text-center">
              <div className="mb-8">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                  alt="Smart Indoor Decors"
                  className="w-80 h-64 object-cover rounded-2xl shadow-2xl mx-auto"
                />
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Transform Your <br />
                <span className="text-yellow-200">Living Space</span>
              </h3>

              <p className="text-xl text-orange-100 mb-8 max-w-md leading-relaxed">
                Join thousands of happy customers who trust Smart Indoor Decors
                for premium quality and exceptional service.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-800">✓</span>
                  </div>
                  <span className="font-medium">Secure & Fast Login</span>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-800">✓</span>
                  </div>
                  <span className="font-medium">Premium Products</span>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-800">✓</span>
                  </div>
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
