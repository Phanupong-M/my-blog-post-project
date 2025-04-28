import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminProfile = () => {
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar 
          title="Profile" 
          actions={<button 
          className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => navigate("/admin/category-management/create")}
          > 
            Save
          </button>}
        />
        <div className="px-14 pt-10">
          <div className="flex items-center mb-6">
            <Avatar className="w-24 h-24 mr-4">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="Profile picture"
              />
              <AvatarFallback>TP</AvatarFallback>
            </Avatar>
            <Button variant="outline">Upload profile picture</Button>
          </div>
          <form className="w-full max-w-2xl flex flex-col gap-5 p-4">
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
                type="text"
                defaultValue="Thompson P."
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
                type="text"
                defaultValue="thompson"
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
                type="email"
                defaultValue="thompson.p@gmail.com"
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
                maxLength={120}
                rows={4}
                defaultValue={`I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.`}
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
