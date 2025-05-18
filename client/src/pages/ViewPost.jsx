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
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/utils/dateUtils";
import { toast } from "sonner";
import { usePost } from "../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

function ViewPost() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);

  const { postId } = useParams();
  const { post, likes, comments, setLikes, setComments, loading, error, fetchPostById } =
    usePost();
  const [isLiking, setIsLiking] = useState(false);
  const { isAuthenticated, state } = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      return setShowAlertDialog(true);
    }

    setIsLiking(true);
    try {
      // First try to like the post
      try {
        const postLike = await axios.post(`${apiUrl}/posts/${postId}/likes`);
        
      } catch (error) {
        // If we get a 500 error, assume the post is already liked and try to unlike
        if (error.response?.status === 500) {
          const postDeleted = await axios.delete(
            `${apiUrl}/posts/${postId}/likes`
          );

        } else {
          // If it's a different error, throw it to be caught by the outer try-catch
          throw error;
        }
      }

      const likesResponse = await axios.get(`${apiUrl}/posts/${postId}/likes`);
      setLikes(likesResponse.data.like_count);
    } catch (error) {
      console.error("Error handling like/unlike:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setIsError(true);
    } else {
      // Submit the comment
      setIsError(false);
      setCommentText("");
      const postComments = await axios.post(
        `${apiUrl}/posts/${postId}/comments`,
        { comment: commentText }
      );
      console.log("Comment posted successfully", postComments);
      const commentsResponse = await axios.get(
        `${apiUrl}/posts/${postId}/comments`
      );
      setComments(commentsResponse.data);
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Comment Posted!</h2>
            <p className="text-sm">
              Your comment has been successfully added to this post.
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
  };


  const handleDeleteComment = async (commentId) => {
    if (!isAuthenticated) {
      return setShowAlertDialog(true);
    }
    try {
      const deleteComment = await axios.delete(
        `${apiUrl}/posts/${postId}/comments/${commentId}`
      );

      console.log("Comment deleted successfully", deleteComment);
      // โหลดคอมเมนต์ใหม่หลังลบ
      const commentsResponse = await axios.get(
        `${apiUrl}/posts/${postId}/comments`
      );
      console.log("Comments updated successfully", commentsResponse);

      setComments(commentsResponse.data);
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Deleted!</h2>
            <p className="text-sm">
            Your comment has been successfully deleted.
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
    } catch (err) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to Delete</h2>
            <p className="text-sm">
              Sorry, we couldn't delete your comment. Please try again.
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
  };

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied!", {
        description: "The article link has been copied to your clipboard.",
      });
    } catch (err) {
      toast.error("Failed to copy link", {
        description: "Please try again",
      });
    }
  };

  const shareToSocialMedia = (platform) => {
    const url = encodeURIComponent(window.location.href);
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
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Error Loading Post
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                // onClick={fetchPostsByCategory}
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
            <div className="flex flex-row justify-between items-start">
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

                <div className="container mx-auto my-12">
                  <div className="flex items-center mb-6 rounded-2xl bg-[#EFEEEB] p-4">
                    <div
                      onClick={handleLike}
                      disabled={isLiking}
                      className={`flex items-center gap-1 bg-white rounded-full px-10 py-3 border border-gray-200 shadow-sm cursor-pointer${
                        isLiking
                          ? "bg-green-200 cursor-not-allowed text-gray-500 border-gray-300"
                          : "bg-red-500 hover:border-muted-foreground hover:text-muted-foreground"
                      }`}
                    >
                      <img src={Smile} alt="like" className="" />
                      <span>{likes}</span>
                    </div>
                    <div className="flex-grow"></div>
                    <button
                      className="mx-2 bg-white rounded-full px-4 py-2 border border-gray-200 shadow-sm flex items-center cursor-pointer"
                      onClick={copyToClipboard}
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
                    <form onSubmit={handleComment}>
                    <div className="border border-gray-300 rounded-lg relative">
                      <textarea //setShowAlertDialog
                        value={commentText}
                        onFocus={() => {
                          setIsError(false);
                          if (!isAuthenticated) {
                            return setShowAlertDialog(true);
                          }
                        }}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="What are your thoughts?"
                        className={`w-full p-4 rounded-lg h-28 resize-none focus:outline-none${
                          isError ? "border-red-500" : ""
                        }`}
                      ></textarea>
                      {isError && (
                        <p className="text-red-500 text-sm absolute">
                          Please type something before sending.
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        onClick={() => {
                          setIsError(false);
                          if (!isAuthenticated) {
                            return setShowAlertDialog(true);
                          }
                        }}
                        className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                    </form>
                  </div>
                </div>

                <div>
                  <CommentList data={comments} handleDeleteComment={handleDeleteComment} />
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
      </section>
      <SignUpAlertDialog
        showAlertDialog={showAlertDialog}
        setShowAlertDialog={setShowAlertDialog}
      />
      <Footer />
    </>
  );
}

export default ViewPost;

export function SignUpAlertDialog({ showAlertDialog, setShowAlertDialog }) {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    setShowAlertDialog(false);
    navigate("/signup");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setShowAlertDialog(false);
    navigate("/login");
  };

  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogContent className="max-w-md pt-12 rounded-lg shadow-lg bg-white">
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-2xl font-bold text-gray-900 text-center">
            Create an account to continue
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-4 mt-2">
          <button
            className="w-1/2 bg-black text-white py-3 px-6 rounded-full text-center font-medium hover:bg-gray-800 transition cursor-pointer"
            onClick={handleCreateAccount} // ตัวอย่างการปิด Dialog
          >
            Create account
          </button>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              className="text-blue-600 underline cursor-pointer"
              onClick={handleLogin}
            >
              Log in
            </button>
          </p>
        </div>
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

function CommentList({ data,handleDeleteComment }) {
  return (
    <div className="container mx-auto my-8">
      {data.map((c, idx) => (
        <div key={c.id} className="relative">
          <button
            className="absolute top-0 right-0 mt-2 mr-2 text-[#88847F] hover:text-red-500 text-xl font-bold cursor-pointer"
            onClick={() => handleDeleteComment(c.id)}
          >
            ×
          </button>
          <div className="flex items-center gap-4 mb-1">
            <img
              src={c.profile_pic}
              alt={c.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-[#23201B]">{c.name}</div>
              <div className="text-xs text-[#88847F]">
                {formatDate(c.created_at)}
              </div>
            </div>
          </div>
          <div className="text-[#88847F] text-base mt-3">{c.comment_text}</div>
          {idx < data.length - 1 && <hr className="my-8 border-[#E5E3DD]" />}
        </div>
      ))}
    </div>
  );
}
