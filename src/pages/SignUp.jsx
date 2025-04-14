import Navbar from "../components/Navbar";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/shares/Button";


function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#EFEEEB] px-10 py-14 rounded-lg">
          <h1 className="text-3xl font-semibold text-center mb-8">
              Sign up
          </h1>
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
                      className= "bg-white"
                    />
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
                      className= "bg-white"
                    />
                  </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-[#75716B]">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className= "bg-white"
                />
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
                  className= "bg-white"
                />
              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              <Button
                text="Sign up"
                isPrimary={true}
              />
            </div>

            <div className="flex justify-center items-center gap-1 mt-2">
                  <span className="text-sm text-[#75716B]">Don't have any account?</span>
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


export default SignUp;

