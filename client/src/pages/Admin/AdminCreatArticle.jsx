import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from ".././../contexts/authentication";
import { X } from "lucide-react";

const AdminCreatArticle = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    image: "",
    category_id: null,
    title: "",
    description: "",
    date: null,
    content: "",
    status_id: null,
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [imageFile, setImageFile] = useState({});

  const fileInputRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(`${apiUrl}/categories`);
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        navigate("*");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]); // Re-fetch if postId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find(
      (category) => category.name === value
    );
    setPost((prevData) => ({
      ...prevData,
      category: value, // The category name
      category_id: selectedCategory ? Number(selectedCategory.id) : null, // Update the category_id
    }));
  };

  const handleSave = async (postStatusId) => {
    setIsSaving(true);
    const formData = new FormData();


    formData.append("title", post.title);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", postStatusId);
    formData.append("imageFile", imageFile.file);
    formData.append("user_id", state.user.id);

    console.log(formData.get("image"))

    try {
      await axios.post(`${apiUrl}/posts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
      });
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created article successfully
            </h2>
            <p className="text-sm">
              {postStatusId === 1
                ? "Your article has been successfully published."
                : postStatusId === 2
                ? "Your article has been successfully saved as draft."
                : ""}
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
      navigate("/admin/article-management"); // Redirect after saving
    } catch (error) {
      console.error("Error creating post:", error.message);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to create article</h2>
            <p className="text-sm">
              Something went wrong while trying to update article. Please try
              again later.
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
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Check if the file is an image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      // No file selected
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
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
      return; // Stop further processing if it's not a valid image
    }

    // Optionally check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              The file is too large. Please upload an image smaller than 5MB.
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
      return;
    }

    setImageFile({ file }); // Store the file object
  };

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar
          title="Category management"
          actions={
            <>
              <Button
                variant="outline"
                className="border border-[#23201B] text-[#23201B] bg-white rounded-full px-8 py-2 mr-2"
                disabled={isSaving}
                onClick={() => handleSave(1)}
              >
                Save as draft
              </Button>
              <Button
                className="bg-[#23201B] text-white rounded-full px-8 py-2"
                disabled={isSaving}
                onClick={() => handleSave(2)}
              >
                Save and publish
              </Button>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="space-y-6">
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image
                </label>
                <div className="flex justify-center items-center w-full max-w-lg h-64 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                  {imageFile.file ? (
                    <img
                      src={URL.createObjectURL(imageFile.file)}
                      alt="Thumbnail preview"
                      className="max-h-48 mx-auto"
                    />
                  ) : (
                    <div className="text-center space-y-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
                <button
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    document.getElementById("thumbnail-upload").click()
                  }
                >
                  Upload thumbnail image
                </button>
                {imageFile.file && (
                  <button
                    className="mx-10 px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      setImageFile({});
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    type="button"
                  >
                    Delete thumbnail image
                  </button>
                )}
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <Select
                  value={post.category}
                  onValueChange={(value) => {
                    handleCategoryChange(value);
                  }}
                >
                  <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="Article title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Introduction (max 120 letters)
                </label>
                <textarea
                  name="description"
                  value={post.description}
                  onChange={handleInputChange}
                  placeholder="Introduction"
                  maxLength={120}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={post.content}
                  onChange={handleInputChange}
                  placeholder="Content"
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreatArticle;
