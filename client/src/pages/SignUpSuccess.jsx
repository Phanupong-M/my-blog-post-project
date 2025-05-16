import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication"; // ปรับ path ตามจริง
import { LoadingScreen } from "../components/LoadingScreen";
import { useState } from "react";


export default function SignUpSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // รับ email, password จาก state ที่ navigate ส่งมา
  const { email, password } = location.state || {};
  
  const handleContinue = async () => {
    if (!email || !password) {
      navigate("/login");
      return;
    }
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);
    if (!result?.error) {
      navigate("/"); 
    } else {
      navigate("/login");
    }
  };

  return (
<div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <div className="relative">
            <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-12 w-12 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Registration Successful</h1>
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>
      </main>
      <Footer />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
}