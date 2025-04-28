import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { useState } from "react";
import { X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

const AdminResetPassword = () => {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar 
          title="Reset password" 
          actions={<button 
          className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => navigate("/admin/category-management/create")}
          > 
            Reset password
          </button>}
        />
        <div className="px-14 pt-10">
          <form className="w-full max-w-lg flex flex-col gap-8">
            {/* Current password */}
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Current password
              </label>
              <input
                id="current-password"
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
              />
            </div>
            {/* New password */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                New password
              </label>
              <input
                id="new-password"
                type="password"
                placeholder="New password"
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
              />
            </div>
            {/* Confirm new password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm text-[#88847F] mb-2 ml-1"
              >
                Confirm new password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-[#E5E3DD] rounded-lg text-[#88847F] bg-white focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>
      <ResetPasswordAlert
        showAlertDialog={isAlertDialogOpen}
        setShowAlertDialog={setIsAlertDialogOpen}
      />
    </div>
  );
};

export default AdminResetPassword;


function ResetPasswordAlert({ showAlertDialog, setShowAlertDialog, resetFunction }) {
    return (
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
          <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
            Reset password
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
            Do you want to reset your password?
          </AlertDialogDescription>
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setDialogState(false)}
              className="bg-background px-10 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={resetFunction}
              className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10 "
            >
              Reset
            </button>
          </div>
          <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
            <X className="h-6 w-6" />
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
