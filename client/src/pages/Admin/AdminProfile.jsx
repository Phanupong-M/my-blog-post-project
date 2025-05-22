import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../contexts/authentication";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // สมมติใช้ toast
import { X } from "lucide-react"; // สมมติใช้ icon
import axios from "axios";

const AdminProfile = () => {
  const { state, fetchUser } = useAuth();
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // ดึงข้อมูล user จาก state
    setProfile({
      image: state.user.profilePic || "",
      name: state.user.name || "",
      username: state.user.username || "",
      email: state.user.email || "",
      bio: state.user.bio || "",
    });
  }, [state.user]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Invalid file type</h2>
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
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">File too large</h2>
            <p className="text-sm">Please upload an image smaller than 5MB.</p>
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

    setImageFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  // handle save
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("username", profile.username);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(
        `${apiUrl}/profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Profile updated successfully
            </h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch(error) {
      console.error("Failed to update profile:", error.message);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">Please try again later.</p>
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
      fetchUser();
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar
          title="Profile"
          actions={
            <Button
              className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          }
        />
        <div className="px-14 pt-10">
          <form
            className="w-full max-w-2xl flex flex-col gap-5 p-4"
            onSubmit={handleSave}
          >
            <div className="flex items-center mb-6">
              <Avatar className="w-24 h-24 mr-4">
                <AvatarImage
                  src={profile.image || "/placeholder.svg?height=96&width=96"}
                  alt="Profile picture"
                />
                <AvatarFallback>
                  {profile.name
                    ? profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "TP"}
                </AvatarFallback>
              </Avatar>
              <label>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() =>
                    document.getElementById("thumbnail-upload").click()
                  }
                >
                  Upload profile picture
                </Button>
              </label>
            </div>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg bg-white focus:outline-none"
              />
            </div>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={profile.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg bg-white focus:outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg bg-white focus:outline-none"
              />
            </div>
            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Bio (max 120 letters)
              </label>
              <textarea
                id="bio"
                name="bio"
                maxLength={120}
                rows={4}
                value={profile.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg bg-white focus:outline-none resize-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
