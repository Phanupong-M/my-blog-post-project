import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import { CircleAlert } from 'lucide-react'

function NotFound() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <section className="container px-4 ">
                <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                    <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-5">
                        <span className="text-4xl font-bold">!</span>
                    </div>
                    <h1 className="text-2xl font-medium mb-5">Page Not Found</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
                    >
                        Go To Homepage
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default NotFound;