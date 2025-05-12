import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminCategoryManagement = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          "http://localhost:4001/categories"
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        navigate("*");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [navigate]);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchKeyword]);

  
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar 
          title="Category management" 
          actions={<button 
          className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => navigate("/admin/category-management/create")}
          > 
            <Plus size={20} />
            <span>Create category</span>
          </button>}
        />
        <div className="px-14 pt-10">
          {/* Search and Filters */}
          <div className="flex flex-row justify-between items-center gap-4 mb-6 ">
            <div className="flex relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Category Table */}
          <div className="bg-white rounded-lg border border-gray-200 border-opacity-50">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-sm text-gray-600">
                    Category
                  </th>
                  <th className="py-4 px-6 w-[80px]"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-4 px-6 text-sm">{category.name}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Pencil size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 size={18} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryManagement;
