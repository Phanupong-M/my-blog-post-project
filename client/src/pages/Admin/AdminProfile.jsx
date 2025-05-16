import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../../contexts/authentication";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // สมมติใช้ toast
import { X } from "lucide-react"; // สมมติใช้ icon

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

  // handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // handle save
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // TODO: call API to save profile
      // await updateProfile(profile, imageFile);
      toast.success("Profile updated successfully!");
      // fetchUser(); // อัปเดตข้อมูล user ใหม่
    } catch (err) {
      toast.error("Failed to update profile.");
    }
    setIsSaving(false);
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
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button variant="outline" className="cursor-pointer">
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
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
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
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
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
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
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
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none resize-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
