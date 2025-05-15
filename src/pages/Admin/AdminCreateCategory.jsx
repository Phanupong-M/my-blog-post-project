import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";

const AdminCreateCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState(""); // To hold category name input
  const [isSaving, setIsSaving] = useState(false); // To manage saving state
  const [errorMessage, setErrorMessage] = useState("");


  const handleSave = async () => {
    if (!categoryName) {
      // Handle validation for empty category name
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSaving(true);

    try {
      // Send POST request to create the category
      await axios.post(
        "http://localhost:4001/categories",
        {
          name: categoryName,
        }
      );

      // Show success toast
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created category successfully
            </h2>
            <p className="text-sm">
              Your category has been successfully created.
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

      // Optionally reset the form and show a success message
      setCategoryName(""); // Clear the input after saving
      navigate("/admin/category-management");
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to create category
            </h2>
            <p className="text-sm">
              Something went wrong while creating the category. Please try again
              later.
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


  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar 
          title="Create Catgory" 
          actions={<button 
          className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={handleSave} 
          disabled={isSaving} 
          > 
            Save
          </button>}
        />
        <div className="px-14 pt-10">
          <label
            htmlFor="category"
            className="block text-sm text-[#75716B] mb-2 ml-1"
          >
            Category name
          </label>
          <input
            id="category"
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)} 
            className={`w-[400px] px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#43403B] bg-white focus:outline-none ${
              errorMessage ? "border-red-500" : "" }`}
          />
          {errorMessage && (
              <p className="text-red-500 text-xs absolute">{errorMessage}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateCategory;
