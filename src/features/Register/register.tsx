import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRegisterUserMutation } from "../Register/registerAPI";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
};

// Enhanced Spinner component
const Spinner = () => (
  <div className="flex space-x-1 justify-center items-center">
    {[...Array(3)].map((_, i) => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-white animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
      }).unwrap();

      toast.success("Registration successful! Welcome to Smart Indoor Decors!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        err?.data?.detail || err?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[800px]">
          {/* ------------ Form Section ------------ */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="max-w-md w-full">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl mb-6 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-2">
                    Join Our Family
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Create your account and start your journey with us
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your shipping address"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-full btn-secondary py-4 rounded-xl font-semibold text-lg"
                  >
                    Sign In Instead
                  </button>

                  <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* ------------ Enhanced Image / Side Section ------------ */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-orange-500 flex flex-col justify-center items-center p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>

            <div className="relative z-10 text-center">
              <div className="mb-8">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                  alt="Home Decor"
                  className="w-80 h-64 object-cover rounded-2xl shadow-2xl mx-auto"
                />
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Start Your <br />
                <span className="text-yellow-200">Design Journey</span>
              </h3>

              <p className="text-xl text-blue-100 mb-8 max-w-md leading-relaxed">
                Join our community of design enthusiasts and discover amazing
                products that will transform your living space.
              </p>

              <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-800" />
                  </div>
                  <span className="font-medium">Exclusive Member Deals</span>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-yellow-800" />
                  </div>
                  <span className="font-medium">Secure Shopping</span>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-pink-800" />
                  </div>
                  <span className="font-medium">Fast & Free Delivery</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-semibold mb-2">
                  Join 10,000+ Happy Customers
                </p>
                <div className="flex justify-center items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-300 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
