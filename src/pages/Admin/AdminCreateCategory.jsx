import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";

const AdminCreateCategory = () => {
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar 
          title="Create Catgory" 
          actions={<button 
          className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => navigate("/admin/category-management/create")}
          > 
            Save
          </button>}
        />
        <div className="px-14 pt-10">
          <label
            htmlFor="category"
            className="block text-sm text-[#88847F] mb-2 ml-1"
          >
            Category name
          </label>
          <input
            id="category"
            type="text"
            placeholder="Category name"
            className="w-[400px] px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCategory;
