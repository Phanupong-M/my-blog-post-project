import { createContext, useContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPostById = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      setError("Failed to load the post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        loading,
        error,
        fetchPostById,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  return useContext(PostContext);
}
