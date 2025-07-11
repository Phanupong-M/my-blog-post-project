/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminEditCategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams(); // Get categoryId from URL params
  const [categoryName, setCategoryName] = useState(""); // To hold category name input
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // To manage saving state
  const [errorMessage, setErrorMessage] = useState(""); // To manage error message

  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetch the category data when the component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${apiUrl}/categories/${categoryId}`
        );
        setCategoryName(response.data.name); // Set the category name
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch category data.
              </h2>
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
        navigate("/admin/category-management"); // Redirect to category management page if error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, navigate]);

  const handleSave = async () => {
    if (!categoryName) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.put(
        `${apiUrl}/categories/${categoryId}`,
        {
          name: categoryName,
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Category updated successfully
            </h2>
            <p className="text-sm">
              Your category has been successfully updated.
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

      navigate("/admin/category-management"); // Redirect to category management page after saving
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to update category
            </h2>
            <p className="text-sm">
              Something went wrong while updating the category. Please try again
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

  const handleDelete = async () => {
    try {
      navigate("/admin/category-management");
      await axios.delete(
        `${apiUrl}/categories/${categoryId}`
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted category successfully
            </h2>
            <p className="text-sm">The category has been removed</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to delete category
            </h2>
            <p className="text-sm">
              Something went wrong while deleting the category. Please try again
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
      setIsLoading(false);
    }
  };

  return (
<div className="flex h-screen bg-white">
    <AdminSidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar
        title="Edit Category"
        actions={
          <button
            className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={handleSave}
            disabled={isSaving}
          >
            Save
          </button>
        }
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
          onChange={(e) => {
            setCategoryName(e.target.value);
            setErrorMessage(""); // clear error on change
          }}
          className={`w-[400px] px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#43403B] bg-white focus:outline-none ${
            errorMessage ? "border-red-500" : ""
          }`}
        />
        {errorMessage && (
          <p className="text-red-500 text-xs absolute">{errorMessage}</p>
        )}
        <DeleteCategoryDialog
          onDelete={handleDelete}
        />
      </div>
    </div>
  </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Category</h2>
        <Button className="px-8 py-2 rounded-full" disabled>
          Save
        </Button>
      </div>
      <div className="space-y-7 max-w-md">
        <div className="relative space-y-1">
          <Skeleton className="h-5 w-32 mb-1 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full rounded-sm bg-[#EFEEEB]" />
        </div>
      </div>
      <Skeleton className="h-6 w-36 mt-6 bg-[#EFEEEB]" />
    </main>
  );
}

function DeleteCategoryDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-6 cursor-pointer">
          <Trash2 className="h-5 w-5" />
          Delete Category
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Category
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this Category?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}