// components/UserMenu.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, User, KeyRound, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";

export function UserDropdown() {
  const {state, logout } = useAuth();
  const navigate = useNavigate();

  const handleManageAccount = () => {
    navigate("/profile");
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  return (
    <>
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
        </div>
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/your-avatar.jpg" alt="User avatar" />
                  <AvatarFallback>
                    {state.user.profilePic
                      ? ""
                      : state.user.name
                      ? state.user.name.charAt(0).toUpperCase()
                      : ""}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 font-medium text-gray-700">
                  {state.user.name}
                </span>
                <ChevronDown className="ml-1" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 py-1 rounded-md shadow-md"
            >
              <div className="px-4 py-2">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleManageAccount}
                >
                  <User className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Profile</span>
                </div>
              </div>

              <div className="px-4 py-2">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleResetPassword}
                >
                  <KeyRound className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Reset password</span>
                </div>
              </div>

              <div className="border-t my-1"></div>

              <div className="px-4 py-2">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                  <span>Log out</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Version*/}
      <div className="md:hidden w-full">
        <div className="flex items-center mb-4 p-2">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/your-avatar.jpg" alt="User avatar" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <span className="ml-3 font-medium text-gray-700">Moodeng ja</span>
          <Bell className="ml-auto" />
        </div>

        <div className="flex items-center p-4">
          <User className="w-5 h-5 mr-3 text-gray-500" />
          <span>Profile</span>
        </div>

        <div className="flex items-center p-4">
          <KeyRound className="w-5 h-5 mr-3 text-gray-500" />
          <span>Reset password</span>
        </div>

        <div className="p-4 flex items-center">
          <LogOut className="w-5 h-5 mr-3 text-gray-500" />
          <span>Log out</span>
        </div>
      </div>
    </>
  );
}
