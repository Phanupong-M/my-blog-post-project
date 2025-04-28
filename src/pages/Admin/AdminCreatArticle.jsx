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
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdminCreatArticle = () => {
  const [formData, setFormData] = useState({
    thumbnail: null,
    category: "",
    title: "",
    introduction: "",
    content: "",
  });

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      toast.success("Thumbnail image uploaded successfully");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAsDraft = () => {
    // Handle save as draft logic
    toast("Article saved as draft", {
      description: "You can continue editing later",
      action: {
        label: "View draft",
        onClick: () => console.log("View draft clicked"),
      },
    });
  };

  const handleSaveAndPublish = () => {
    // Handle save and publish logic
    toast.success("Article published successfully", {
      description: "Your article is now live",
      action: {
        label: "View article",
        onClick: () => console.log("View article clicked"),
      },
    });
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
                onClick={handleSaveAsDraft}
            >
                Save as draft
            </Button>
            <Button 
                className="bg-[#23201B] text-white rounded-full px-8 py-2"
                onClick={handleSaveAndPublish}
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
                  {formData.thumbnail ? (
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
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
                    onChange={handleThumbnailUpload}
                  />
                </div>
                <button
                className="mt-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() =>
                  document.getElementById("thumbnail-upload").click()
                }
              >
                Upload thumbnail image
              </button>

              </div>

            <div>
             <label htmlFor="category">Category</label>
             <Select>
               <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                 <SelectValue placeholder="Select category" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="cat">Cat</SelectItem>
                 <SelectItem value="general">General</SelectItem>
                 <SelectItem value="inspiration">Inspiration</SelectItem>
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
                  value={formData.title}
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
                  name="introduction"
                  value={formData.introduction}
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
                  value={formData.content}
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
