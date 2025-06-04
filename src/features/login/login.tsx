// import { useState, type ChangeEvent, type FormEvent } from "react";
// import {
//   useLoginUserMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
// } from "../login/loginAPI";
// import { toast } from "react-hot-toast";
// import Spinner from "../../components/spinner";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { Eye, EyeOff } from "lucide-react";

// const LoginForm = () => {
//   const [view, setView] = useState<"login" | "forgot" | "reset">("login");

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     email: "",
//     otp: "",
//     new_password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);

//   const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
//   const [forgotPassword, { isLoading: isSendingOTP }] =
//     useForgotPasswordMutation();
//   const [resetPassword, { isLoading: isResetting }] =
//     useResetPasswordMutation();

//   const navigate = useNavigate();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser({
//         username: form.username,
//         password: form.password,
//       }).unwrap();

//       const token = res.access_token;
//       localStorage.setItem("token", token);

//       // Decode JWT to extract role
//       const decoded: { role: string } = jwtDecode(token);

//       toast.success("Login successful");

//       // Redirect based on role
//       if (decoded.role === "Admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/customer-dashboard");
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.detail || "Login failed");
//     }
//   };

//   const handleForgotPassword = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await forgotPassword({ email: form.email }).unwrap();
//       toast.success("OTP sent to your email");
//       setView("reset");
//     } catch (err: any) {
//       toast.error(err?.data?.detail || "Error sending OTP");
//     }
//   };

//   const handleResetPassword = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       await resetPassword({
//         email: form.email,
//         otp: form.otp,
//         new_password: form.new_password,
//       }).unwrap();
//       toast.success("Password reset successful. Please login.");
//       setView("login");
//     } catch (err: any) {
//       toast.error(err?.data?.detail || "Reset failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side: Form */}
//       <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
//         <div className="max-w-md w-full">
//           {view === "login" && (
//             <form onSubmit={handleLogin} className="space-y-6">
//               <h2 className="text-3xl font-bold mb-6 text-orange-600">Login</h2>
//               <input
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//               <div className="relative">
//                 <input
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-500"
//                   tabIndex={-1}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoggingIn}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
//               >
//                 {isLoggingIn ? <Spinner /> : "Login"}
//               </button>
//               <p className="text-center text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setView("forgot")}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Forgot password?
//                 </button>
//               </p>

//               <p className="text-center text-sm mt-4">
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => navigate("/register")}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Register here
//                 </button>
//               </p>
//             </form>
//           )}

//           {view === "forgot" && (
//             <form onSubmit={handleForgotPassword} className="space-y-6">
//               <h2 className="text-3xl font-bold mb-6 text-orange-600">
//                 Forgot Password
//               </h2>
//               <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Your email"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 disabled={isSendingOTP}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
//               >
//                 {isSendingOTP ? <Spinner /> : "Send OTP"}
//               </button>
//               <p className="text-center text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setView("login")}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Back to login
//                 </button>
//               </p>
//             </form>
//           )}

//           {view === "reset" && (
//             <form onSubmit={handleResetPassword} className="space-y-6">
//               <h2 className="text-3xl font-bold mb-6 text-orange-600">
//                 Reset Password
//               </h2>
//               <input
//                 name="otp"
//                 value={form.otp}
//                 onChange={handleChange}
//                 placeholder="Enter OTP"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//               <div className="relative">
//                 <input
//                   name="new_password"
//                   value={form.new_password}
//                   onChange={handleChange}
//                   type={showNewPassword ? "text" : "password"}
//                   placeholder="New password"
//                   className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowNewPassword(!showNewPassword)}
//                   className="absolute right-3 top-3 text-gray-500"
//                   tabIndex={-1}
//                   aria-label={
//                     showNewPassword ? "Hide new password" : "Show new password"
//                   }
//                 >
//                   {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isResetting}
//                 className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
//               >
//                 {isResetting ? <Spinner /> : "Reset Password"}
//               </button>
//               <p className="text-center text-sm">
//                 <button
//                   type="button"
//                   onClick={() => setView("login")}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Back to login
//                 </button>
//               </p>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* Right side: Image + service promo text */}
//       <div className="flex-1 bg-orange-50 flex flex-col justify-center items-center p-12">
//         <img
//           src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
//           alt="Our services"
//           className="max-w-sm rounded-lg shadow-lg mb-8"
//         />
//         <h3 className="text-4xl font-bold text-orange-600 mb-4 text-center">
//           Why Choose Us?
//         </h3>
//         <p className="max-w-md text-center text-gray-700 text-lg leading-relaxed">
//           We offer fast, secure, and reliable service tailored to your needs.
//           Join thousands of satisfied customers who trust us every day.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


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

      const token = res.access_token;
      localStorage.setItem("token", token);

      // Decode JWT to extract role
      const decoded = jwtDecode<JwtPayload>(token);

      // Create cart for the user
      try {
        await createCart({}).unwrap();
        toast.success("Cart created successfully");
      } catch (err: any) {
        // Handle cart creation error
        toast.error(err?.data?.detail || "Failed to create cart");
      }

      toast.success("Login successful");

      // Redirect based on role
      if (decoded.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
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

  return (
    <div className="min-h-screen flex">
      {/* Left side: Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-8 py-12">
        <div className="max-w-md w-full">
          {view === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-3xl font-bold mb-6 text-orange-600">Login</h2>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <div className="relative">
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold flex justify-center items-center"
              >
                {isLoggingIn ? <Spinner /> : "Login"}
              </button>
              <p className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setView("forgot")}
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </button>
              </p>
              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-blue-500 hover:underline"
                >
                  Register here
                </button>
              </p>
            </form>
          )}

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
                  tabIndex={-1}
                  aria-label={
                    showNewPassword ? "Hide new password" : "Show new password"
                  }
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

      {/* Right side: Image + promo */}
      <div className="flex-1 bg-orange-50 flex flex-col justify-center items-center p-12">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
          alt="Our services"
          className="max-w-sm rounded-lg shadow-lg mb-8"
        />
        <h3 className="text-4xl font-bold text-orange-600 mb-4 text-center">
          Why Choose Us?
        </h3>
        <p className="text-gray-700 text-center max-w-xs">
          Trusted, secure, and fast login system for a smooth user experience.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
