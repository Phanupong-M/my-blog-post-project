import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { Search, Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdminCategoryManagement = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;



  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          `${apiUrl}/categories`
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        // navigate("*");
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

 
  const handleDelete = async (categoryId) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${apiUrl}/categories/${categoryId}`
      );
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted Category successfully
            </h2>
            <p className="text-sm">The category has been removed.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to delete category
            </h2>
            <p className="text-sm">
              Something went wrong. Please try again later.
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
      setIsLoading(false);
    }
  };

  
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
              {isLoading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">Loading...</td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">No category found.</td>
                  </tr>
                ) : (
                filteredCategories.map((category, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="py-4 px-6 text-sm">{category.name}</td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                          <Pencil size={18} className="text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <DeleteCategoryDialog
                      onDelete={() => handleDelete(category.id)}
                    />
                    </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryManagement;



function DeleteCategoryDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          <Trash2 size={18} onDelete={() => handleDelete(post.id)} className="text-gray-500" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
        Delete Category
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
        Do you want to delete this Category?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10 cursor-pointer"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none cursor-pointer">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
