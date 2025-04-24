/* eslint-disable react/prop-types */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";

export default function ResetPassword() {

  const navigate = useNavigate();
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlertDialog(true);
    // alert(JSON.stringify(formData));
  }



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl w-full md:mx-auto overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={""}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Phanupong M.</h1>
            </div>

            <span className="mx-4 h-6 border-l border-gray-300" />

            <h1 className="text-2xl font-bold">Reset password</h1>

          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-12 items-center mb-4">
              <a
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <User className="h-5 w-5 mb-1" />
                Profile
              </a>
              <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                <Lock className="h-5 w-5 mb-1" />
                <span>Reset password</span>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={""}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold">Panupong M</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <a
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    <User className="h-5 w-5 mb-1" />
                    Profile
                  </a>
                  <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                    <Lock className="h-5 w-5 mb-1" />
                    <span>Reset password</span>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-7">

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Current password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-white mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground`}
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="New password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`bg-white mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground`}
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm new password
                  </label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className={`bg-white mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground`}
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
                >
                  Reset password
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
      <ResetPasswordModal
        dialogState={showAlertDialog}
        setDialogState={setShowAlertDialog}
        resetFunction={""}
      />
    </div>
  );
}

function ResetPasswordModal({ dialogState, setDialogState, resetFunction }) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
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
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10"
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