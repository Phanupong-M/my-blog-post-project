import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/ui/CustomButton";
import { toast } from "sonner";
import { X } from "lucide-react";
import { z } from "zod";
import { set } from "date-fns";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const loginSchema = z.object({
    email: z.string().min(1, "Please enter your email").email("Please enter a valid email"),
    password: z.string().nonempty("Please enter your password"),
  });

  const mockUser = {
    email: "test@example.com",
    password: "123456",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // 3. แปลง error ของ zod เป็น object
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // เช็ค email/password ตรงกับ mockUser
    if (
      !hasError &&
      (formData.email !== mockUser.email ||
        formData.password !== mockUser.password)
    ) {
      setIsPasswordValid(true)
      hasError = true;

      toast.custom((t) => (
        <div
          className="bg-[#EB5769] text-white px-6 py-3 rounded-lg flex justify-between items-start w-full max-w-md"
          style={{ minWidth: 500 }}
        >
          <div>
            <h2 className="font-bold text-base mb-1">
              Your password is incorrect or this email doesn’t exist
            </h2>
            <p className="text-sm text-white/80">
              Please try another password or email
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="ml-4 text-white/80 hover:text-white transition"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }


    if (!hasError) {
      
      alert("Login successful!");
      setErrors({});
      setIsPasswordValid(false);

      // navigate("/dashboard");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#EFEEEB] px-10 py-14 rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-8">Log in</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                    isPasswordValid
                      ? "border border-red-500 rounded-lg"
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
                  className={`bg-white ${
                    isPasswordValid
                      ? "border border-red-500 rounded-lg"
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
              <Button text="Log in" isPrimary={true} />
            </div>

            <div className="flex justify-center items-center gap-1 mt-2">
              <span className="text-sm text-[#75716B]">
                Don't have any account?
              </span>
              <Link
                to="/signup"
                className="text-black underline hover:underline text-sm"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
