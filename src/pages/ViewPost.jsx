import Navbar from "../components/Navbar";
import Footer from "../components/Footer.jsx";
import ReactMarkdown from "react-markdown";
import CopyLinkIcon from "../assets/icons/Copy.svg";
import Smile from "../assets/icons/Smile.svg";
import FacebookIcon from "../assets/icons/Facebook.svg";
import LinkedInIcon from "../assets/icons/Linkedin.svg";
import TwitterIcon from "../assets/icons/Twitter.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/utils/dateUtils";

function ViewPost() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copyLink, setCopyLink] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  const fetchPostsByCategory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load the post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsByCategory();
  }, []);

  useEffect(() => {
    if (copyLink) {
      const timer = setTimeout(() => {
        setCopyLink(null);
        setShowPopup(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [copyLink]);

  const copyToClipboard = async (url, tripId) => {
    try {
      await navigator.clipboard.writeText(url);
      setShowPopup(true);
    } catch (err) {
      console.error("ไม่สามารถคัดลอกลิงก์ได้: ", err);
    }
  };

  const handleLikeClick = () => {
    setShowAlertDialog(true);
  };

  const closeAlertDialog = () => {
    setShowAlertDialog(false);
  };

  const shareToSocialMedia = (platform) => {
    const url = encodeURIComponent(window.location.href);
    console.log(url);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/share.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://www.twitter.com/share?&url=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto px-4 h-full">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Error Loading Post
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchPostsByCategory}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <img
              src={post.image}
              alt="post.image"
              className="h-[470px] w-full object-cover rounded-lg my-8"
            />
            <div className="flex flex-row gap-20">
              <div className="flex flex-col">
                <div className="flex items-center justify-start">
                  <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {post.title}
                </h1>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {post.description}
                </p>

                <div className="markdown">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => <h2>{children}</h2>,
                      p: ({ children }) => <p>{children}</p>,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="flex flex-col h-1/2 w-1/4 rounded-lg bg-[#EFEEEB] p-4 sticky top-10">
                <div className="flex items-center">
                  <img
                    className="w-11 h-11 rounded-full mr-2"
                    src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                    alt={post.author}
                  />
                  <div>
                    <div className="text-gray-500 text-sm">Author</div>
                    <div className="font-bold text-xl">{post.author}</div>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="text-gray-500">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </p>
                  <br />
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <section className="container mx-auto my-12">
          <div className="flex items-center mb-6 rounded-2xl bg-[#EFEEEB] p-4">
            <div
              onClick={handleLikeClick}
              className="flex items-center gap-1 bg-white rounded-full px-10 py-3 border border-gray-200 shadow-sm cursor-pointer"
            >
              <img src={Smile} alt="Facebook" className="" />
              <span>{post.likes}</span>
            </div>
            <div className="flex-grow"></div>
            <button
              className="mx-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm flex items-center cursor-pointer"
              onClick={() => {
                copyToClipboard("test1");
              }}
            >
              <img
                src={CopyLinkIcon}
                alt="Copy link"
                className="w-5 h-5 mr-2"
              />
              Copy link
            </button>

            <div className="flex items-center gap-2">
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="cursor-pointer"
                onClick={() => shareToSocialMedia("facebook")}
              />
              <img
                src={LinkedInIcon}
                alt="LinkedIn"
                className="cursor-pointer"
                onClick={() => shareToSocialMedia("linkedin")}
              />
              <img
                src={TwitterIcon}
                alt="Twitter"
                className="cursor-pointer"
                onClick={() => shareToSocialMedia("twitter")}
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-1">Comment</h3>
            <div className="border border-gray-300 rounded-lg relative">
              <textarea
                placeholder="What are your thoughts?"
                className="w-full p-4 rounded-lg h-28 resize-none focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end mt-2">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer">
                Send
              </button>
            </div>
          </div>
        </section>
        {/* Popup */}
        {showPopup && (
          <div
            className="fixed bottom-5 right-5 bg-green-100 border border-green-400 text-green-700 
        px-4 py-3 rounded shadow-md z-50 animate-fade-in-out"
          >
            <div className="flex flex-col items-start">
              <p>Copied!</p>
              <p>This article has been copied to your clipboard.</p>
              <p
                onClick={() => {
                  setShowPopup(false);
                }}
                className="absolute right-[3%] top-[5%] cursor-pointer"
              >
                x
              </p>
            </div>
          </div>
        )}
      </section>
      <AlertDialogDemo
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
      />
      <Footer />
    </>
  );
}

export default ViewPost;

export function AlertDialogDemo({ showAlertDialog, setShowAlertDialog }) {
  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogContent className="max-w-md pt-12 rounded-lg shadow-lg bg-white">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-2xl font-bold text-gray-900 text-center">
            Create an account to continue
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-4 mt-2">
          {/* ปุ่ม Create Account */}
          <button
            className="w-1/2 bg-black text-white py-3 px-6 rounded-full text-center font-medium hover:bg-gray-800 transition"
            onClick={() => setShowAlertDialog(false)} // ตัวอย่างการปิด Dialog
          >
            Create account
          </button>
          {/* ข้อความ Log in */}
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 underline">
              Log in
            </a>
          </p>
        </div>

        {/* ปุ่ม "x" */}
        <button
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-800 transition text-xl font-bold cursor-pointer"
          onClick={() => setShowAlertDialog(false)}
          aria-label="Close"
        >
          x
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
