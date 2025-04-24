import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/CustomButton";
import { z } from "zod";

const usedEmails = [
  "test@example.com",
  "hello@world.com",
  "user@email.com",
];

function SignUp() {
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
      .refine(
        (email) => !usedEmails.includes(email.trim().toLowerCase()),
        { message: "Email is already taken, please try another email." }
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. validate ด้วย zod
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      // 3. แปลง error ของ zod เป็น object
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // ถ้าผ่าน validation
    setErrors({});
    alert("Sign up successful!");
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
                  className={`bg-white ${
                    errors.email ? "border border-red-500 rounded-lg text-red-500" : ""
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
                  className={`bg-white ${
                    errors.password ? "border border-red-500 rounded-lg text-red-500" : ""
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
              <Button text="Sign up" isPrimary={true} />
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
