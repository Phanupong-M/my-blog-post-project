import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { useState } from "react";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from ".././../contexts/authentication";

const AdminResetPassword = () => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { logout } = useAuth?.() || {};
  const apiUrl = import.meta.env.VITE_API_URL;

  // validate function
  const validate = () => {
    let valid = true;
    let newErrors = {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!formData.password.trim()) {
      newErrors.password = "Please enter your current password";
      valid = false;
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Please enter a new password";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
      valid = false;
    }

    if (!formData.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Please confirm your new password";
      valid = false;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // handleChange
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  // เมื่อกดปุ่ม Reset password บน Navbar
  const handleNavbarResetClick = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsAlertDialogOpen(true);
    }
  };

  // handleResetPassword
  const handleResetPassword = async () => {
    try {
      setIsAlertDialogOpen(false);
      const response = await axios.put(
        `${apiUrl}/auth/reset-password`,
        {
          oldPassword: formData.password,
          newPassword: formData.newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful. Please login again.");
        setFormData({
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        logout?.();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar
          title="Reset password"
          actions={
            <button
              className="flex items-center gap-2 px-10 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleNavbarResetClick}
              type="button"
            >
              Reset password
            </button>
          }
        />
        <div className="px-14 pt-10">
          <form className="w-full max-w-lg flex flex-col gap-8">
            {/* Current password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-[#75716B] mb-2 ml-1"
              >
                Current password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Current password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-[#E5E3DD]"
                } rounded-lg text-[#43403B] bg-white focus:outline-none`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            {/* New password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm text-[#75716B] mb-2 ml-1"
              >
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="New password"
                value={formData.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.newPassword ? "border-red-500" : "border-[#E5E3DD]"
                } rounded-lg text-[#43403B] bg-white focus:outline-none`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>
            {/* Confirm new password */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm text-[#75716B] mb-2 ml-1"
              >
                Confirm new password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-[#E5E3DD]"
                } rounded-lg text-[#43403B] bg-white focus:outline-none`}
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <ResetPasswordAlert
        showAlertDialog={isAlertDialogOpen}
        setShowAlertDialog={setIsAlertDialogOpen}
        resetFunction={handleResetPassword}
      />
    </div>
  );
};

export default AdminResetPassword;

// Modal
function ResetPasswordAlert({
  showAlertDialog,
  setShowAlertDialog,
  resetFunction,
}) {
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
            onClick={() => setShowAlertDialog(false)}
            className="bg-background px-10 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={resetFunction}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10 cursor-pointer"
          >
            Reset
          </button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none cursor-pointer">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
