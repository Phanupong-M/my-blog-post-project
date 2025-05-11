import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/CustomButton";
import { z } from "zod";
import { useAuth } from "../contexts/authentication";
import { toast } from "sonner";
import { X } from "lucide-react";

const usedEmails = ["test@example.com", "hello@world.com", "user@email.com"];

function SignUp() {
  const { register, state } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // 1. สร้าง schema ด้วย zod
  const signUpSchema = z.object({
    name: z.string().min(1, "Please enter your name"),
    username: z.string().min(1, "Please enter your username"),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Please enter a valid email")
      .refine((email) => !usedEmails.includes(email.trim().toLowerCase()), {
        message: "Email is already taken, please try another email.",
      }),
    password: z.string().min(6, "Password must be at least 6 characters."),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // clear error เมื่อพิมพ์ใหม่
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkError = signUpSchema.safeParse(formData);

    if (!checkError.success) {
      const fieldErrors = {};
      checkError.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const result = await register(formData);
    if (result?.error) {
      let suggestionMessage = "";

      // Check for email or username-related issues
      if (result.error.toLowerCase().includes("email")) {
        suggestionMessage = "Try using a different email address.";
      } else if (result.error.toLowerCase().includes("username")) {
        suggestionMessage = "Try using a different username.";
      }

      return toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">{result.error}</h2>
            <p className="text-sm">
              {suggestionMessage && (
                <span className="block mt-2 text-sm">{suggestionMessage}</span>
              )}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }

    // ถ้าผ่าน validation
    setErrors({});
    // navigate("/somewhere"); // ถ้าต้องการ redirect
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#EFEEEB] px-10 py-14 rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-8">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-[#75716B]">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={state.getUserLoading}
                  className={`bg-white ${
                    errors.name ? "border border-red-500 rounded-lg" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-sm text-[#75716B]">
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={state.getUserLoading}
                  className={`bg-white ${
                    errors.username ? "border border-red-500 rounded-lg" : ""
                  }`}
                />
                {errors.username && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-[#75716B]">
                  Email
                </label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={state.getUserLoading}
                  className={`bg-white ${
                    errors.email
                      ? "border border-red-500 rounded-lg text-red-500"
                      : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm text-[#75716B]">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={state.getUserLoading}
                  className={`bg-white ${
                    errors.password
                      ? "border border-red-500 rounded-lg text-red-500"
                      : ""
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              <Button
                text={
                  state.getUserLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span> Signing
                      up...
                    </>
                  ) : (
                    "Sign up"
                  )
                }
                isPrimary={true}
                disabled={state.getUserLoading}
              />
            </div>

            <div className="flex justify-center items-center gap-1 mt-2">
              <span className="text-sm text-[#75716B]">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-black underline hover:underline text-sm"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
